import resolve from 'rollup-plugin-node-resolve'
import commonjs from 'rollup-plugin-commonjs'
import babel from 'rollup-plugin-babel'
import filesize from 'rollup-plugin-filesize';
import { terser } from 'rollup-plugin-terser'

export default {
  plugins: [
    babel({
      babelrc: false,
      runtimeHelpers: true,
      exclude: 'node_modules/**',
      presets: [['@babel/env', { modules: false }]],
      plugins: ['@babel/plugin-proposal-class-properties']
    }),
    resolve({
      preferBuiltins: false
    }),
    commonjs(),
    terser(),
    filesize()
  ]
}
