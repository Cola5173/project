import React from 'react';
import { FileText, Code, Database, Settings } from 'lucide-react';

interface SpecificationSidebarProps {
  currentModule: string;
}

const SpecificationSidebar: React.FC<SpecificationSidebarProps> = ({ currentModule }) => {
  const specifications = {
    overview: {
      title: '数据资源概览模块',
      description: '提供数据资源整体概况，通过直观的可视化界面帮助运维人员快速了解资源分布、容量使用和数据活跃度情况。',
      components: [
        '资源分布图: 采用拓扑图展示各类数据资源分布情况',
        '容量使用情况: 折线图展示容量趋势，饼图展示类型占比',
        '活跃度统计: 柱状图对比高频/低频数据的读写次数'
      ],
      interactions: [
        '资源分布图支持拖拽平移、滚轮缩放',
        '容量趋势图点击可查看精确数值',
        '活跃度列表项可跳转至详细访问记录'
      ]
    },
    storage: {
      title: '数据存储监测模块',
      description: '持续监控数据存储状态，通过趋势分析、热点识别和健康状态监测，保障数据存储安全。',
      components: [
        '存储使用趋势: 折线图展示存储容量消耗动态',
        '热点数据识别: 列表展示热点数据，热力图标记高频访问区域',
        '存储健康状态: 仪表盘显示整体健康评分'
      ],
      interactions: [
        '趋势图支持时间范围筛选',
        '热点数据列表支持多维度排序',
        '异常项点击弹出处理建议'
      ]
    },
    lifecycle: {
      title: '数据生命周期监测模块',
      description: '基于业务应用系统的埋点日志实现数据老化监控和自动清理提醒，优化存储资源。',
      components: [
        '数据老化监控: 列表展示老化数据详情',
        '自动清理提醒: 顶部悬浮提醒条显示待清理数据',
        '老化规则配置: 支持自定义老化阈值和监控周期'
      ],
      interactions: [
        '老化数据列表支持按天数筛选和排序',
        '清理提醒条点击跳转至待清理列表',
        '规则配置支持启用/禁用操作'
      ]
    },
    access: {
      title: '数据访问监测模块',
      description: '全面监控数据访问情况，识别潜在安全风险和性能问题。',
      components: [
        '访问频次统计: 折线图展示读写频率，饼图展示用户群体占比',
        '访问来源分析: 列表展示访问来源和操作类型',
        '性能瓶颈识别: 列表展示瓶颈记录和响应时间'
      ],
      interactions: [
        '频次图支持读写操作单独展示',
        '来源列表项点击显示访问轨迹',
        '瓶颈项点击弹出详细日志'
      ]
    },
    performance: {
      title: '数据资源性能监测模块',
      description: '实时监控数据资源性能指标，及时发现性能瓶颈，提升数据处理效率。',
      components: [
        '读写性能指标: 实时仪表盘展示读写速率和吞吐量',
        '查询效率分析: 列表展示查询语句和执行时间',
        '资源争用情况: 热力图展示争用热点'
      ],
      interactions: [
        '仪表盘支持切换不同时间粒度',
        '查询列表支持按执行时间排序',
        '热力图点击可定位争用记录'
      ]
    }
  };

  const currentSpec = specifications[currentModule as keyof typeof specifications];

  if (!currentSpec) return null;

  return (
    <aside className="w-80 bg-gradient-to-br from-blue-600 to-purple-700 text-white p-6 overflow-y-auto">
      <div className="mb-6">
        <div className="flex items-center space-x-2 mb-2">
          <FileText className="w-6 h-6" />
          <h2 className="text-xl font-bold">需求规格说明</h2>
        </div>
        <p className="text-sm opacity-90">基于PRD文档的详细功能规格</p>
      </div>

      <div className="space-y-6">
        <div>
          <h3 className="text-lg font-semibold mb-3 flex items-center">
            <Code className="w-5 h-5 mr-2" />
            {currentSpec.title}
          </h3>
        </div>

        <div>
          <h4 className="font-semibold mb-2 flex items-center">
            <Settings className="w-4 h-4 mr-2" />
            功能描述
          </h4>
          <p className="text-sm opacity-90 leading-relaxed">{currentSpec.description}</p>
        </div>

        <div>
          <h4 className="font-semibold mb-3 flex items-center">
            <Database className="w-4 h-4 mr-2" />
            核心组件
          </h4>
          <ul className="space-y-2">
            {currentSpec.components.map((component, index) => (
              <li key={index} className="text-sm opacity-90 leading-relaxed">
                <span className="inline-block w-2 h-2 bg-white rounded-full mr-2 opacity-60"></span>
                {component}
              </li>
            ))}
          </ul>
        </div>

        <div>
          <h4 className="font-semibold mb-3">交互设计</h4>
          <ul className="space-y-2">
            {currentSpec.interactions.map((interaction, index) => (
              <li key={index} className="text-sm opacity-90 leading-relaxed">
                <span className="inline-block w-2 h-2 bg-white rounded-full mr-2 opacity-60"></span>
                {interaction}
              </li>
            ))}
          </ul>
        </div>

        <div className="bg-white bg-opacity-10 rounded-lg p-4 mt-6">
          <h4 className="font-semibold mb-2">技术实现</h4>
          <div className="text-sm opacity-90 space-y-1">
            <p>• 前端: React + TypeScript + Tailwind CSS</p>
            <p>• 图表: Chart.js / Recharts</p>
            <p>• 数据库: PostgreSQL (Supabase)</p>
            <p>• 后端: Node.js + Express (推荐)</p>
          </div>
        </div>
      </div>
    </aside>
  );
};

export default SpecificationSidebar;