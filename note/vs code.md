# 插件

## javascript

- `Auto Close Tag`: 标签自动闭合
- `Auto Rename Tag`: 标签自动重命名
- `Better Comments`: 注释插件
- `Bookmarks`: 书签插件
- `Chinese`: 中文插件
- `Code Spell checker`: 代码检查器
- `CSS Peek`: 点击 `css` 变量可以跳转到定义此变量的文件 - 暂无使用
- `Easy LESS`: 将 `less` 样式编译为 `css` 样式 - 暂无使用
- `EditorConfig for VS Code`: 向项目添加 `EditorConfig` 文件,强制对使用该基本代码的所有人实施一致的编码样式

```javascript
# EditorConfig is awesome: https://EditorConfig.org

# top-most EditorConfig file
root = true

[*]
indent_style = space
indent_size = 2
end_of_line = crlf
charset = utf-8
trim_trailing_whitespace = false
insert_final_newline = false
```

- `Image preview`: 图片缩略图
- `ESLint`: 代码格式

```javascript
// setting.json: 配置ESLint
"editor.codeActionsOnSave": { // 保存时用 eslint 规则格式化文件
  "source.fixAll.eslint": true,
    "source.fixAll.stylelint": true
}
"[vue]": {
  "editor.defaultFormatter": "dbaeumer.vscode-eslint"
}
"[javascript]": {
  "editor.defaultFormatter": "dbaeumer.vscode-eslint"
}
"eslint.format.enable": true,
  "eslint.validate": [
    "javascript",
    "javascriptreact",
    "html",
    "vue"
]
```

