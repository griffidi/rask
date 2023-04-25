module.exports = {
  arrowParens: 'avoid',
  bracketSameLine: true,
  bracketSpacing: true,
  embeddedLanguageFormatting: 'auto',
  endOfLine: 'lf',
  htmlWhitespaceSensitivity: 'ignore',
  printWidth: 120,
  proseWrap: 'preserve',
  quoteProps: 'as-needed',
  semi: true,
  // singleAttributesPerLine: true,
  singleAttributePerLine: true,
  singleQuote: true,
  tabWidth: 2,
  trailingComma: 'es5',
  useTabs: false,
  plugins: ['prettier-plugin-multiline-arrays'],

  overrides: [
    {
      files: '*.css',
      options: {
        singleQuote: false,
      },
    },
  ],
};
