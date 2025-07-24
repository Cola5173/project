-- 数据资源监控系统数据库设计
-- 数据库: data_monitoring_system

-- 1. 系统配置表
CREATE TABLE system_config (
    id BIGINT PRIMARY KEY AUTO_INCREMENT,
    config_key VARCHAR(100) NOT NULL UNIQUE COMMENT '配置键',
    config_value TEXT COMMENT '配置值',
    description VARCHAR(500) COMMENT '配置描述',
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
) COMMENT '系统配置表';

-- 2. 数据源管理表
CREATE TABLE data_sources (
    id BIGINT PRIMARY KEY AUTO_INCREMENT,
    source_name VARCHAR(100) NOT NULL COMMENT '数据源名称',
    source_type ENUM('database', 'file', 'api', 'cache', 'cloud') NOT NULL COMMENT '数据源类型',
    connection_info JSON COMMENT '连接信息',
    server_ip VARCHAR(45) COMMENT '服务器IP',
    port INT COMMENT '端口号',
    status ENUM('normal', 'warning', 'error', 'offline') DEFAULT 'normal' COMMENT '状态',
    total_capacity BIGINT COMMENT '总容量(MB)',
    used_capacity BIGINT COMMENT '已用容量(MB)',
    last_check_time TIMESTAMP COMMENT '最后检查时间',
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    INDEX idx_source_type (source_type),
    INDEX idx_status (status),
    INDEX idx_server_ip (server_ip)
) COMMENT '数据源管理表';

-- 3. 数据资源表
CREATE TABLE data_resources (
    id BIGINT PRIMARY KEY AUTO_INCREMENT,
    resource_id VARCHAR(100) NOT NULL UNIQUE COMMENT '资源唯一标识',
    resource_name VARCHAR(200) NOT NULL COMMENT '资源名称',
    data_source_id BIGINT NOT NULL COMMENT '所属数据源ID',
    resource_type ENUM('structured', 'unstructured', 'semi_structured') NOT NULL COMMENT '数据类型',
    business_system VARCHAR(100) COMMENT '所属业务系统',
    storage_path VARCHAR(500) COMMENT '存储路径',
    file_size BIGINT COMMENT '文件大小(字节)',
    record_count BIGINT COMMENT '记录数量',
    created_date DATE COMMENT '数据产生日期',
    last_access_time TIMESTAMP COMMENT '最后访问时间',
    access_frequency INT DEFAULT 0 COMMENT '访问频次',
    is_active BOOLEAN DEFAULT TRUE COMMENT '是否活跃',
    aging_days INT DEFAULT 0 COMMENT '老化天数',
    aging_status ENUM('normal', 'warning', 'cleanup') DEFAULT 'normal' COMMENT '老化状态',
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    FOREIGN KEY (data_source_id) REFERENCES data_sources(id),
    INDEX idx_resource_id (resource_id),
    INDEX idx_data_source (data_source_id),
    INDEX idx_resource_type (resource_type),
    INDEX idx_business_system (business_system),
    INDEX idx_aging_status (aging_status),
    INDEX idx_last_access (last_access_time),
    INDEX idx_created_date (created_date)
) COMMENT '数据资源表';

-- 4. 容量使用历史表
CREATE TABLE capacity_history (
    id BIGINT PRIMARY KEY AUTO_INCREMENT,
    data_source_id BIGINT NOT NULL COMMENT '数据源ID',
    record_date DATE NOT NULL COMMENT '记录日期',
    record_hour TINYINT NOT NULL COMMENT '记录小时(0-23)',
    total_capacity BIGINT COMMENT '总容量(MB)',
    used_capacity BIGINT COMMENT '已用容量(MB)',
    available_capacity BIGINT COMMENT '可用容量(MB)',
    usage_rate DECIMAL(5,2) COMMENT '使用率(%)',
    growth_rate DECIMAL(5,2) COMMENT '增长率(%)',
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (data_source_id) REFERENCES data_sources(id),
    UNIQUE KEY uk_source_date_hour (data_source_id, record_date, record_hour),
    INDEX idx_record_date (record_date),
    INDEX idx_data_source_date (data_source_id, record_date)
) COMMENT '容量使用历史表';