```javascript
module.exports = {
  root: true,
  parserOptions: {
    sourceType: 'module'
  },
  globals: {
    uni: 'readonly',
    plus: 'readonly',
    wx: 'readonly',
  },
  env: {
    browser: true,
    node: true,
    es6: true,
  },
  extends: ['plugin:vue/recommended', 'eslint:recommended'],

  // add your custom rules here
  //it is base on https://github.com/vuejs/eslint-config-vue
  rules: {
    "vue/max-attributes-per-line": [2, {
      "singleline": 10,
      "multiline": {
        "max": 1,
        "allowFirstLine": false
      }
    }],
    "vue/singleline-html-element-content-newline": "off",
    "vue/multiline-html-element-content-newline": "off",
    "vue/name-property-casing": ["error", "PascalCase"],
    "vue/no-v-html": "off",
    'accessor-pairs': 2,
    'arrow-spacing': [2, {
      'before': true,
      'after': true
    }],
    'block-spacing': [2, 'always'],
    'brace-style': [2, '1tbs', {
      'allowSingleLine': true
    }],
    'camelcase': [0, {
      'properties': 'always'
    }],
    'comma-dangle': [2, 'never'],
    'comma-spacing': [2, {
      'before': false,
      'after': true
    }],
    'comma-style': [2, 'last'],
    'constructor-super': 2,
    'curly': [2, 'multi-line'],
    'dot-location': [2, 'property'],
    'eol-last': 2,
    'eqeqeq': ["error", "always", { "null": "ignore" }],
    'generator-star-spacing': [2, {
      'before': true,
      'after': true
    }],
    'handle-callback-err': [2, '^(err|error)$'],
    'indent': [2, 2, {
      'SwitchCase': 1
    }],
    'jsx-quotes': [2, 'prefer-single'],
    'key-spacing': [2, {
      'beforeColon': false,
      'afterColon': true
    }],
    'keyword-spacing': [2, {
      'before': true,
      'after': true
    }],
    'new-cap': [2, {
      'newIsCap': true,
      'capIsNew': false
    }],
    'new-parens': 2,
    'no-array-constructor': 2,
    'no-caller': 2,
    'no-console': 'off',
    'no-class-assign': 2,
    'no-cond-assign': 2,
    'no-const-assign': 2,
    'no-control-regex': 0,
    'no-delete-var': 2,
    'no-dupe-args': 2,
    'no-dupe-class-members': 2,
    'no-dupe-keys': 2,
    'no-duplicate-case': 2,
    'no-empty-character-class': 2,
    'no-empty-pattern': 2,
    'no-eval': 2,
    'no-ex-assign': 2,
    'no-extend-native': 2,
    'no-extra-bind': 2,
    'no-extra-boolean-cast': 2,
    'no-extra-parens': [2, 'functions'],
    'no-fallthrough': 2,
    'no-floating-decimal': 2,
    'no-func-assign': 2,
    'no-implied-eval': 2,
    'no-inner-declarations': [2, 'functions'],
    'no-invalid-regexp': 2,
    'no-irregular-whitespace': 2,
    'no-iterator': 2,
    'no-label-var': 2,
    'no-labels': [2, {
      'allowLoop': false,
      'allowSwitch': false
    }],
    'no-lone-blocks': 2,
    'no-mixed-spaces-and-tabs': 2,
    'no-multi-spaces': 2,
    'no-multi-str': 2,
    'no-multiple-empty-lines': [2, {
      'max': 1
    }],
    'no-native-reassign': 2,
    'no-negated-in-lhs': 2,
    'no-new-object': 2,
    'no-new-require': 2,
    'no-new-symbol': 2,
    'no-new-wrappers': 2,
    'no-obj-calls': 2,
    'no-octal': 2,
    'no-octal-escape': 2,
    'no-path-concat': 2,
    'no-proto': 2,
    'no-redeclare': 2,
    'no-regex-spaces': 2,
    'no-return-assign': [2, 'except-parens'],
    'no-self-assign': 2,
    'no-self-compare': 2,
    'no-sequences': 2,
    'no-shadow-restricted-names': 2,
    'no-spaced-func': 2,
    'no-sparse-arrays': 2,
    'no-this-before-super': 2,
    'no-throw-literal': 2,
    'no-trailing-spaces': 2,
    'no-undef': 2,
    'no-undef-init': 2,
    'no-unexpected-multiline': 2,
    'no-unmodified-loop-condition': 2,
    'no-unneeded-ternary': [2, {
      'defaultAssignment': false
    }],
    'no-unreachable': 2,
    'no-unsafe-finally': 2,
    'no-unused-vars': [2, {
      'vars': 'all',
      'args': 'none'
    }],
    'no-useless-call': 2,
    'no-useless-computed-key': 2,
    'no-useless-constructor': 2,
    'no-useless-escape': 0,
    'no-whitespace-before-property': 2,
    'no-with': 2,
    'one-var': [2, {
      'initialized': 'never'
    }],
    'operator-linebreak': [2, 'after', {
      'overrides': {
        '?': 'before',
        ':': 'before'
      }
    }],
    'padded-blocks': [2, 'never'],
    'quotes': [2, 'single', {
      'avoidEscape': true,
      'allowTemplateLiterals': true
    }],
    'semi': [2, 'never'],
    'semi-spacing': [2, {
      'before': false,
      'after': true
    }],
    'space-before-blocks': [2, 'always'],
    'space-before-function-paren': [2, 'never'],
    'space-in-parens': [2, 'never'],
    'space-infix-ops': 2,
    'space-unary-ops': [2, {
      'words': true,
      'nonwords': false
    }],
    'spaced-comment': [2, 'always', {
      'markers': ['global', 'globals', 'eslint', 'eslint-disable', '*package', '!', ',']
    }],
    'template-curly-spacing': [2, 'never'],
    'use-isnan': 2,
    'valid-typeof': 2,
    'wrap-iife': [2, 'any'],
    'yield-star-spacing': [2, 'both'],
    'yoda': [2, 'never'],
    'prefer-const': 2,
    'no-debugger': process.env.NODE_ENV === 'production' ? 2 : 0,
    'object-curly-spacing': [2, 'always', {
      objectsInObjects: false
    }],
    'array-bracket-spacing': [2, 'never']
  }
}
```

- `Git History`: 代码提交纪录
- `Gitee`: 码云 - 暂无使用
- `GitLens-GitSuperCharged`: `Git` 管理工具
- `HTML CSS Support`: 此扩展名使您可以在 `HTML` 文档中添加对 `CSS` 文件的支持。因此，您将获得类属性和名称完成， `id` 属性完成和远程 `CSS` 文件等功能。因此，您可以将引导 `CDN` 添加为远程 `CSS` - 暂无使用
- `Image Preview`: 图片预览,需要在 `vscode` 配种先关闭默认的路径补全

