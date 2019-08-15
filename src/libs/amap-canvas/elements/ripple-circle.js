import zrender from 'zrender'
import { Element } from './element'

// 动画圆圈的个数
const EFFECT_RIPPLE_NUM = 3

export class RippleCircle extends Element {
  group = new zrender.Group()
  constructor(options) {
    super(options)
  }

  init(options) {
    for (let i = 0; i < EFFECT_RIPPLE_NUM; i++) {
      const circle = new zrender.Circle({
        ...options,
        shape: {
          cx: -1,
          cy: -1,
          r: 2
        }
      })
      circle.attr({
        style: {
          strokeNoScale: true
        },
        z2: 99,
        silent: true,
        scale: [0.5, 0.5]
      })
    }
  }
}
