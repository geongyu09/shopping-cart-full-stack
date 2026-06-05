const babel = require('@babel/core');

// 수정된 플러그인 (환경변수 기반)
function importMetaEnvStubFixed({ types: t }) {
  const buildEnv = () => {
    const devValue = process.env.TEST_DEV === 'false' ? false : true;
    return t.objectExpression([
      t.objectProperty(t.identifier("DEV"), t.booleanLiteral(devValue)),
      t.objectProperty(t.identifier("PROD"), t.booleanLiteral(!devValue)),
      t.objectProperty(t.identifier("SSR"), t.booleanLiteral(false)),
      t.objectProperty(t.identifier("MODE"), t.stringLiteral("test")),
      t.objectProperty(t.identifier("BASE_URL"), t.stringLiteral("/")),
    ]);
  };

  return {
    name: "import-meta-env-stub",
    visitor: {
      MetaProperty(path) {
        path.replaceWith(
          t.objectExpression([
            t.objectProperty(t.identifier("env"), buildEnv()),
            t.objectProperty(t.identifier("url"), t.stringLiteral("")),
          ]),
        );
      },
    },
  };
}

const testCode = `const baseUrl = import.meta.env.DEV ? "/api" : "production url";`;

console.log('=== DEV=true (default) ===');
const result1 = babel.transform(testCode, {
  plugins: [importMetaEnvStubFixed],
});
console.log(result1.code);

console.log('\n=== DEV=false (with TEST_DEV=false) ===');
process.env.TEST_DEV = 'false';
const result2 = babel.transform(testCode, {
  plugins: [importMetaEnvStubFixed],
});
console.log(result2.code);
