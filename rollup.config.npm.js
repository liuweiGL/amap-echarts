import pkg from './package.json'
import rollupBaseConfig from './rollup.config.base'

export default {
  ...rollupBaseConfig,
  input: 'src/libs/index.js',
  external: ['echarts/lib/echarts', 'events'],
  output: [
    {
      file: pkg.main,
      format: 'cjs',
      sourcemap: true
    },
    {
      file: pkg.module,
      format: 'es',
      sourcemap: true
    }
  ]
}
