import npmConfig from './rollup.config.npm'
import browserConfig from './rollup.config.browser'
import themeConfigs from './rollup.config.theme'

export default [npmConfig, browserConfig, ...themeConfigs]
