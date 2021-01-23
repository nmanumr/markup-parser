import {nodeResolve} from '@rollup/plugin-node-resolve';
// import babel from '@rollup/plugin-babel';
import typescript from '@rollup/plugin-typescript';

export default {
  input: 'src/main.ts',
  external: [/@babel\/runtime/],
  output: [
    {file: 'lib/index.js', format: 'es'},
    {file: 'lib/index-iife.js', format: 'iife', name: 'MarkupParser'},
  ],
  plugins: [
    nodeResolve(),
    typescript(),
    // babel({babelHelpers: "bundled"}),
  ]
};
