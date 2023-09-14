module.exports = {
  semi: true,
  printWidth: 80,
  tabWidth: 2,
  endOfLine: 'auto',
  singleQuote: true,
  trailingComma: 'none',
  bracketSpacing: true,
  jsxBracketSameLine: false,
  vueIndentScriptAndStyle: false,
  'jsxBracketSameLine:': true,
  htmlWhitespaceSensitivity: 'ignore',
  wrapAttributes: true,
  overrides: [
    {
      files: '*.html',
      options: {
        parser: 'html'
      }
    }
  ]
};