const path = require('path')
const pkg = require('../../package.json')

module.exports = {
  base: '/amap-echarts/',
  port: 8888,
  dest: 'docs-dist',
  title: 'amap-echarts',
  description: '在高德地图上展示 echarts 图表',
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
    version: pkg.version,
    docsDir: 'docs',
    repo: 'liuweiGL/amap-echarts',
    sidebarDepth: 0,
    editLinks: true,
    editLinkText: '在 GitHub 上编辑此页',
    lastUpdated: '上次更新',
    nav: [
      { text: '1.x', link: 'https://liuweigl.github.io/amap-echarts-doc-v1/' },
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
          '/guide/theme',
          '/guide/tree-shaking',
          '/guide/QA'
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
