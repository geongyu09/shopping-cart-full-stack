const babel = require('@babel/core');
const plugin = require('./babel-plugin-import-meta-env.cjs');

const testCode = `const baseUrl = import.meta.env.DEV ? "/api" : "production url";`;

const result = babel.transform(testCode, {
  plugins: [plugin],
});

console.log('=== Original Code ===');
console.log(testCode);
console.log('\n=== Transformed Code ===');
console.log(result.code);
