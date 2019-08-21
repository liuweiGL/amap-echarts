import fs from 'fs'
import path from 'path'
import rollupBaseConfig from './rollup.config.base'

const createConfig = theme => ({
  ...rollupBaseConfig,
  input: `src/libs/themes/${theme}`,
  output: {
    name: theme.replace('.js', ''),
    exports: 'named',
    format: 'umd',
    dir: 'dist/themes',
    sourcemap: false
  }
})

const themes = fs.readdirSync(path.resolve(__dirname, 'src/libs/themes'))

export default themes.map(createConfig)
