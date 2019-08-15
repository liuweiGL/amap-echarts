export class Element {
  plugins = []
  /**
   * 使用插件处理参数
   * @param {object} options 参数
   */
  constructor(options) {
    let _options = options
    this.plugins.forEach(plugin => (_options = plugin(_options)))
    this.init(options)
  }

  /**
   * 初始化函数
   * @param {object} options 参数
   */
  init(options) {
    console.log(options)
    throw new Error('请实现 init 方法')
  }

  /**
   * 私有方法，添加插件
   * @param {function} plugin 插件
   */
  _addPlugin(plugin) {
    if (typeof plugin !== 'function') {
      throw new TypeError('plugin 应该是一个方法')
    }
    this.plugins.push(plugin)
  }

  /**
   * 私有方法，移除插件
   * @param {function} plugin 插件
   */
  _removePlugin(plugin) {
    const index = this.plugins.indexOf(plugin)
    if (index > -1) {
      this.plugins.splice(index, 1)
    }
  }
}