-- 5. 数据访问日志表
CREATE TABLE access_logs (
    id BIGINT PRIMARY KEY AUTO_INCREMENT,
    resource_id VARCHAR(100) NOT NULL COMMENT '资源ID',
    access_time TIMESTAMP NOT NULL COMMENT '访问时间',
    client_ip VARCHAR(45) COMMENT '客户端IP',
    user_agent VARCHAR(500) COMMENT '用户代理',
    application_name VARCHAR(100) COMMENT '应用程序名称',
    operation_type ENUM('read', 'write', 'delete', 'update') NOT NULL COMMENT '操作类型',
    operation_result ENUM('success', 'failed', 'timeout') DEFAULT 'success' COMMENT '操作结果',
    response_time INT COMMENT '响应时间(毫秒)',
    data_size BIGINT COMMENT '数据大小(字节)',
    error_message TEXT COMMENT '错误信息',
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    INDEX idx_resource_id (resource_id),
    INDEX idx_access_time (access_time),
    INDEX idx_client_ip (client_ip),
    INDEX idx_operation_type (operation_type),
    INDEX idx_application (application_name),
    INDEX idx_response_time (response_time)
) COMMENT '数据访问日志表';

-- 6. 性能监控表
CREATE TABLE performance_metrics (
    id BIGINT PRIMARY KEY AUTO_INCREMENT,
    data_source_id BIGINT NOT NULL COMMENT '数据源ID',
    metric_time TIMESTAMP NOT NULL COMMENT '监控时间',
    read_rate DECIMAL(10,2) COMMENT '读取速率(MB/s)',
    write_rate DECIMAL(10,2) COMMENT '写入速率(MB/s)',
    throughput INT COMMENT '吞吐量(次/秒)',
    cpu_usage DECIMAL(5,2) COMMENT 'CPU使用率(%)',
    memory_usage DECIMAL(5,2) COMMENT '内存使用率(%)',
    disk_io_read BIGINT COMMENT '磁盘读IO(字节/秒)',
    disk_io_write BIGINT COMMENT '磁盘写IO(字节/秒)',
    network_in BIGINT COMMENT '网络入流量(字节/秒)',
    network_out BIGINT COMMENT '网络出流量(字节/秒)',
    active_connections INT COMMENT '活跃连接数',
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (data_source_id) REFERENCES data_sources(id),
    INDEX idx_data_source_time (data_source_id, metric_time),
    INDEX idx_metric_time (metric_time)
) COMMENT '性能监控表';

-- 7. 查询性能分析表
CREATE TABLE query_performance (
    id BIGINT PRIMARY KEY AUTO_INCREMENT,
    data_source_id BIGINT NOT NULL COMMENT '数据源ID',
    query_hash VARCHAR(64) NOT NULL COMMENT '查询语句哈希',
    query_text TEXT NOT NULL COMMENT '查询语句',
    execution_time INT NOT NULL COMMENT '执行时间(毫秒)',
    cpu_cost DECIMAL(5,2) COMMENT 'CPU消耗(%)',
    memory_cost BIGINT COMMENT '内存消耗(字节)',
    io_cost BIGINT COMMENT 'IO消耗(字节)',
    execution_count INT DEFAULT 1 COMMENT '执行次数',
    avg_execution_time DECIMAL(10,2) COMMENT '平均执行时间',
    max_execution_time INT COMMENT '最大执行时间',
    min_execution_time INT COMMENT '最小执行时间',
    is_slow_query BOOLEAN DEFAULT FALSE COMMENT '是否慢查询',
    optimization_suggestion TEXT COMMENT '优化建议',
    last_execution_time TIMESTAMP COMMENT '最后执行时间',
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    FOREIGN KEY (data_source_id) REFERENCES data_sources(id),
    INDEX idx_query_hash (query_hash),
    INDEX idx_execution_time (execution_time),
    INDEX idx_is_slow (is_slow_query),
    INDEX idx_last_execution (last_execution_time)
) COMMENT '查询性能分析表';