```javascript
// 图片预览: setting.josn中关闭行号中显示缩略图
"gutterpreview.showImagePreviewOnGutter": false,
```

- `JS & CSS minifier`: `js ` 和 `css` 文件的压缩 - 暂无使用
- `Live Server`: 可以实时打开 `html` 文件或者 `react` 文件 - 暂无使用
- `Material Icon Theme`: 图标主题
- `Microsoft Edge Tools for VS Code`: 在 `VS Code` 中直接打开 `Edge` 浏览器进行调试 - 暂无使用
- `Path Intellisense`: 路径补全工具

```javascript
// 路径补全插件: setting.josn中需先关闭VS Code的默认补全
"typescript.suggest.paths": false,
"javascript.suggest.paths": false,
```

- `Sass`: `sass` 样式工具 - 暂未使用
- `Stylelint`: 样式格式

```javascript
// setting.json: 配置 Stylelint
"[css]": {
  "editor.defaultFormatter": "stylelint.vscode-stylelint"
}
"css.validate": false
"less.validate": false
"scss.validate": false
"stylelint.enable": true
"stylelint.validate": [
  "vue",
  "css",
  "scss"
]
```

```javascript
module.exports = {
  root: true,
  extends: [
    'stylelint-config-standard',
    'stylelint-config-rational-order',
    'stylelint-config-html/vue' // 需要放在最后一位
  ],
  defaultSeverity: 'warning',
  plugins: ['stylelint-order'],
  rules: {
    'selector-pseudo-class-no-unknown': [
      true,
      {
        ignorePseudoClasses: ['global'],
      },
    ],
    'at-rule-no-unknown': [
      true,
      {
        ignoreAtRules: ['function', 'if', 'each', 'include', 'mixin', 'for'],
      },
    ],
    'no-duplicate-selectors': null,
    'no-empty-source': null,
    'unicode-bom': 'never',
    'no-descending-specificity': null,
    'font-family-no-missing-generic-family-keyword': null,
    'declaration-colon-space-after': 'always-single-line',
    'declaration-colon-space-before': 'never',
    'declaration-block-trailing-semicolon': 'always',
    'rule-empty-line-before': [
      'always',
      {
        ignore: ['after-comment', 'first-nested'],
      },
    ],
    'property-no-unknown': [
      true,
      {
        ignoreProperties: ['lines'],
      },
    ],
    'media-feature-name-no-unknown': [
      true,
      {
        ignoreMediaFeatureNames: 'min-device-pixel-ratio',
      },
    ],
    'unit-no-unknown': [
      true,
      {
        ignoreUnits: ['rpx'],
      },
    ],
    'selector-type-no-unknown': [
      true,
      {
        ignore: ["default-namespace"]
      }
    ],
    'selector-pseudo-element-no-unknown': [
      true,
      {
        ignorePseudoElements: ['v-deep'],
      },
    ],
  },
  overrides: [
    {
      files: ['*.vue', '**/*.vue'],
      customSyntax: 'postcss-html',
      rules: {
        'selector-pseudo-class-no-unknown': [
          true,
          {
            ignorePseudoClasses: ['deep', 'global']
          }
        ],
        'selector-pseudo-element-no-unknown': [
          true,
          {
            ignorePseudoElements: ['v-deep', 'v-global', 'v-slotted']
          }
        ],
        'unit-no-unknown': [true, { ignoreUnits: ['rpx'] }],
      }
    }
  ]
}
```

- `uni-app-schemas`: 校验 `uni-app` 中的 `androidPrivacy.json` , `pages.json` 和 `manifest.json` 格式
- `uni-app-snippets`: `uni-app` 代码补全
- `uni-create-view`: `uni-app` 页面快速创建
- `vue-helper`: `VUE` 和 `Element-UI` 编写增强工具
- `Vuter`: `VUE` 语法高亮
