const path = require('path')

module.exports = {
  base: '/amap-echarts-doc-v1/',
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
        '@': path.resolve(__dirname, '../../'),
        '@assets': path.resolve(__dirname, '../../src/assets')
      }
    }
  },
  themeConfig: {
    docsDir: 'docs',
    repo: 'liuweiGL/amap-echarts',
    sidebarDepth: 0,
    editLinks: true,
    editLinkText: '在 GitHub 上编辑此页',
    lastUpdated: '上次更新',
    nav: [
      { text: '2.x', link: 'https://liuweigl.github.io/amap-echarts/' },
      {
        text: '发布日志',
        link:
          'https://github.com/liuweiGL/amap-echarts/blob/master/CHANGELOG.md'
      }
    ],
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
          '/guide/procedure'
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