-- 8. 资源争用记录表
CREATE TABLE resource_contention (
    id BIGINT PRIMARY KEY AUTO_INCREMENT,
    resource_identifier VARCHAR(200) NOT NULL COMMENT '资源标识',
    contention_time TIMESTAMP NOT NULL COMMENT '争用发生时间',
    duration_seconds INT NOT NULL COMMENT '持续时间(秒)',
    involved_processes TEXT COMMENT '涉及进程列表(JSON)',
    contention_level ENUM('low', 'medium', 'high') NOT NULL COMMENT '争用等级',
    impact_description TEXT COMMENT '影响描述',
    resolution_suggestion TEXT COMMENT '解决建议',
    is_resolved BOOLEAN DEFAULT FALSE COMMENT '是否已解决',
    resolved_time TIMESTAMP COMMENT '解决时间',
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    INDEX idx_resource_identifier (resource_identifier),
    INDEX idx_contention_time (contention_time),
    INDEX idx_contention_level (contention_level),
    INDEX idx_is_resolved (is_resolved)
) COMMENT '资源争用记录表';

-- 9. 数据生命周期规则表
CREATE TABLE lifecycle_rules (
    id BIGINT PRIMARY KEY AUTO_INCREMENT,
    rule_name VARCHAR(100) NOT NULL COMMENT '规则名称',
    rule_description TEXT COMMENT '规则描述',
    resource_pattern VARCHAR(200) COMMENT '资源匹配模式',
    business_system VARCHAR(100) COMMENT '适用业务系统',
    aging_threshold_days INT NOT NULL COMMENT '老化阈值(天)',
    action_type ENUM('alert', 'archive', 'delete') NOT NULL COMMENT '动作类型',
    check_frequency_hours INT DEFAULT 24 COMMENT '检查频率(小时)',
    is_enabled BOOLEAN DEFAULT TRUE COMMENT '是否启用',
    created_by VARCHAR(100) COMMENT '创建人',
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    INDEX idx_rule_name (rule_name),
    INDEX idx_business_system (business_system),
    INDEX idx_is_enabled (is_enabled)
) COMMENT '数据生命周期规则表';

-- 10. 清理任务记录表
CREATE TABLE cleanup_tasks (
    id BIGINT PRIMARY KEY AUTO_INCREMENT,
    task_id VARCHAR(100) NOT NULL UNIQUE COMMENT '任务ID',
    rule_id BIGINT COMMENT '关联规则ID',
    task_type ENUM('manual', 'automatic') NOT NULL COMMENT '任务类型',
    target_resources TEXT COMMENT '目标资源列表(JSON)',
    estimated_size BIGINT COMMENT '预计释放空间(字节)',
    actual_size BIGINT COMMENT '实际释放空间(字节)',
    task_status ENUM('pending', 'running', 'completed', 'failed', 'cancelled') DEFAULT 'pending' COMMENT '任务状态',
    start_time TIMESTAMP COMMENT '开始时间',
    end_time TIMESTAMP COMMENT '结束时间',
    error_message TEXT COMMENT '错误信息',
    created_by VARCHAR(100) COMMENT '创建人',
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    FOREIGN KEY (rule_id) REFERENCES lifecycle_rules(id),
    INDEX idx_task_id (task_id),
    INDEX idx_task_status (task_status),
    INDEX idx_task_type (task_type),
    INDEX idx_created_at (created_at)
) COMMENT '清理任务记录表';

