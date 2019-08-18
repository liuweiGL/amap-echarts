import fs from 'fs'
import path from 'path'
import rollupBaseConfig from './rollup.config.base'

const createConfig = theme => ({
  ...rollupBaseConfig,
  input: `src/libs/themes/${theme}`,
  external: ['echarts/lib/echarts'],
  output: {
    dir: 'dist/themes',
    format: 'umd',
    sourcemap: false,
    globals: {
      'echarts/lib/echarts': 'echarts'
    }
  }
})

const themes = fs.readdirSync(path.resolve(__dirname, 'src/libs/themes'))

export default themes.map(createConfig)
