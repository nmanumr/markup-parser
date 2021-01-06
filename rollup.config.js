export default {
  input: 'src/main.js',
  output: [
    { file: 'build/bundle.cjs.js', format: 'cjs' },
    { file: 'build/bundle.js', format: 'iife', name: 'MarkupParser' },
    { file: 'build/bundle.umd.js', format: 'umd', name: 'MarkupParser' }
  ]
};
