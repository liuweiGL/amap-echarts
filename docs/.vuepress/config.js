const path = require('path')

module.exports = {
  base: '/amap-echarts/',
  port: 8888,
  dest: 'docs-dist',
  title: 'amap-echarts',
  description: '在高德地图上展示 echarts 图表',
  plugins: ['flowchart'],
  markdown: {
    anchor: { permalink: true }
  },
  configureWebpack: {
    resolve: {
      alias: {
        '@assets': path.resolve(__dirname, '../../src/assets')
      }
    }
  },
  themeConfig: {
    docsDir: 'docs',
    repo: 'liuweiGL/amap-echarts',
    editLinks: true,
    editLinkText: '在 GitHub 上编辑此页',
    lastUpdated: '上次更新',
    sidebarDepth: 0,
    sidebar: [
      {
        title: '指南',
        path: '',
        collapsable: false,
        children: [
          '/guide/',
          '/guide/getting-started',
          '/guide/api',
          '/guide/event',
          '/guide/plugin',
          '/guide/theme',
          '/guide/tree-shaking',
          '/guide/procedure',
          '/guide/todo'
        ]
      },
      {
        title: '示例',
        path: '',
        collapsable: false,
        children: ['/example/lines', '/example/effect-scatter']
      }
    ]
  }
}
