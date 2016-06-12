import buble from 'rollup-plugin-buble';
import commonjs from 'rollup-plugin-commonjs';
import nodeResolve from 'rollup-plugin-node-resolve';

export default {
  plugins: [
    buble(),
    nodeResolve({
      jsnext: true,
      browser: true
    }),
    commonjs()
  ]
};