-- 11. 系统告警表
CREATE TABLE system_alerts (
    id BIGINT PRIMARY KEY AUTO_INCREMENT,
    alert_type ENUM('capacity', 'performance', 'access', 'lifecycle', 'system') NOT NULL COMMENT '告警类型',
    alert_level ENUM('info', 'warning', 'error', 'critical') NOT NULL COMMENT '告警级别',
    alert_title VARCHAR(200) NOT NULL COMMENT '告警标题',
    alert_message TEXT NOT NULL COMMENT '告警内容',
    related_resource VARCHAR(200) COMMENT '相关资源',
    alert_time TIMESTAMP NOT NULL COMMENT '告警时间',
    is_acknowledged BOOLEAN DEFAULT FALSE COMMENT '是否已确认',
    acknowledged_by VARCHAR(100) COMMENT '确认人',
    acknowledged_time TIMESTAMP COMMENT '确认时间',
    is_resolved BOOLEAN DEFAULT FALSE COMMENT '是否已解决',
    resolved_by VARCHAR(100) COMMENT '解决人',
    resolved_time TIMESTAMP COMMENT '解决时间',
    resolution_note TEXT COMMENT '解决说明',
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    INDEX idx_alert_type (alert_type),
    INDEX idx_alert_level (alert_level),
    INDEX idx_alert_time (alert_time),
    INDEX idx_is_acknowledged (is_acknowledged),
    INDEX idx_is_resolved (is_resolved)
) COMMENT '系统告警表';

-- 12. 用户会话表
CREATE TABLE user_sessions (
    id BIGINT PRIMARY KEY AUTO_INCREMENT,
    session_id VARCHAR(100) NOT NULL UNIQUE COMMENT '会话ID',
    user_id VARCHAR(100) NOT NULL COMMENT '用户ID',
    user_name VARCHAR(100) COMMENT '用户名',
    client_ip VARCHAR(45) COMMENT '客户端IP',
    user_agent VARCHAR(500) COMMENT '用户代理',
    login_time TIMESTAMP NOT NULL COMMENT '登录时间',
    last_activity_time TIMESTAMP COMMENT '最后活动时间',
    is_active BOOLEAN DEFAULT TRUE COMMENT '是否活跃',
    logout_time TIMESTAMP COMMENT '登出时间',
    session_duration INT COMMENT '会话时长(秒)',
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    INDEX idx_session_id (session_id),
    INDEX idx_user_id (user_id),
    INDEX idx_login_time (login_time),
    INDEX idx_is_active (is_active)
) COMMENT '用户会话表';

-- 插入初始化数据

-- 系统配置初始化
INSERT INTO system_config (config_key, config_value, description) VALUES
('system_name', '数据资源监控系统', '系统名称'),
('capacity_warning_threshold', '80', '容量告警阈值(%)'),
('capacity_critical_threshold', '90', '容量严重告警阈值(%)'),
('slow_query_threshold', '1000', '慢查询阈值(毫秒)'),
('aging_warning_days', '90', '数据老化预警天数'),
('aging_cleanup_days', '180', '数据老化清理天数'),
('performance_check_interval', '300', '性能检查间隔(秒)'),
('max_online_users', '1000', '最大在线用户数');

-- 数据源初始化
INSERT INTO data_sources (source_name, source_type, server_ip, port, status, total_capacity, used_capacity) VALUES
('主数据库服务器', 'database', '192.168.1.101', 3306, 'normal', 2560000, 2176000),
('备份数据库服务器', 'database', '192.168.1.102', 3306, 'normal', 2560000, 1587200),
('文件存储服务器', 'file', '192.168.1.103', 22, 'warning', 5120000, 4710400),
('云存储服务', 'cloud', '云端', 443, 'normal', 10240000, 4608000),
('Redis缓存服务器', 'cache', '192.168.1.104', 6379, 'normal', 512000, 230400);

-- 生命周期规则初始化
INSERT INTO lifecycle_rules (rule_name, rule_description, aging_threshold_days, action_type, business_system) VALUES
('日志数据清理规则', '清理超过180天的系统日志数据', 180, 'delete', '监控系统'),
('临时文件清理规则', '清理超过30天的临时文件', 30, 'delete', '全系统'),
('用户会话归档规则', '归档超过90天的用户会话数据', 90, 'archive', '用户系统'),
('交易数据归档规则', '归档超过365天的交易数据', 365, 'archive', '支付系统');