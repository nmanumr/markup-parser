import {nodeResolve} from '@rollup/plugin-node-resolve';
import typescript from 'rollup-plugin-typescript2';
import dts from "rollup-plugin-dts";

export default [
  {
    input: 'src/main.ts',
    output: [
      {file: 'lib/index.js', format: 'es'}
    ],
    plugins: [
      nodeResolve(),
      typescript(),
    ]
  }, {
    input: "src/main.ts",
    output: [
      {file: "lib/index.d.ts", format: "es"}
    ],
    plugins: [dts()],
  }
];
