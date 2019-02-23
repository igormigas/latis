module.exports = {
  parser: "babel-eslint",
  extends: [
    "plugin:react/recommended"
  ],
  plugins: [
    'react',
    'import',
    'babel'
  ],
  env: {
    browser: true,
    es6: true,
  },
  parserOptions: {
    ecmaFeatures: {
      "jsx": true
    },
    ecmaVersion: 6,
    sourceType: 'module'
  },
  settings: {
    react: {
      version: "16.5.0"
    },
    'import/resolver': {
      node: {
        extensions: ['.js', '.jsx', '.json']
      }
    },
    'import/extensions': [
      '.js',
      '.jsx'
    ],
    'import/core-modules': [
    ],
    'import/ignore': [
      'node_modules',
      '\\.(coffee|scss|css|less|hbs|svg|json)$'
    ]
  },
  rules: {
    //
    // RULES FROM APPTENSION CONFIG
    //
    'comma-dangle': [1, 'always-multiline'],
    'no-console': 1,
    'no-debugger': 1,
    'no-alert': 1,
    'no-cond-assign': [2, 'always'],
    'no-constant-condition': 1,
    'no-control-regex': 2,
    'no-dupe-args': 2,
    'no-dupe-keys': 2,
    'no-duplicate-case': 2,
    'no-empty-character-class': 2,
    'no-empty': 2,
    'no-ex-assign': 2,
    'no-extra-boolean-cast': 1,
    'no-extra-parens': [1, 'functions'],
    'no-extra-semi': 1,
    'no-func-assign': 2,
    'no-inner-declarations': 2,
    'no-invalid-regexp': 2,
    'no-irregular-whitespace': 2,
    'no-negated-in-lhs': 2,
    'no-obj-calls': 2,
    'no-regex-spaces': 1,
    'no-sparse-arrays': 2,
    'no-unreachable': 1,
    'use-isnan': 2,
    'no-unexpected-multiline': 2,

    //best practices
    'accessor-pairs': 1,
    'consistent-return': 1,
    'curly': 1,
    'dot-notation': 1,
    eqeqeq: [2, 'smart'],
    semi: [1, 'always'],
    'no-else-return': 1,
    'no-labels': 2,
    'no-eval': 2,
    'no-implied-eval': 2,
    'no-extra-bind': 1,
    'no-invalid-this': 2,
    'no-lone-blocks': 2,
    'no-loop-func': 2,
    'no-multi-spaces': 1,
    'no-multi-str': 1,
    'no-native-reassign': 2,
    'no-new-func': 2,
    'no-new': 2,
    'no-redeclare': 1,
    'no-return-assign': 2,
    'no-script-url': 2,
    'no-self-compare': 1,
    'no-sequences': 2,
    'no-unused-expressions': 1,
    'no-useless-call': 2,
    'no-void': 2,
    'no-warning-comments': 1,
    'no-with': 2,
    'radix': 2,
    'yoda': 1,
    'no-delete-var': 2,
    'no-catch-shadow': 1,
    'no-shadow': 0,
    'no-undefined': 0,
    'no-unused-vars': 1,
    'no-use-before-define': [2, 'nofunc'],

    //stylistic
    'array-bracket-spacing': [1, 'never'],
    'brace-style': [2, '1tbs', {'allowSingleLine': true}],
    'camelcase': [2, {'properties': 'always'}],
    'comma-spacing': [1, {'before': false, 'after': true}],
    'comma-style': [2, 'last'],
    'consistent-this': [2, 'self'],
    'eol-last': 1,
    'indent': [1, 2, {'SwitchCase': 1}],
    'key-spacing': 2,
    'linebreak-style': 0,
    'new-cap': 1,
    'new-parens': 2,
    'no-inline-comments': 1,
    'no-lonely-if': 2,
    'no-mixed-spaces-and-tabs': 2,
    'no-nested-ternary': 2,
    'no-spaced-func': 1,
    'no-trailing-spaces': 1,
    'no-unneeded-ternary': 2,
    'object-curly-spacing': [2, 'always'],
    'padded-blocks': [1, 'never'],
    'quote-props': [1, 'as-needed', {'keywords': true, 'unnecessary': false }],
    quotes: [1, 'single', 'avoid-escape'],
    'semi-spacing': 1,
    'keyword-spacing': 1,
    'space-before-blocks': 1,
    'space-before-function-paren': [1, {'anonymous': 'always', 'named': 'never'}],
    'space-in-parens': [1, 'never'],
    'space-infix-ops': 1,
    'arrow-spacing': [1, { 'before': true, 'after': true }],
    'max-len': [1, { 'code': 120}],

    'jsx-quotes': [2, 'prefer-double'],

    'react/display-name': 2,
    'react/forbid-component-props': 0,
    'react/forbid-elements': 0,
    'react/forbid-prop-types': 0,
    'react/forbid-foreign-prop-types': 0,
    'react/no-array-index-key': 0,
    'react/no-children-prop': 0,
    'react/no-danger': 1,
    'react/no-danger-with-children': 0,
    'react/no-deprecated': 2,
    'react/no-did-mount-set-state': 0,
    'react/no-did-update-set-state': 0,
    'react/no-direct-mutation-state': 2,
    'react/no-find-dom-node': 2,
    'react/no-is-mounted': 2,
    'react/no-multi-comp': 0,
    'react/no-render-return-value': 2,
    'react/no-set-state': 0,
    'react/no-string-refs': 1,
    'react/no-unescaped-entities': 0,
    'react/no-unknown-property': 2,
    'react/no-unused-prop-types': 0,
    'react/prefer-es6-class': 0,
    'react/prefer-stateless-function': 0,
    'react/prop-types': 2,
    'react/react-in-jsx-scope': 2,
    'react/require-default-props': 0,
    'react/require-optimization': 0,
    'react/require-render-return': 2,
    'react/self-closing-comp': 0,
    'react/sort-comp': [2, {
      order: [
        'static-methods',
        'lifecycle',
        '/^on.+$/',
        '/^(get|set)(?!(InitialState$|DefaultProps$|ChildContext$)).+$/',
        'everything-else',
        '/^render.+$/',
        'render'
      ]
    }],
    'react/sort-prop-types': 0,
    'react/style-prop-object': 0,
    'react/void-dom-elements-no-children': 0,

    'react/jsx-boolean-value': 0,
    'react/jsx-closing-bracket-location': [1, 'line-aligned'],
    'react/jsx-curly-spacing': [2, 'never'],
    'react/jsx-equals-spacing': 0,
    'react/jsx-filename-extension': 0,
    'react/jsx-first-prop-new-line': 0,
    'react/jsx-handler-names': 0,
    'react/jsx-indent': 0,
    'react/jsx-indent-props': 0,
    'react/jsx-key': 0,
    'react/jsx-max-props-per-line': 0,
    'react/jsx-no-bind': 0,
    'react/jsx-no-comment-textnodes': 0,
    'react/jsx-no-duplicate-props': 2,
    'react/jsx-no-literals': 0,
    'react/jsx-no-target-blank': 0,
    'react/jsx-no-undef': 2,
    'react/jsx-pascal-case': 0,
    'react/jsx-sort-props': 0,
    'react/jsx-space-before-closing': 2,
    'react/jsx-tag-spacing': 0,
    'react/jsx-uses-react': 2,
    'react/jsx-uses-vars': 2,
    'react/jsx-wrap-multilines': [2, {
      declaration: true,
      assignment: true,
      'return': true
    }],

    'import/no-unresolved': [2, { commonjs: true, caseSensitive: true }],
    'import/named': 0,
    'import/default': 0,
    'import/namespace': 0,
    'import/export': 2,
    'import/no-named-as-default': 2,
    'import/no-named-as-default-member': 2,
    'import/no-deprecated': 0,
    'import/no-extraneous-dependencies': [2, {
      devDependencies: [
        'test/**',
        'tests/**',
        'spec/**',
        '**/__tests__/**',
        'test.js',
        'test-*.js',
        '**/*.test.js',
        '**/*.spec.js',
        '**/webpack.config.js',
        '**/webpack.config.*.js',
        '**/rollup.config.js',
        '**/gulpfile.js',
        '**/gulpfile.*.js',
        '**/Gruntfile'
      ],
      optionalDependencies: false
    }],

    'import/no-mutable-exports': 2,
    'import/no-commonjs': 0,
    'import/no-amd': 2,
    'import/no-nodejs-modules': 0,
    'import/first': [2, 'absolute-first'],
    'import/imports-first': 0,
    'import/no-duplicates': 2,
    'import/no-namespace': 0,
    'import/extensions': [2, 'always', {
      js: 'never',
      jsx: 'never'
    }],
    'import/order': [0, {
      groups: ['builtin', 'external', 'internal', 'parent', 'sibling', 'index'],
      'newlines-between': 'never'
    }],
    'import/newline-after-import': 0,
    'import/prefer-default-export': 0,
    'import/no-restricted-paths': 0,
    'import/max-dependencies': 0,
    'import/no-absolute-path': 2,
    'import/no-dynamic-require': 2,
    'import/no-internal-modules': [0, {
      allow: []
    }],
    'import/unambiguous': 0,
    'import/no-webpack-loader-syntax': 2,
    'import/no-unassigned-import': 0,
    'import/no-named-default': 2,

    'new-cap': 0,
    'no-invalid-this': 0,
    'semi': 0,

    'babel/new-cap': [2, { 'capIsNew': false }],
    'babel/object-curly-spacing': [2, 'always'],
    'babel/no-invalid-this': 2,
    'babel/semi': 2,

    //
    // PERSONAL RULES
    //
    'react/destructuring-assignment': 0,
    'no-plusplus': [2, { allowForLoopAfterthoughts: true }],
    'babel/new-cap': [2, { 'capIsNew': false, 'newIsCap': false }]
  }
};
