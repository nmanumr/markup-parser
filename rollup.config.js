import {nodeResolve} from '@rollup/plugin-node-resolve';
import babel from '@rollup/plugin-babel';
// import { terser } from "rollup-plugin-terser";

export default {
  input: 'src/main.js',
  external: [/@babel\/runtime/],
  output: [
    // {file: 'build/bundle.cjs.js', format: 'cjs'},
    {file: 'build/bundle.js', format: 'iife', name: 'MarkupParser'},
    // {file: 'build/bundle.min.js', format: 'iife', name: 'MarkupParser', plugins: [terser()]},
    // {file: 'build/bundle.umd.js', format: 'umd', name: 'MarkupParser'}
  ],
  plugins: [
    nodeResolve(),
    babel({babelHelpers: "bundled"}),
  ]
};
