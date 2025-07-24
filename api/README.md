# 数据资源监控系统 API 接口文档

## 概述

本文档描述了数据资源监控系统的后端API接口规范，包括数据资源概览、存储监测、生命周期管理、访问监测和性能监测等核心功能模块的接口定义。

## 基础信息

- **Base URL**: `http://localhost:8080/api/v1`
- **认证方式**: JWT Token
- **数据格式**: JSON
- **字符编码**: UTF-8

## 通用响应格式

```json
{
  "code": 200,
  "message": "success",
  "data": {},
  "timestamp": "2024-01-15T14:32:18Z"
}
```

## 1. 数据资源概览模块

### 1.1 获取系统概览统计

**接口地址**: `GET /overview/stats`

**请求参数**: 无

**响应示例**:
```json
{
  "code": 200,
  "message": "success",
  "data": {
    "totalStorage": 2560000,
    "usedStorage": 1875200,
    "usageRate": 73.2,
    "activeDataSources": 156,
    "onlineUsers": 245,
    "pendingAlerts": 3,
    "systemStatus": "normal"
  }
}
```

### 1.2 获取资源分布信息

**接口地址**: `GET /overview/resource-distribution`

**请求参数**:
- `filter` (string, optional): 过滤条件 (all|structured|unstructured|local|cloud)

**响应示例**:
```json
{
  "code": 200,
  "data": {
    "nodes": [
      {
        "id": "server1",
        "name": "服务器-01",
        "type": "server",
        "status": "normal",
        "usage": 85,
        "totalCapacity": 2560000,
        "usedCapacity": 2176000,
        "ip": "192.168.1.101"
      }
    ]
  }
}
```

### 1.3 获取容量使用趋势

**接口地址**: `GET /overview/capacity-trends`

**请求参数**:
- `period` (string): 时间周期 (today|week|month|custom)
- `startDate` (string, optional): 开始日期 (YYYY-MM-DD)
- `endDate` (string, optional): 结束日期 (YYYY-MM-DD)

**响应示例**:
```json
{
  "code": 200,
  "data": {
    "labels": ["1日", "5日", "10日", "15日", "20日", "25日", "30日"],
    "usedCapacity": [1200, 1350, 1500, 1650, 1800, 1950, 2100],
    "availableCapacity": [800, 650, 500, 350, 200, 50, 0]
  }
}
```

### 1.4 获取数据活跃度统计

**接口地址**: `GET /overview/activity-stats`

**请求参数**:
- `type` (string): 活跃度类型 (high|low)
- `limit` (int, optional): 返回数量限制，默认10

**响应示例**:
```json
{
  "code": 200,
  "data": {
    "chartData": [8524, 6241, 4892, 3156, 2847],
    "topData": [
      {
        "id": "data001",
        "name": "用户行为数据",
        "businessSystem": "电商系统",
        "accessCount": 8524,
        "period": "近7天"
      }
    ]
  }
}
```

## 2. 数据存储监测模块

### 2.1 获取存储使用趋势

**接口地址**: `GET /storage/trends`

**请求参数**:
- `days` (int): 天数 (7|30|90)
- `dataSourceId` (long, optional): 数据源ID

**响应示例**:
```json
{
  "code": 200,
  "data": {
    "labels": ["Day 1", "Day 2", "Day 3", "Day 4", "Day 5", "Day 6", "Day 7"],
    "actualUsage": [1200, 1280, 1350, 1420, 1500, 1580, 1650],
    "predictedUsage": [null, null, null, null, null, 1600, 1720, 1850]
  }
}
```

### 2.2 获取热点数据列表

**接口地址**: `GET /storage/hotspots`

**请求参数**:
- `limit` (int, optional): 返回数量限制，默认20

**响应示例**:
```json
{
  "code": 200,
  "data": [
    {
      "id": "hot001",
      "dataId": "USER_BEHAVIOR_2024",
      "lastAccess": "2分钟前",
      "accessCount": 2451,
      "level": "high",
      "size": "1.2GB"
    }
  ]
}
```

### 2.3 获取存储健康状态

**接口地址**: `GET /storage/health`

**响应示例**:
```json
{
  "code": 200,
  "data": {
    "healthScore": 87,
    "items": [
      {
        "type": "normal",
        "message": "磁盘空间正常",
        "detail": "85% 可用",
        "level": "info"
      },
      {
        "type": "warning",
        "message": "内存使用率偏高",
        "detail": "87% 使用",
        "level": "warning"
      }
    ]
  }
}
```

## 3. 数据生命周期监测模块

