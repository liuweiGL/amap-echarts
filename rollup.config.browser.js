import pkg from './package.json'
import rollupBaseConfig from './rollup.config.base'

/**
 * 浏览器环境下需要把 `events` 包打进去
 */
export default {
  ...rollupBaseConfig,
  input: 'src/libs/index.js',
  external: ['echarts/lib/echarts'],
  output: {
    exports: 'named',
    name: 'AMapEcharts',
    file: pkg.browser,
    format: 'umd',
    sourcemap: true,
    globals: {
      'echarts/lib/echarts': 'echarts'
    }
  }
}
