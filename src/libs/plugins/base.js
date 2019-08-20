/**
 * 插件基类
 */
import EventName from '../core/amap-events'

const toString = obj => {
  const values = []
  for (const key in obj) {
    if (obj.hasOwnProperty(key)) {
      values.push(obj[key])
    }
  }
  return values.join(', ')
}

// 为了让 `vscode` 有提示
export const PluginType = Object.assign({}, EventName)

for (const key in PluginType) {
  if (PluginType.hasOwnProperty(key) && key.indexOf('__') > -1) {
    delete PluginType[key]
  }
}

export default class PluginBase {
  constructor() {
    const type = this.getType()
    if (type) {
      if (!PluginType[type.toUpperCase()]) {
        throw new Error(
          `type property is '${type}', but expect one of [ ${toString(
            PluginType
          )} ]`
        )
      }
    } else {
      throw new Error('type property must not be empty')
    }
  }

  getType() {
    throw new Error('getType function is not implemented')
  }

  // eslint-disable-next-line no-unused-vars
  apply(instance) {
    throw new Error('apply function is not implemented')
  }
}