### 3.1 获取老化数据列表

**接口地址**: `GET /lifecycle/aging-data`

**请求参数**:
- `filter` (string): 过滤条件 (all|30|90|180)
- `page` (int, optional): 页码，默认1
- `size` (int, optional): 每页大小，默认20

**响应示例**:
```json
{
  "code": 200,
  "data": {
    "content": [
      {
        "id": "LOG_2023_Q1_BATCH",
        "createdDate": "2023-01-15",
        "lastAccess": "2023-06-20",
        "agingDays": 234,
        "status": "cleanup",
        "size": "1.2 GB",
        "businessSystem": "监控系统"
      }
    ],
    "totalElements": 1247,
    "totalPages": 63,
    "currentPage": 1
  }
}
```

### 3.2 获取清理提醒信息

**接口地址**: `GET /lifecycle/cleanup-reminder`

**响应示例**:
```json
{
  "code": 200,
  "data": {
    "count": 1247,
    "totalSize": "2.34 GB",
    "estimatedSpace": "2.34 GB",
    "businessImpact": "无关联活跃业务"
  }
}
```

### 3.3 执行数据清理

**接口地址**: `POST /lifecycle/cleanup`

**请求参数**:
```json
{
  "resourceIds": ["LOG_2023_Q1_BATCH", "USER_SESSION_2023"],
  "cleanupType": "immediate",
  "confirmBackup": true
}
```

**响应示例**:
```json
{
  "code": 200,
  "data": {
    "taskId": "cleanup_20240115_001",
    "status": "pending",
    "estimatedDuration": "30分钟"
  }
}
```

### 3.4 获取生命周期规则

**接口地址**: `GET /lifecycle/rules`

**响应示例**:
```json
{
  "code": 200,
  "data": [
    {
      "id": 1,
      "ruleName": "日志数据清理规则",
      "description": "清理超过180天的系统日志数据",
      "agingThresholdDays": 180,
      "actionType": "delete",
      "businessSystem": "监控系统",
      "isEnabled": true
    }
  ]
}
```

## 4. 数据访问监测模块

### 4.1 获取访问频次趋势

**接口地址**: `GET /access/frequency-trends`

**请求参数**:
- `type` (string): 操作类型 (all|read|write)
- `period` (string): 时间周期 (1h|6h|24h)

**响应示例**:
```json
{
  "code": 200,
  "data": {
    "labels": ["00:00", "04:00", "08:00", "12:00", "16:00", "20:00"],
    "readOperations": [120, 89, 245, 389, 456, 234],
    "writeOperations": [80, 65, 180, 290, 320, 180]
  }
}
```

### 4.2 获取用户群体访问占比

**接口地址**: `GET /access/user-groups`

**响应示例**:
```json
{
  "code": 200,
  "data": {
    "labels": ["管理员", "普通用户", "API调用", "批处理"],
    "data": [25, 45, 20, 10]
  }
}
```

### 4.3 获取访问来源分析

**接口地址**: `GET /access/sources`

**请求参数**:
- `filter` (string, optional): 过滤条件 (all|internal|external)
- `search` (string, optional): 搜索关键词
- `page` (int, optional): 页码
- `size` (int, optional): 每页大小

**响应示例**:
```json
{
  "code": 200,
  "data": {
    "content": [
      {
        "ip": "192.168.1.101",
        "application": "Web管理系统",
        "accessCount": 1245,
        "operations": ["read", "write"],
        "lastAccess": "3分钟前"
      }
    ]
  }
}
```

### 4.4 获取性能瓶颈列表

**接口地址**: `GET /access/bottlenecks`

**请求参数**:
- `level` (string, optional): 瓶颈等级 (all|high|medium|low)

**响应示例**:
```json
{
  "code": 200,
  "data": [
    {
      "time": "2024-01-15 14:32:15",
      "dataId": "LARGE_DATASET_001",
      "delayTime": 1250,
      "responseTime": 1890,
      "level": "high"
    }
  ]
}
```

## 5. 数据资源性能监测模块

### 5.1 获取性能指标

**接口地址**: `GET /performance/metrics`

**响应示例**:
```json
{
  "code": 200,
  "data": {
    "readRate": 45.2,
    "writeRate": 28.7,
    "throughput": 1247,
    "readRateChange": "+12%",
    "writeRateChange": "-5%",
    "throughputChange": "+8%"
  }
}
```

### 5.2 获取性能波动数据

**接口地址**: `GET /performance/trends`

**请求参数**:
- `period` (string): 时间周期 (realtime|1h|24h)

