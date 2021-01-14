import {nodeResolve} from '@rollup/plugin-node-resolve';
import babel from '@rollup/plugin-babel';
import { terser } from "rollup-plugin-terser";

export default {
  input: 'src/main.js',
  external: [/@babel\/runtime/],
  output: [
    {file: 'build/bundle.cjs.js', format: 'cjs', plugins: [terser()]},
    {file: 'build/bundle.js', format: 'iife', name: 'MarkupParser'},
    {file: 'build/bundle-es.js', format: 'es', plugins: [terser()]},
    // {file: 'build/bundle.min.js', format: 'iife', name: 'MarkupParser', plugins: [terser()]},
  ],
  plugins: [
    nodeResolve(),
    babel({babelHelpers: "bundled"}),
  ]
};
