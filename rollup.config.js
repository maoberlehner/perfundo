import babel from 'rollup-plugin-babel';
import commonjs from 'rollup-plugin-commonjs';
import nodeResolve from 'rollup-plugin-node-resolve';

export default {
  plugins: [
    babel({
      exclude: `node_modules/**`,
    }),
    nodeResolve({
      jsnext: true,
      browser: true,
    }),
    commonjs(),
  ],
};