**响应示例**:
```json
{
  "code": 200,
  "data": {
    "labels": ["00:00", "02:00", "04:00", "06:00", "08:00", "10:00"],
    "readRate": [25, 20, 18, 35, 42, 45],
    "writeRate": [15, 12, 10, 20, 25, 28]
  }
}
```

### 5.3 获取查询效率分析

**接口地址**: `GET /performance/queries`

**请求参数**:
- `onlySlowQueries` (boolean, optional): 仅显示慢查询

**响应示例**:
```json
{
  "code": 200,
  "data": [
    {
      "id": 1,
      "queryHash": "abc123",
      "queryText": "SELECT * FROM users WHERE status='active'",
      "executionTime": 1280,
      "cpuUsage": 45,
      "memoryUsage": 128,
      "isSlow": true,
      "optimizationSuggestion": "添加索引，避免全表扫描"
    }
  ]
}
```

### 5.4 获取资源争用数据

**接口地址**: `GET /performance/contentions`

**响应示例**:
```json
{
  "code": 200,
  "data": {
    "heatmapData": [
      {
        "hour": 0,
        "intensity": 0.2,
        "level": "low"
      }
    ],
    "realtimeContentions": [
      {
        "id": 1,
        "resource": "DB_001",
        "time": "14:32:18",
        "duration": 15,
        "processes": ["web-server", "batch-job"],
        "level": "high"
      }
    ]
  }
}
```

## 6. 系统管理接口

### 6.1 获取系统配置

**接口地址**: `GET /system/config`

**响应示例**:
```json
{
  "code": 200,
  "data": {
    "capacityWarningThreshold": 80,
    "capacityCriticalThreshold": 90,
    "slowQueryThreshold": 1000,
    "agingWarningDays": 90,
    "agingCleanupDays": 180
  }
}
```

### 6.2 更新系统配置

**接口地址**: `PUT /system/config`

**请求参数**:
```json
{
  "capacityWarningThreshold": 85,
  "capacityCriticalThreshold": 95,
  "slowQueryThreshold": 800
}
```

### 6.3 获取系统告警

**接口地址**: `GET /system/alerts`

**请求参数**:
- `level` (string, optional): 告警级别 (info|warning|error|critical)
- `status` (string, optional): 处理状态 (unresolved|resolved)

**响应示例**:
```json
{
  "code": 200,
  "data": [
    {
      "id": 1,
      "alertType": "capacity",
      "alertLevel": "warning",
      "alertTitle": "存储容量告警",
      "alertMessage": "服务器-01存储使用率达到85%",
      "alertTime": "2024-01-15T14:32:18Z",
      "isResolved": false
    }
  ]
}
```

## 错误码说明

| 错误码 | 说明 |
|--------|------|
| 200 | 成功 |
| 400 | 请求参数错误 |
| 401 | 未授权 |
| 403 | 禁止访问 |
| 404 | 资源不存在 |
| 500 | 服务器内部错误 |
| 1001 | 数据源连接失败 |
| 1002 | 数据查询超时 |
| 1003 | 清理任务执行失败 |

## Java后端实现建议

### 技术栈推荐
- **框架**: Spring Boot 2.7+
- **数据库**: MySQL 8.0+
- **ORM**: MyBatis Plus
- **缓存**: Redis
- **消息队列**: RabbitMQ
- **监控**: Micrometer + Prometheus
- **文档**: Swagger/OpenAPI 3

### 项目结构
```
src/main/java/com/monitoring/
├── controller/          # 控制器层
├── service/            # 业务逻辑层
├── mapper/             # 数据访问层
├── entity/             # 实体类
├── dto/                # 数据传输对象
├── config/             # 配置类
├── common/             # 通用工具类
└── scheduled/          # 定时任务
```

### 核心配置示例

**application.yml**:
```yaml
server:
  port: 8080

spring:
  datasource:
    url: jdbc:mysql://localhost:3306/data_monitoring_system
    username: root
    password: password
    driver-class-name: com.mysql.cj.jdbc.Driver
  
  redis:
    host: localhost
    port: 6379
    database: 0
  
  rabbitmq:
    host: localhost
    port: 5672
    username: guest
    password: guest

mybatis-plus:
  configuration:
    map-underscore-to-camel-case: true
  global-config:
    db-config:
      logic-delete-field: deleted
      logic-delete-value: 1
      logic-not-delete-value: 0

logging:
  level:
    com.monitoring: DEBUG
```

这个API文档提供了完整的接口规范，可以作为前后端开发的标准参考。