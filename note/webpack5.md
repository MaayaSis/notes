# 课程介绍

# 课件软件使用说明

# 为什么要使用Webpack

# Webpack介绍和基本使用

1. **`Webpack`是一个静态资源打包工具**
2. 它会以一个或多个文件作为打包的入口，将我们整个项目所有文件编译组合成一个或多个文件输出出去。输出的文件就是编译好的文件，就可以在浏览器段运行了。
3. 我们将`Webpack`输出的文件叫做`bundle`
4. 默认`Webpack`会将文件打包输出到 `dist` 目录下，我们查看 `dist` 目录下文件情况就好了
5. `Webpack`本身功能比较少，只能处理 `js` 资源，一旦遇到 `css` 等其他资源就会报错。所以我们学习 `Webpack`，就是主要学习如何处理其他资源。

```
webpack_code # 项目根目录（所有指令必须在这个目录运行）
    └── src # 项目源码目录
        ├── js # js文件目录
        │   ├── count.js
        │   └── sum.js
        └── main.js # 项目主文件
```

```javascript
// src/main.js,且此文件会被public下的index.html静态页面通过script标签引用
// 引入被count.js和sum.js两个模块组件
import count from "./js/count";
import sum from "./js/sum";

console.log(count(2, 1));
console.log(sum(1, 2, 3, 4));
```

```javascript
// 初始化:会生成一个基础的package.json文件
npm init -y// package.json中name字段不能叫做webpack,否则下一步会报错

// 下载依赖
npm i webpack webpack-cli -D// -D带来是开发依赖

// 启用Webpack
npx webpack ./src/main.js --mode=development// 仅能编译 JS 中的 ES Module 语法
npx webpack ./src/main.js --mode=production// 能编译JS中的ES Module语法，还能压缩JS代码
#开始使用
// npx webpack:用来运行本地安装好的Webpack包;
// ./src/main.js:指定Webpack从main.js文件开始打包，不但会打包main.js，还会将其依赖也一起打包进来
// --mode=xxx:指定模式（环境）
```

# Webpack5大核心概念

1. entry（入口）:指示 Webpack 从哪个文件开始打包
2. output（输出）:指示 Webpack 打包完的文件输出到哪里去，如何命名等
3. loader（加载器）:webpack 本身只能处理 js、json 等资源，其他资源需要借助 loader，Webpack 才能解析
4. plugins（插件）:扩展 Webpack 的功能
5. mode（模式）主要有两种：
   1. 开发模式：development
   2. 生产模式：production

# Webpack基本配置

```javascript
// 此文件为项目根目录下:webpack.config.js
const path = require("path");// Node.js的核心模块，专门用来处理文件路径

module.exports = {
  // 入口
  // 相对路径和绝对路径都行
  entry: "./src/main.js",
  // 输出
  output: {
    // path: 文件输出目录，必须是绝对路径
    // path.resolve()方法返回一个绝对路径
    // __dirname 当前文件的文件夹绝对路径
    path: path.resolve(__dirname, "dist"),
    // filename: 输出文件名
    filename: "main.js",
  },
  // 加载器
  module: {
    rules: [],
  },
  // 插件
  plugins: [],
  // 模式
  mode: "development", // 开发模式
};
```

运行指令:运行`npx webpack`指令后,会自动前往项目根目录下寻找`webpack.config.js`文件,并按里面的配置开始执行打包

# 开发模式的介绍

开发模式:开发代码时使用的模式,这个模式下主要做两件事：

1. 编译代码,使浏览器能识别运行:开发时我们有样式资源、字体图标、图片资源、html 资源等，webpack 默认都不能处理这些资源，所以我们要加载配置来编译这些资源
2. 代码质量检查，树立代码规范

# 处理css资源

处理css资源:首先需要有css资源,并且在入口文件中引用此css资源,它才会被loader编译处理

1. 下载loader包:`npm i css-loader style-loader -D`
2. 配置`webpack.config.js`:

```javascript
const path = require("path");
//css-loader:负责将Css文件编译成Webpack能识别的模块
//style-loader":会动态创建一个 Style 标签，里面放置 Webpack 中 Css 模块内容
module.exports = {
  entry: "./src/main.js",
  output: {
    path: path.resolve(__dirname, "dist"),
    filename: "main.js",
  },
  module: {
    rules: [
      {
        // 用来匹配.css结尾的文件
        test: /\.css$/,// 正则匹配
        // use数组里面Loader的执行顺序是从右到左
        use: ["style-loader", "css-loader"],
      },
    ],
  },
  plugins: [],
  mode: "development",
};
```

备注:需要注意的是,css资源最终同样是打包在`dist/main.js`文件中

# 处理less资源

处理less资源:步骤和处理css相同,下载包`npm i less-loader -D`,并在`webpack.config.js`中使用即可

```javascript
//需要注意的是,less-loader需要单独存放在一个rules中
const path = require("path");

module.exports = {
  entry: "./src/main.js",
  output: {
    path: path.resolve(__dirname, "dist"),
    filename: "main.js",
  },
  module: {
    rules: [
      {
        test: /\.css$/,
        use: ["style-loader", "css-loader"],
      },
      {
        test: /\.less$/,// 处理lees资源,且同样也需要用到style-loader和css-loader
        use: ["style-loader", "css-loader", "less-loader"],
      },
    ],
  },
  plugins: [],
  mode: "development",
};
//最后同样需要实行
npx webpack
```

# 处理sass资源

处理方式与less和css相同:

```javascript
const path = require("path");

module.exports = {
  entry: "./src/main.js",
  output: {
    path: path.resolve(__dirname, "dist"),
    filename: "main.js",
  },
  module: {
    rules: [
      {
        test: /\.less$/,
        use: ["style-loader", "css-loader", "less-loader"],
      },
      {
        test: /\.s[ac]ss$/,
        use: ["style-loader", "css-loader", "sass-loader"],
      },
    ],
  },
  plugins: [],
  mode: "development",
};
```

# 处理stylus

同css,less一样:`npm stylu-loader -D`

# 处理图片资源

Webpack4通过 `file-loader`和`url-loader`处理图片资源

Webpack5已经将这两个loader内置到Webpack中,只需配置即可使用,默认被处理后的图片文件会出现在`/dist/`目录下

```javascript
//转化为base64格式:优势不用请求url,缺点文件大小会变大
{
  test: /\.(png|jpe?g|gif|webp)$/,
  type: "asset",//  不是use
  parser: {//对图片优化进行base url转换
  	dataUrlCondition: {
 		  maxSize: 10 * 1024 // 小于10kb的图片会被base64处理
 		}
  }
},
```

# 修改输出文件目录

```javascript

const path = require("path");
module.exports = {
  entry: "./src/main.js",
  output: {
    path: path.resolve(__dirname, "dist"),
    filename: "static/js/main.js", // 将js文件输出到dist/static/js目录中
  },
  module: {
    rules: [
      {
        test: /\.(png|jpe?g|gif|webp)$/,
        type: "asset",
        parser: {
          dataUrlCondition: {
            maxSize: 10 * 1024, // 小于10kb的图片会被base64处理
          },
        },
        generator: {
          // 将图片文件输出到dist/static/imgs 目录中
          // 将图片文件命名[hash:8][ext][query]
          // [hash:8]:hash值取8位
          // [ext]:使用之前的文件扩展名
          // [query]:添加之前的query参数
          filename: "static/imgs/[hash:8][ext][query]",
        },
      },
    ],
  },
  plugins: [],
  mode: "development",
};
```

# 自动清空上次打包内容

```javascript
output: {
    path: path.resolve(__dirname, "dist"),
    filename: "static/js/main.js",
    // 原理:在打包前,将path整个目录内容清空,再进行打包
    clean: true, // 自动将上次打包目录资源清空
},
```

# 处理字体图标资源

```javascript
{
  test: /\.(ttf|woff2?)$/,
  type: "asset/resource",// 不需要转为base64格式,因此`/resource`
  generator: {// 输出目录
  	filename: "static/media/[hash:8][ext][query]",
  },
},
```

# 处理其它资源

开发中可能存在一些其他资源,如音视频等,不需要处理,但又不被浏览器识别,所以就输出到media路径下

```javascript
{
  test: /\.(ttf|woff2?|map4|map3|avi)$/,//只需要修改正则即可
  type: "asset/resource",
  generator: {
  	filename: "static/media/[hash:8][ext][query]",
  },
},
```

# 处理js资源介绍

Webpack对js处理是有限的，只能编译 js 中 ES 模块化语法，不能编译其他语法，导致 js 不能在 IE 等浏览器运行，所以做一些兼容性处理

- 针对 js 兼容性处理，使用 Babel 来完成
- 针对代码格式，使用 Eslint 来完成

# Eslint介绍

配置文件由很多种写法:新建`.eslintrc.*`，位于项目根目录

1. `.eslintrc`
2. `.eslintrc.js`
3. `.eslintrc.json`
4. 区别在于配置格式不一样
5. `package.json` 中添加 `eslintConfig`：不需要创建文件,在原有文件基础上写

ESLint会查找和自动读取它们,所以以上配置文件只需要存在一个即可

```javascript
// 下载webpack的包
npm i eslint-webpack-plugin eslint -D
```

```javascript
// e
module.exports = {
  // 解析选项
  parserOptions: {},
  // 具体检查规则
  rules: {},
  // 继承其他规则
  extends: [],
  // ...
  // 其他规则详见：https://eslint.bootcss.com/docs/user-guide/configuring
};
```

```javascript
// parserOptions 解析选项
parserOptions: {
  ecmaVersion: 6, // ES 语法版本
  sourceType: "module", // ES 模块化
  ecmaFeatures: { // ES 其他特性
    jsx: true // 如果是 React 项目，就需要开启 jsx 语法
  }
}
```

1. `"off"` 或 `0`:关闭规则
2. `"warn"` 或 `1`:开启规则，使用警告级别的错误：`warn` (不会导致程序退出)
3. `"error"` 或 `2`:开启规则，使用错误级别的错误：`error` (当被触发的时候，程序会退出)

```javascript
// rules具体规则:
rules: {
  semi: "error", // 禁止使用分号
  'array-callback-return': 'warn', // 强制数组方法的回调函数中有 return 语句，否则警告
  'default-case': [
    'warn', // 要求 switch 语句中有 default 分支，否则警告
    { commentPattern: '^no default$' } // 允许在最后注释 no default, 就不会有警告了
  ],
  eqeqeq: [
    'warn', // 强制使用 === 和 !==，否则警告
    'smart' // https://eslint.bootcss.com/docs/rules/eqeqeq#smart 除了少数情况下不会有警告
  ],
}
```

- Eslint：`eslint:recommended`
- Vue-Cli：`plugin:vue/essential`
- React-Cli：`react-app`

```javascript
// extends 继承
module.exports = {
  extends: ["react-app"],
  rules: {
    // 我们的规则会覆盖掉react-app的规则
    eqeqeq: ["warn", "smart"],
  },
};
```

# eslint使用

- 下载包:`npm i eslint-webpack-plugin eslint -D`
- 在根目录下创建eslint.js文件

```javascript
module.exports = {
  // 继承Eslint规则
  extends: ["eslint:recommended"],
  env: {
    node: true, // 启用node中全局变量
    browser: true, // 启用浏览器中全局变量
  },
  parserOptions: {
    ecmaVersion: 6,// ES6
    sourceType: "module",// 模块化语法 
  },
  rules: {
    "no-var": 2, // 不能使用var定义变量
  },
};
```

- webpack.config.js中应用eslint插件

```javascript
const path = require("path");
const ESLintWebpackPlugin = require("eslint-webpack-plugin");// 插件需要被引入才能使用的

module.exports = {
  entry: "./src/main.js",
  output: {},
  module: {// 模块直接使用即可
    rules: [],
  },
  plugins: [
    new ESLintWebpackPlugin({
      // 指定检查文件的根目录
      context: path.resolve(__dirname, "src"),
    }),
  ],
  mode: "development",
};
```

1. 使用webpack中的插件eslint需要编译时才能发现语法错误
2. vscode的插件eslint可以立马发现,而且也需要eslint.js配置文件

```javascript
//创建根目录下的`.eslintignore`
dist//eslint就会忽略dist目录下的文件不进行检查
```

# Babel介绍

配置文件由很多种写法:

1. 新建`babel.config.*`，位于项目根目录
   1. `babel.config.js`
   2. `babel.config.json`
2. `.babelrc.*：新建文件，位于项目根目录`
   1. `.babelrc`
   2. `.babelrc.js`
   3. `.babelrc.json`
3. `package.json` 中添加 `babel`：不需要创建文件,在原有文件基础上写

Babel会查找和自动读取它们，所以以上配置文件只需要存在一个即可

```javascript
// 以 babel.config.js 配置文件为例子
module.exports = {
  presets:["@babel/preset-env"],// vue
};
```

presets 预设:一组Babel插件,扩展 Babel 功能

1. `@babel/preset-env`: 一个智能预设，允许您使用最新的JavaScript
2. `@babel/preset-react`：一个用来编译 React jsx 语法的预设
3. `@babel/preset-typescript`：一个用来编译 TypeScript 语法的预设

# Bable的使用

```javascript
// 安装包
npm i babel-loader @babel/core @babel/preset-env -D
```

```javascript
// babel.config.js
module.exports = {
  presets: ["@babel/preset-env"],
};
```

```javascript
// webpack.config.js
moduel:{
  reules:[
    {
      test: /\.js$/,
      exclude: /node_modules/, // 排除node_modules代码不编译
      loader: "babel-loader",
    },
  ]
}
```

# 处理Html资源

一个Html文件要引入多个js,css文件,这样有可能导致引入错误,所以使用插件解决问题

```javascript
// 下载包
npm i html-webpack-plugin -D
```

```javascript
// 省略引入插件...
plugins: [
  new HtmlWebpackPlugin({
    // 以 public/index.html为模板创建新的index.html文件
    // 新的html文件有两个特点：1. 内容和源文件一致 2. 自动引入打包生成的js等资源
    template: path.resolve(__dirname, "public/index.html"),
  }),
],
// 去掉index.js引入的js文件,因为 HtmlWebpackPlugin 会自动引入
```

# 搭建开发服务器

```javascript
// webpack.config.js
module.exports = {
  entry: "./src/main.js",
  output: {},
  module: {
    rules: [],
  },
  plugins: [ ],
  // 部署开发服务器
  devServer: {
    host: "localhost", // 启动服务器域名
    port: "3000", // 启动服务器端口号
    open: true, // 是否自动打开浏览器
  },
  mode: "development",
};
```

```javascript
// 注意运行指令发生了变化
npx webpack serve
```

1. 当使用开发服务器时,所有代码都会在内存中编译打包,并不会输出到 dist 目录下。
2. 开发时只关心代码能否运行，有效果即可，至于代码被编译成什么样子，我们并不需要知道

# 总结开发模式配置

开发模式下,`webpack.config.js`的path可以是`undefined`

# 生产模式准备工作

当`webpack.config.js`文件不在项目根目录下时

```javascript
//同时,webpack.config.js中的绝对目录需要回对到根目录下`../src`,相对目录则不需要改变
npx webpack server --config ./config/webpack.config.js
```

```javascript
// 根目录下的package.json中的`scripts`
"scripts": {
  "start": "npm run dev",// 除了start命令,其他的都需要`run`
  "dev": "npx webpack serve --config ./config/webpack.dev.js",
  "build": "npx webpack --config ./config/webpack.prod.js"
}
//这样配置之后
npm start// 实际运行的是npm run dev进入开发环境
npm run build// 运行生产模式
```

# 提取css成单独文件

1. Css文件目前被打包到js文件中，当 js 文件加载时，会创建一个 style 标签来生成样式
2. 这样对于网站来说，会出现闪屏现象，用户体验不好
3. 应该是单独的 Css 文件，通过 link 标签加载性能才好

```javascript
// 下载包
npm i mini-css-extract-plugin -D
```

```javascript
//webpack.config.js
const MiniCssExtractPlugin = require("mini-css-extract-plugin");//引入插件
module: {
  rules: [
    {
      test: /\.less$/,
      // 用mini-css替换了style-loader
      use: [MiniCssExtractPlugin.loader, "css-loader", "less-loader"],
    }
  ],
},
  plugins: [
    // 提取css成单独文件
    new MiniCssExtractPlugin({
    // 定义输出文件名和目录
    filename: "static/css/main.css",//22中的Html插件自动引入了打包生成的资源
    }),
  ],
```

# css兼容性处理

```javascript
//下载包
npm i postcss-loader postcss postcss-preset-env -D
```

```javascript
//webpack.config.js
module: {
  rules: [
    {
      // 用来匹配 .css 结尾的文件
      test: /\.css$/,
      // use 数组里面 Loader 执行顺序是从右到左
      use: [
        MiniCssExtractPlugin.loader,
        "css-loader",
        // 必须处在css-loader之后,其它如less saas模块之前
        {
          loader: "postcss-loader",
          options: {// 官网的默认配置项
            postcssOptions: {
              plugins: [
                "postcss-preset-env", // 能解决大多数样式兼容性问题
              ],
            },
          },
        },
      ],
    },
  ]
}
```

```javascript
// package.json
{
  "browserslist": [// 兼容以下三型要求交集的浏览器的代码即可
    "last 2 version", // 适配所有浏览器最近的两个版本
    "> 1%", // 适配99%的浏览器
    "not dead"// 适配未停止更新的浏览器
  ]
}
```

# 封装样式loader函数

```javascript
// webpack.config.js
function getStyleLoader(pre){
  return [
    MiniCssExtractPlugin.loader,
    "css-loader",
    {
      loader: "postcss-loader",
      options: {
        postcssOptions: {
          plugins: [
            "postcss-preset-env", // 能解决大多数样式兼容性问题
          ],
        },
      },
    },
    pre,// 当不传参数时为undefined
  ].filter(Boolean);// 通过filter(Boolean)将pre:undefined过滤掉
};
rules:[
  {
    test:/\.css$/,
    use:getStyleLoader()
  }
]
```

# css压缩

```javascript
// 下载包
npm i css-minimizer-webpack-plugin -D
```

```javascript
// webpack.config.js
const CssMinimizerPlugin = require("css-minimizer-webpack-plugin");
  plugins: [
    // css压缩:直接调用方法即可
    new CssMinimizerPlugin(),
  ],
```

# Html和js压缩

默认生产模式进行Html和js压缩

# webpack基础总结

1. 两种开发模式
   - 开发模式：代码能编译自动化运行
   - 生产模式：代码编译优化输出
2. Webpack 基本功能
   - 开发模式：可以编译 ES Module 语法
   - 生产模式：可以编译 ES Module 语法，压缩 js 代码
3. Webpack 配置文件
   1. 5 个核心概念
      - entry
      - output
      - loader
      - plugins
      - mode
   2. devServer 配置
4. Webpack 脚本指令用法
   - `webpack` 直接打包输出
   - `webpack serve` 启动开发服务器，内存编译打包没有输出

# Webpack高级介绍

高级配置:进行Webpack优化，让代码在编译/运行时性能更好

1. 提升开发体验
2. 提升打包构建速度
3. 减少代码体积
4. 优化代码运行性能

# SourceMap

当经过编译后的代码出现错误,提示错误时显示的位置时编译后代码的位置

SourceMap:它会生成一个xxx.map文件，里面包含源代码和构建后代码每一行、每一列的映射关系

开发模式：`cheap-module-source-map`

- 优点：打包编译速度快，只包含行映射
- 缺点：没有列映射

```javascript
module.exports = {
  // 其他省略
  mode: "development",
  devtool: "cheap-module-source-map",
};
```

生产模式:`source-map`:

- 优点：包含行/列映射
- 缺点：打包编译速度更慢

```javascript
module.exports = {
  // 其他省略
  mode: "production",
  devtool: "source-map",
};
```

# HMR

开发时修改了其中一个模块代码,Webpack默认会将所有模块全部重新打包编译，速度很慢

`HotModuleReplacement`:在程序运行中，替换、添加或删除模块，而无需重新加载整个页面

```javascript
// 未编译前的main.js
import count from "./js/count";
import sum from "./js/sum";
//css默认打开热模替换,js需要手动设定

//热模块替换是webpack默认存在的功能
if (module.hot) {// 判断浏览器是否支持HMR功能
  module.hot.accept("./js/count.js", function (count) {//当count.js变化时启动热模块替换,并且会执行回调
    const result1 = count(2, 1);
    console.log(result1);
  });

  module.hot.accept("./js/sum.js", function (sum) {
    const result2 = sum(1, 2, 3, 4);
    console.log(result2);
  });
}
```

# OneOf

打包时每个文件都会经过所有`loader`处理，虽然因为`test` 正则原因实际没有处理上，但是都要过一遍,比较慢

````javascript
// webpack.config.js
  module: {
    rules: [
      {
        oneOf: [// 生产和开发环境都能被配置
          {
            test: /\.css$/,
            use: ["style-loader", "css-loader"],
          },
        ],
      },
    ],
  },
````

# Include和Exclude

- 开发时会使用第三方的库或插件，所有文件都被下载到node_modules中了。而这些文件是不需要编译可以直接使用的。
- 所以我们在对 js 文件处理时，要排除 node_modules 下面的文件

include:包含，只处理 xxx 文件

exclude:排除，除了 xxx 文件以外其他文件都处理

```javascript
// webpack.config.js:只需要对js文件进行处理
modules:{
  rules:[
    {
      OneOf:[
        {
          test: /\.js$/,
          // exclude: /node_modules/, // 排除node_modules代码不编译
          include: path.resolve(__dirname, "../src"), // 也可以用包含
          loader: "babel-loader",
        },
      ]
    }
  ]
}
plugins: [
  new ESLintWebpackPlugin({
    // 指定检查文件的根目录
    context: path.resolve(__dirname, "../src"),
    exclude: "node_modules", 
  }),
],
```

# Eslint和Babel的缓存

每次打包时js文件都要经过Eslint检查和Babel编译,速度比较慢

Cache:对Eslint 检查 和 Babel 编译结果进行缓存

```javascript
modules:{
  rules:[
    {
      OneOf:[
        {
          test: /\.js$/,
          // exclude: /node_modules/, // 排除node_modules代码不编译
          include: path.resolve(__dirname, "../src"), // 也可以用包含
          loader: "babel-loader",
          options: {
            // Babel的缓存文件:`node_modules/.cache/babel-loader`
            cacheDirectory: true, // 开启babel编译缓存
            cacheCompression: false, // 缓存文件不要压缩:会影响打包速度
          },
        },
      ]
    }
  ]
}
plugins: [
  new ESLintWebpackPlugin({
    // 指定检查文件的根目录
    context: path.resolve(__dirname, "../src"),
    exclude: "node_modules",
    cache: true, // 开启缓存
    // 缓存目录
    cacheLocation: path.resolve(
      __dirname,
      "../node_modules/.cache/.eslintcache"
    ),
  })
],
```

# 多进程打包

1. 对 js 文件处理主要是 eslint 、babel、Terser 三个工具
2. Terser:默认开启的JS压缩工具,打包的时候会自动调用它
3. Thead(多进程打包):开启电脑的多个进程同时干一件事,速度更快

4. 需要注意：请仅在特别耗时的操作(`JS`)中使用`Thead`，因为每个进程启动就有大约为 600ms 左右开销

```javascript
//下载包
npm i thread-loader -D
```

```javascript
// 获取PC_CPU核数
onst os = require("os");
const threads = os.cpus().length;// cpu核数
const TerserPlugin = require("terser-webpack-plugin");// Tesrser

export moduels = {
  entry,
  output,
  modules:{
    rules:[
      {
        OneOf:[
          {
            test: /\.js$/,
            // exclude: /node_modules/, // 排除node_modules代码不编译
            include: path.resolve(__dirname, "../src"), // 也可以用包含
            use: [
              {
                loader: "thread-loader", // 开启多进程
                options: {
                  workers: threads, // 数量
                },
              },
              {
                loader: "babel-loader",
                options: {
                  cacheDirectory: true, // 开启babel编译缓存
                },
              },
            ],
          },
        ]
      }
    ]
  },
  plugins: [
    new ESLintWebpackPlugin({
      // 指定检查文件的根目录
      context: path.resolve(__dirname, "../src"),
      exclude: "node_modules",
      cache: true, // 开启缓存
      // 缓存目录
      cacheLocation: path.resolve(
        __dirname,
        "../node_modules/.cache/.eslintcache"
      ),
      threads, // 开启多进程
    }),
    // css压缩
    new CssMinimizerPlugin(),
    // 当生产模式会默认开启TerserPlugin，但是我们需要进行其他配置，就要重新写了
    new TerserPlugin({// 开启Terser的多进程
      parallel: threads // 开启多进程
    })
  ],


  //通过optimization:开启Terser的多进程
  optimization: {
    minimize: true,
    minimizer: [
      // css压缩也可以写到optimization.minimizer里面，效果一样的
      new CssMinimizerPlugin(),
      // 当生产模式会默认开启TerserPlugin，但是我们需要进行其他配置，就要重新写了
      new TerserPlugin({
        parallel: threads // 开启多进程
      })
    ],
  },
}
```

# TreeShaking

1. 开发时定义了工具函数库，或引用第三方件库。如果不处理的话打包时会引入整个库，但实际上只有极少功能被使用,这样将整个库都打包进来，体积太大了
2. `Tree Shaking`:一个术语，通常用于描述移除 JavaScript 中的没有使用上的代码,它依赖 `ES Module`
3. Webpack已经默认开启了`Tree Shaking`无需其他配置

# 减少Babel生成文件的体积

1. Babel为编译的每个文件都插入了辅助代码,使代码体积过大
2. `@babel/plugin-transform-runtime`:禁用了Babel自动对每个文件的runtime注入，而是引入 `@babel/plugin-transform-runtime`并且使所有辅助代码从这里引用

```javascript
// 下载包
npm i @babel/plugin-transform-runtime -D
```

```javascript
export moduels = {
  entry,
  output,
  modules:{
    rules:[
      {
        OneOf:[
          {
            test: /\.js$/,
            include: path.resolve(__dirname, "../src"),
            use: [
              {
                loader: "thread-loader", 
                options: {
                  workers: threads,
                },
              },
              {
                loader: "babel-loader",
                options: {
                  cacheDirectory: true,
                  plugins: ["@babel/plugin-transform-runtime"], // 减少代码体积
                },
              },
            ],
          },
        ]
      }
    ]
  },
}
```

# 压缩图片

`image-minimizer-webpack-plugin`: 用来压缩本地图片的插件

```javascript
// 包可能会比较难下载
// 1.下载基础包
npm i image-minimizer-webpack-plugin imagemin -D
// 2.下载无损压缩包
npm install imagemin-gifsicle imagemin-jpegtran imagemin-optipng imagemin-svgo -D
// 3.下载有损压缩包
npm install imagemin-gifsicle imagemin-mozjpeg imagemin-pngquant imagemin-svgo -D
```

```javascript
// webpack.config.js
const ImageMinimizerPlugin = require("image-minimizer-webpack-plugin");//引入插件

export moduels = {
  optimization: {
    minimizer: [
      // css压缩
      new CssMinimizerPlugin(),
      // 压缩图片:以下配置为官网直接搬运即可
      new ImageMinimizerPlugin({
        minimizer: {
          implementation: ImageMinimizerPlugin.imageminGenerate,
          options: {
            plugins: [
              ["gifsicle", { interlaced: true }],
              ["jpegtran", { progressive: true }],
              ["optipng", { optimizationLevel: 5 }],
              [
                "svgo",
                {
                  plugins: [
                    "preset-default",
                    "prefixIds",
                    {
                      name: "sortAttrs",
                      params: {
                        xmlnsOrder: "alphabetical",
                      },
                    },
                  ],
                },
              ],
            ],
          },
        },
      }),
    ],
  },
}
```

打包时会出现报错:安装两个文件到 node_modules 中即可解决

1. jpegtran.exe:复制到 `node_modules\jpegtran-bin\vendor`
2. optipng.exe:复制到`node_modules\optipng-bin\vendor`

```javascript
Error: Error with 'src\images\1.jpeg': '"C:\Users\86176\Desktop\webpack\webpack_code\node_modules\jpegtran-bin\vendor\jpegtran.exe"'
Error with 'src\images\3.gif': spawn C:\Users\86176\Desktop\webpack\webpack_code\node_modules\optipng-bin\vendor\optipng.exe ENOENT
```

# CodeSplit_多入口

1. 打包代码会将所有js文件打包到一个文件中,所以要将打包生成的文件进行代码分割，生成多个 js 文件，渲染哪个页面就只加载某个js文件，这样加载的资源就少，速度就更快。
2. Code Split（代码分割）:
   1. 分割文件：将打包生成的文件进行分割，生成多个 js 文件
   2. 按需加载：需要哪个文件就加载哪个文件

```javascript
// 多入口文件目录
├── public
├── src
|   ├── app.js
|   └── main.js
├── package.json
└── webpack.config.js
```

```javascript
// 下载包
npm i webpack webpack-cli html-webpack-plugin -D
```

```javascript
// webpack.config.js

module.exports = {
  // 单入口
  // entry: './src/main.js',
  // 多入口
  entry: {
    main: "./src/main.js",
    app: "./src/app.js",
  },
  output: {
    path: path.resolve(__dirname, "./dist"),
    // [name]是webpack命名规则，使用chunk的name作为输出的文件名。
    // 什么是chunk？打包的资源就是chunk，输出出去叫bundle。
    // chunk的name是啥呢？ 比如： entry中xxx: "./src/xxx.js", name就是xxx。注意是前面的xxx，和文件名无关。
    // 为什么需要这样命名呢？如果还是之前写法main.js，那么打包生成两个js文件都会叫做main.js会发生覆盖。(实际上会直接报错的)
    filename: "js/[name].js",
    clear: true,
  },
  plugins: [],
  mode: "production",
};
```

# CodeSplit_多入口提取公共模块

1. 被多入口文件中引用的同一份代码会被打包到每个入口文件中,导致代码重复,体积更大
2. 提取多入口的重复代码，只打包生成一个js 文件，其他文件引用它

```javascript
// webpack.config.js
module.exports = {
  // 单入口
  // entry: './src/main.js',
  // 多入口
  entry: {
    main: "./src/main.js",
    app: "./src/app.js",
  },
  output: {
    path: path.resolve(__dirname, "./dist"),
    // [name]是webpack命名规则，使用chunk的name作为输出的文件名。
    // 什么是chunk？打包的资源就是chunk，输出出去叫bundle。
    // chunk的name是啥呢？ 比如： entry中xxx: "./src/xxx.js", name就是xxx。注意是前面的xxx，和文件名无关。
    // 为什么需要这样命名呢？如果还是之前写法main.js，那么打包生成两个js文件都会叫做main.js会发生覆盖。(实际上会直接报错的)
    filename: "js/[name].js",
    clean: true,
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: "./public/index.html",
    }),
  ],
  mode: "production",
  optimization: {
    // 代码分割配置
    splitChunks: {
      chunks: "all", // 对所有模块都进行分割
      // 以下是默认值
      // minSize: 20000, // 分割代码最小的大小
      // minRemainingSize: 0, // 类似于minSize，最后确保提取的文件大小不能为0
      // minChunks: 1, // 至少被引用的次数，满足条件才会代码分割
      // maxAsyncRequests: 30, // 按需加载时并行加载的文件的最大数量
      // maxInitialRequests: 30, // 入口js文件最大并行请求数量
      // enforceSizeThreshold: 50000, // 超过50kb一定会单独打包（此时会忽略minRemainingSize、maxAsyncRequests、maxInitialRequests）
      // cacheGroups: { // 组，哪些模块要打包到一个组
      //   defaultVendors: { // 组名
      //     test: /[\\/]node_modules[\\/]/, // 需要打包到一起的模块
      //     priority: -10, // 权重（越大越高）
      //     reuseExistingChunk: true, // 如果当前 chunk 包含已从主 bundle 中拆分出的模块，则它将被重用，而不是生成新的模块
      //   },
      //   default: { // 其他没有写的配置会使用上面的默认值
      //     minChunks: 2, // 这里的minChunks权重更大
      //     priority: -20,
      //     reuseExistingChunk: true,
      //   },
      // },
      // 修改配置:实际开发中cacheGroups也不需要
      cacheGroups: {
        // 组，哪些模块要打包到一个组
        // defaultVendors: { // 组名
        //   test: /[\\/]node_modules[\\/]/, // 需要打包到一起的模块
        //   priority: -10, // 权重（越大越高）
        //   reuseExistingChunk: true, // 如果当前 chunk 包含已从主 bundle 中拆分出的模块，则它将被重用，而不是生成新的模块
        // },
        default: {
          // 其他没有写的配置会使用上面的默认值
          minSize: 0, // 我们定义的文件体积太小了，所以要改打包的最小文件体积
          minChunks: 2,
          priority: -20,
          reuseExistingChunk: true,
        },
      },
    },
  },
};
```

# CodeSplit_多入口按需加载

实现按需加载,动态导入模块:

```javascript
// .eslingtrc.js
// 需要在eslint配置中追加 按需加载 的插件配置
plugins: ["import"]
```

```javascript
// 入口文件main2.js
// math和count方法都被两个入口文件引用,在配置了多入口提取公告模块后,它们会生成两个数字ID的js文件
import {sum} from "./math"
// import {count} from "./count" // 此处为非按需加载的引入方式

document.getElementById("btn").onclick = function () {
  // 动态导入 --> 实现按需加载
  // 即使只被引用了一次，也会代码分割
  import("./math.js").then(({ sum }) => {// 可以通过浏览器的Newwork发现:在点击按钮后,count被分割的js文件才会加载
    alert(sum(1, 2, 3, 4, 5));
  });
};
```

# CodeSplit_单入口

```javascript
// webpack.config.js
optimization: {
  // 代码分割配置:单入口只需要配置这些即可
  splitChunks: {// 被使用的node_modules会被打包到入口文件中,使用按需加载的模块则会被单独打包为一个js文件
    chunks: "all", 
  },
```

# CodeSplit_给模块命名

给动态导入的文件命名

```javascript
// 此时为入口文件中动态导入模块
document.getElementById("btn").onClick = function () {
  // eslint会对动态导入语法报错，需要修改eslint配置文件
  // webpackChunkName: "math"：这是webpack动态导入模块命名的方式
  // "math"将来就会作为[name]的值显示。
  import(/* webpackChunkName: "math" */ "./js/math.js").then(({ count }) => {
    console.log(count(2, 1));
  });
};
```

```javascript
// webpack.config.js
module.exports = {
  entry: "./src/main.js",
  output: {
    path: path.resolve(__dirname, "../dist"),
    filename: "static/js/[name].js", 
    chunkFilename: "static/js/[name].chunk.js",
    assetModuleFilename: "static/media/[name].[hash][ext]", 
    clean: true,
  },
};
```

# CodeSplit_统一命名

因为打包的时候可能多种同类资源:css,js,MP4,jpg等都存在多个,如多张图片,他们在打包前有自己的名字,但一直采用之前的配置,输出之后他们的名字就会重复,因此需要改变

```javascript
// webpack.config.js
// [name]:在打包完成后输出时会自动输出为各文件打包前的名字
module.exports = {
  entry: "./src/main.js",
  output: {
    path: path.resolve(__dirname, "../dist"),
    filename: "static/js/[name].js", // 入口文件打包输出资源命名方式
    chunkFilename: "static/js/[name].chunk.js",// 动态导入输出资源命名方式
    assetModuleFilename: "static/media/[name].[hash][ext]", //图片、字体等资源命名方式（注意用hash）
    clean: true,
  },
  plugins:[
    // 提取css成单独文件
    new MiniCssExtractPlugin({
      filename: "static/css/[name].css",
      chunkFilename: "static/css/[name].chunk.css",//
    }),
  ]
};
```

# Preload和Prefetch

- 按需加载也叫懒加载,例如路由懒加载就是这样实现的
- 按需加载大体积资源时,用户会感觉到明显卡顿效果
- 在浏览器空闲时间，通过 `Preload` 或 `Prefetch` 技术加载后续需要使用的资源

1. `Preload`：告诉浏览器立即加载资源
2. `Prefetch`：告诉浏览器在空闲时才开始加载资源
3. 共同点:
   1. 都只会加载资源，并不执行
   2. 都有缓存
4. 区别:
   1. `Preload`加载优先级高，`Prefetch`加载优先级低
   2. `Preload`只能加载当前页面需要使用的资源，`Prefetch`可以加载当前页面资源，也可以加载下一个页面需要使用的资源
5. 缺点:兼容性较差;可以去`Can I Use`网站查询API的兼容性问题
6. 总结:
   1. 当前页面优先级高的资源用 `Preload` 加载
   2. 下一个页面需要使用的资源用 `Prefetch` 加载

```javascript
// 下载包:通过npmjs.com可以下载到比较冷门的包资源
npm i @vue/preload-webpack-plugin -D
```

```javascript
// webpack.config.js
const PreloadWebpackPlugin = require("@vue/preload-webpack-plugin");

plugins:[
  new PreloadWebpackPlugin({
    rel: "preload", // preload兼容性更好
    as: "script", // 只有preload才需要这一项
    // rel: 'prefetch' // prefetch兼容性更差
  }),
]
```

# Network Cache

## hash

1. 开发时对静态资源使用缓存来优化,这样浏览器第二次请求资源就能读取缓存了,速度很快
2. 但会因为前后输出的文件名是一样的,都叫main.js,在将来发布新版本，由于文件名没有变化导致用户的浏览器会直接读取以前的缓存,不再加载新资源,项目也就没法更新了。
3. 所以使用哈希文件名

- fullhash（webpack4中是 hash）:每次修改任何一个文件，所有文件名的hash都将改变,整个项目的文件缓存都将失效
- chunkhash:根据不同的入口文件(Entry)进行依赖文件解析、构建对应的chunk,生成对应的哈希值。 js和css 是同一个引入,会共享一个 hash 值
- contenthash:根据文件内容生成hash值,只有文件内容变化了,hash值才会变化,所有文件hash值是独享且不同的

```javascript
// webpack.config.js 
// 在所有输出的文件加上:`.[contenthash]`
module.exports = {
  entry: "./src/main.js",
  output: {// 出口
    path: path.resolve(__dirname, "../dist"), // 生产模式需要输出
    // [contenthash:8]使用contenthash，取8位长度
    filename: "static/js/[name].[contenthash:8].js", // 入口文件打包输出资源命名方式
    chunkFilename: "static/js/[name].[contenthash:8].chunk.js", // 动态导入输出资源命名方式
    assetModuleFilename: "static/media/[name].[hash][ext]", // 图片、字体等资源命名方式（注意用hash）
    clean: true,
  },
  plugins:[
    // 提取css成单独文件
    new MiniCssExtractPlugin({
      // 定义输出文件名和目录
      filename: "static/css/[name].[contenthash:8].css",
      chunkFilename: "static/css/[name].[contenthash:8].chunk.css",// 哈希文件名
    }),
  ]
};
```

## runtime

1. 当修改math.js文件再重新打包的时候,因为contenthash原因，math.js文件hash值发生了变化
2. math.js的变化导致main.j文件的hash值也发生了变化,这会导致 main.js 的缓存失效
   1. 更新前:math.xxx.js, main.js引用的 math.xxx.js
   2. 更新后:main.js引用的math.xxx.js,文件名变为math.yyy.js，间接导致main.js也发生了变化
3. 将hash值单独保管在一个runtime文件中
   1. 最终输出三个文件：main、math、runtime。当 math 文件发送变化，变化的是 math 和 runtime 文件，main 不变
   2. runtime文件只保存文件的 hash 值和它们与文件关系，整个文件体积就比较小，所以变化重新请求的代价也小

```javascript
module.exports = {
  optimization: {
    // 提取runtime文件
    runtimeChunk: {
      name: (entrypoint) => `runtime~${entrypoint.name}`, // runtime文件命名规则
    },
  }
}
```

# 解决js兼容性问题CoreJs

1. babel:对js代码进行了兼容性处理,但对async 函数、promise 对象、数组的一些方法（includes）等仍无法起作用
2. core-js是专门用来做ES6以及以上API的polyfill
3. `polyfill`翻译过来叫做垫片/补丁。就是用社区上提供的一段代码，让我们在不兼容某些新特性的浏览器上，使用该新特性

- eslint对Promise语法报错

```javascript
// main.js
// 添加promise代码:此时eslint会报错
const promise = Promise.resolve();
promise.then(() => {
  console.log("hello promise");
});
```

```javascript
// 下载包
npm i @babel/eslint-parser -D
```

```javascript
// .eslintrc.js
module.exports = {
  // 继承Eslint规则
  extends: ["eslint:recommended"],
  parser: "@babel/eslint-parser", // 支持最新的最终 ECMAScript 标准
  env: {
    node: true, // 启用node中全局变量
    browser: true, // 启用浏览器中全局变量
  },
  plugins: ["import"], // 解决动态导入import语法报错问题 --> 实际使用eslint-plugin-import的规则解决的
  parserOptions: {
    ecmaVersion: 6, // es6
    sourceType: "module", // es module
  },
  rules: {
    "no-var": 2, // 不能使用 var 定义变量
  },
};
```

- `bable`无法对高级的ES6语法进行兼容性处理,使用`core-js`来替代

```javascript
// 下载包
npm i core-js
```

```javascript
// main.js
import "core-js";// 完全引入体积太大
import "core-js/es/promise"; //手动按需引入:太麻烦

// 添加promise代码
const promise = Promise.resolve();
promise.then(() => {
  console.log("hello promise");
});
```

```javascript
//babel.config.js

//自动按需引入core-js
module.exports = {
  // 智能预设：能够编译ES6语法
  presets: [
    [
      "@babel/preset-env",
      // 按需加载core-js的polyfill
      { useBuiltIns: "usage", corejs: { version: "3", proposals: true } },
    ],
  ],
};
```

# PWA

- `Web App`项目:项目一旦处于网络离线情况,就无法访问
- 渐进式网络应用程序(progressive web application - PWA)：一种可以提供类似于 native app(原生应用程序)体验的 Web App 的技术;
- 在离线(offline)时应用程序能够继续运行功能,内部通过Service Workers 技术实现的

```javascript
// 下载包
npm i workbox-webpack-plugin -D
```

```javascript
// webpack.config.js
const WorkboxPlugin = require("workbox-webpack-plugin");

plugins:[
  new WorkboxPlugin.GenerateSW({
    // 这些选项帮助快速启用 ServiceWorkers
    // 不允许遗留任何“旧的” ServiceWorkers
    clientsClaim: true,
    skipWaiting: true,
  }),
]
```

```javascript
//  main.js

// 以下为serviceWorker的注册代码
if ("serviceWorker" in navigator) {// serviceWorker:具有严重的兼容性问题
  window.addEventListener("load", () => {// 因此会先判断注册,注册成功再使用
    navigator.serviceWorker
      .register("/service-worker.js")
      .then((registration) => {// 成功的回调
        console.log("SW registered: ", registration);
      })
      .catch((registrationError) => {// 失败的回调
        console.log("SW registration failed: ", registrationError);
      });
  });
}
```

1. 此时如果直接通过`VSCode`访问打包后页面，在浏览器控制台会发现 `SW registration failed`。
2. 因为我们打开的访问路径是：`http://127.0.0.1:5500/dist/index.html`。此时页面会去请求 `service-worker.js` 文件，请求路径是：`http://127.0.0.1:5500/service-worker.js`，这样找不到会404。
3. 实际`service-worker.js`文件路径是：`http://127.0.0.1:5500/dist/service-worker.js`。
4. 解决路径问题:

```javascript
// 下载包
npm i serve -g// serve 也是用来启动开发服务器来部署代码查看效果的
```

```javascript
// 运行指令
serve dist// 此时通过 serve 启动的服务器我们 service-worker 就能注册成功
```

# 总结

我们从4个角度对webpack和代码进行了优化:

1. 提升开发体验
   1. 使用 `Source Map` 让开发或上线时代码报错能有更加准确的错误提示
2. 提升 webpack 提升打包构建速度
   1. 使用 `HotModuleReplacement` 让开发时只重新编译打包更新变化了的代码，不变的代码使用缓存，从而使更新速度更快。
   2. 使用 `OneOf` 让资源文件一旦被某个 loader 处理了，就不会继续遍历了，打包速度更快。
   3. 使用 `Include/Exclude` 排除或只检测某些文件，处理的文件更少，速度更快。
   4. 使用 `Cache` 对 eslint 和 babel 处理的结果进行缓存，让第二次打包速度更快。
   5. 使用 `Thead` 多进程处理 eslint 和 babel 任务，速度更快。（需要注意的是，进程启动通信都有开销的，要在比较多代码处理时使用才有效果）
3. 减少代码体积
   1. 使用 `Tree Shaking` 剔除了没有使用的多余代码，让代码体积更小。
   2. 使用 `@babel/plugin-transform-runtime` 插件对 babel 进行处理，让辅助代码从中引入，而不是每个文件都生成辅助代码，从而体积更小。
   3. 使用 `Image Minimizer` 对项目中图片进行压缩，体积更小，请求速度更快。（需要注意的是，如果项目中图片都是在线链接，那么就不需要了。本地项目静态图片才需要进行压缩。）
4. 优化代码运行性能
   1. 使用 `Code Split` 对代码进行分割成多个 js 文件，从而使单个文件体积更小，并行加载 js 速度更快。并通过 import 动态导入语法进行按需加载，从而达到需要使用时才加载该资源，不用时不加载资源。
   2. 使用 `Preload / Prefetch` 对代码进行提前加载，等未来需要使用时就能直接使用，从而用户体验更好。
   3. 使用 `Network Cache` 能对输出资源文件进行更好的命名，将来好做缓存，从而用户体验更好。
   4. 使用 `Core-js` 对 js 进行兼容性处理，让我们代码能运行在低版本浏览器。
   5. 使用 `PWA` 能让代码离线也能访问，从而提升用户体验。



# 项目介绍

# ReactCli_开发模式配置1

null

# ReactCli_开发模式配置2

null

# ReactCli_生产模式配置1

null

# ReactCli_生产模式配置2

null

# ReactCli_合并配置1

null

# ReactCli_优化配置

null

# VueCli_开发模式配置

```javascript
// webpack.dev.js
const path = require("path");// 绝对路径插件
const ESLintWebpackPlugin = require("eslint-webpack-plugin");// Eslint插件
const HtmlWebpackPlugin = require("html-webpack-plugin");// Html插件
const { VueLoaderPlugin } = require("vue-loader");
const { DefinePlugin } = require("webpack");// 定义环境变量给js和vue文件使用
const CopyPlugin = require("copy-webpack-plugin");

// 返回处理样式loader的函数
const getStyleLoaders = (preProcessor) => {
  return [
    "vue-style-loader",// 使用vue-style-loader替换style-loader
    "css-loader",
    {// postcss-preset-env模块的配置项,需要配合package.json中browserlist来指定兼容性
      loader: "postcss-loader",
      options: {
        postcssOptions: {
          plugins: [
            "postcss-preset-env", // 解决大多数css样式兼容性问题
          ],
        },
      },
    },
    preProcessor,
  ].filter(Boolean);// 将函数中的undefined值过滤
};

module.exports = {
  entry: "./src/main.js",
  output: {
    path: undefined,
    filename: "static/js/[name].js",
    chunkFilename: "static/js/[name].chunk.js",
    assetModuleFilename: "static/js/[hash:10][ext][query]",
  },
  module: {
    rules: [
      {
        // 用来匹配 .css 结尾的文件
        test: /\.css$/,
        // use数组里面Loader执行顺序是从右到左
        use: getStyleLoaders(),
      },
      {
        test: /\.less$/,
        use: getStyleLoaders("less-loader"),
      },
      {
        test: /\.s[ac]ss$/,
        use: getStyleLoaders("sass-loader"),
      },
      {
        test: /\.styl$/,
        use: getStyleLoaders("stylus-loader"),
      },
      //处理图片
      {
        test: /\.(png|jpe?g|gif|svg)$/,
        type: "asset",
        parser: {// 图片优化
          dataUrlCondition: {
            maxSize: 10 * 1024, // 小于10kb的图片会被base64处理
          },
        },
      },
      // 处理字体资源
      {
        test: /\.(ttf|woff2?)$/,
        type: "asset/resource",
      },
      // 处理js资源
      {
        test: /\.js$/,
        include: path.resolve(__dirname, "../src"),// 要处理js文件的目录
        loader: "babel-loader",
        options: { 
          cacheDirectory: true, // 开启缓存第二次打包速度
          cacheCompression: false, // 缓存内容不压缩
          plugins: [
            // "@babel/plugin-transform-runtime" // presets中包含了
          ],
        },
      },
      // 处理vue资源
      // vue-loader不支持oneOf
      {
        test: /\.vue$/,
        loader: "vue-loader", // 内部会给vue文件注入HMR功能代码
        options: {
          // 开启缓存
          cacheDirectory: path.resolve(
            __dirname,
            "node_modules/.cache/vue-loader"
          ),
        },
      },
    ],
  },
  plugins: [
    // Eslint检验js代码规范
    new ESLintWebpackPlugin({
      context: path.resolve(__dirname, "../src"),// 要检验的目录
      exclude: "node_modules",// 要排除的目录
      cache: true, // 是否缓存检验结果,可以加快第二次检验速度
      cacheLocation: path.resolve( // 缓存的路径
        __dirname,
        "../node_modules/.cache/.eslintcache"
      ),
    }),
    // 处理Html文件
    new HtmlWebpackPlugin({
      template: path.resolve(__dirname, "../public/index.html"),
    }),
    // 因为这些静态资源不会被打包,所以将public下面的静态资源复制到dist目录去(除了index.html)
    new CopyPlugin({
      patterns: [
        {
          from: path.resolve(__dirname, "../public"),
          to: path.resolve(__dirname, "../dist"),
          toType: "dir",
          noErrorOnMissing: true,
          globOptions: {
            ignore: ["**/index.html"],
          },
          info: {
            minimized: true,
          },
        },
      ],
    }),
    // 安装 vue-loader和vue-template-compiler包后,可以使用此插件,在使用此插件后,modules中才能使用vue-loader处理vue资源
    new VueLoaderPlugin(),
    // DefinePlugin定义环境变量给源代码使用,从而解决vue3页面警告的问题
    new DefinePlugin({
      __VUE_OPTIONS_API__: "true",
      __VUE_PROD_DEVTOOLS__: "false",
    }),
  ],
  optimization: {
    // 代码分割
    splitChunks: {
      chunks: "all",
    },
    // 代码分割将引起文件的hash改变,导致文件间的引用失效;因此使用runtime解决
    runtimeChunk: {
      name: (entrypoint) => `runtime~${entrypoint.name}`,
    },
  },
  // webpack解析模块加载选项
  resolve: {
    extensions: [".vue", ".js", ".json"], // 自动补全文件扩展名，让vue可以使用
  },
  // 自动化服务器:在内存中运行
  devServer: {
    open: true,
    host: "localhost",
    port: 3000,
    hot: true, // 热模块替换
    compress: true,
    historyApiFallback: true, // 解决vue-router刷新404问题
  },
  mode: "development",// 开发模式
  devtool: "cheap-module-source-map",// source-map:开启开发者工具中的代码映射
};
```

```javascript
// package.json
{
  "name": "vue-cli",
  "version": "1.0.0",
  "description": "",
  "main": "main.js",
  "scripts": {
    "start": "npm run dev",
      // 下载cross-env包:即可直接在此使用来定义环境变量
      // 在webpack前加上 `cross-env NODE_ENV=development(production)`
    "dev": "cross-env NODE_ENV=development webpack serve --config ./config/webpack.dev.js", // 部署自动化服务器
    "build": "cross-env NODE_ENV=production webpack --config ./config/webpack.prod.js"
  },
  "keywords": [],
  "author": "",
  "license": "ISC",
  "devDependencies": {
    "@babel/core": "^7.17.10",
    "@babel/eslint-parser": "^7.17.0",
    "@vue/cli-plugin-babel": "^5.0.4",
    "babel-loader": "^8.2.5",
    "copy-webpack-plugin": "^10.2.4",
    "cross-env": "^7.0.3",
    "css-loader": "^6.7.1",
    "css-minimizer-webpack-plugin": "^3.4.1",
    "eslint-plugin-vue": "^8.7.1",
    "eslint-webpack-plugin": "^3.1.1",
    "html-webpack-plugin": "^5.5.0",
    "image-minimizer-webpack-plugin": "^3.2.3",
    "imagemin": "^8.0.1",
    "imagemin-gifsicle": "^7.0.0",
    "imagemin-jpegtran": "^7.0.0",
    "imagemin-optipng": "^8.0.0",
    "imagemin-svgo": "^10.0.1",
    "less-loader": "^10.2.0",
    "mini-css-extract-plugin": "^2.6.0",
    "postcss-preset-env": "^7.5.0",
    "sass-loader": "^12.6.0",
    "stylus-loader": "^6.2.0",
    "vue-loader": "^17.0.0",
    "vue-style-loader": "^4.1.3",
    "vue-template-compiler": "^2.6.14",
    "webpack": "^5.72.0",
    "webpack-cli": "^4.9.2",
    "webpack-dev-server": "^4.9.0"
  },
  "dependencies": {
    "vue": "^3.2.33",
    "vue-router": "^4.0.15"
  },
  "browserslist": ["last 2 version", "> 1%", "not dead"] // postcss:处理css兼容性
}
```

```javascript
// .eslintrc.js
module.exports = {
  root: true,
  env: {
    node: true,
  },
  extends: ["plugin:vue/vue3-essential", "eslint:recommended"],//继承vue3和Eslint官方规则
  parserOptions: {
    // 需要下载`@babel/eslint-parser`包
    parser: "@babel/eslint-parser",
  },
};
```

```javascript
// babel.config.js
module.exports = {
  // 下载包`@vue/cli-plugin-babel`
  presets: ["@vue/cli-plugin-babel/preset"],
};
```

# VueCli_生产模式配置

```javascript
// webpack.prod.js
const path = require("path");
const ESLintWebpackPlugin = require("eslint-webpack-plugin");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");// 提取css插件
const CssMinimizerPlugin = require("css-minimizer-webpack-plugin");
const TerserWebpackPlugin = require("terser-webpack-plugin");// js压缩
const ImageMinimizerPlugin = require("image-minimizer-webpack-plugin"); //图片压缩
const { VueLoaderPlugin } = require("vue-loader");
const { DefinePlugin } = require("webpack");

const getStyleLoaders = (preProcessor) => {
  return [
    MiniCssExtractPlugin.loader,// 生产要提取css文件,所以用:MiniCssExtractPlugin.loader
    "css-loader",
    {
      loader: "postcss-loader",
      options: {
        postcssOptions: {
          plugins: [
            "postcss-preset-env",
          ],
        },
      },
    },
    preProcessor,
  ].filter(Boolean);
};

module.exports = {
  entry: "./src/main.js",
  output: {
    path: undefined,
    filename: "static/js/[name].[contenthash:10].js",
    chunkFilename: "static/js/[name].[contenthash:10].chunk.js",
    assetModuleFilename: "static/js/[hash:10][ext][query]",
    clean: true,// 清除上一次打包留下的资源
  },
  module: {
    rules: [
      {
        test: /\.css$/,
        use: getStyleLoaders(),
      },
      {
        test: /\.less$/,
        use: getStyleLoaders("less-loader"),
      },
      {
        test: /\.s[ac]ss$/,
        use: getStyleLoaders("sass-loader"),
      },
      {
        test: /\.styl$/,
        use: getStyleLoaders("stylus-loader"),
      },
      {
        test: /\.(png|jpe?g|gif|svg)$/,
        type: "asset",
        parser: {
          dataUrlCondition: {
            maxSize: 10 * 1024, 
          },
        },
      },
      {
        test: /\.(ttf|woff2?)$/,
        type: "asset/resource",
      },
      {
        test: /\.(jsx|js)$/,
        include: path.resolve(__dirname, "../src"),
        loader: "babel-loader",
        options: {
          cacheDirectory: true,
          cacheCompression: false,
          plugins: [
          ],
        },
      },
      {
        test: /\.vue$/,
        loader: "vue-loader", // 内部会给vue文件注入HMR功能代码
        options: {
          cacheDirectory: path.resolve(
            __dirname,
            "node_modules/.cache/vue-loader"
          ),
        },
      },
    ],
  },
  plugins: [
    new ESLintWebpackPlugin({
      context: path.resolve(__dirname, "../src"),
      exclude: "node_modules",
      cache: true,
      cacheLocation: path.resolve(
        __dirname,
        "../node_modules/.cache/.eslintcache"
      ),
    }),
    new HtmlWebpackPlugin({
      template: path.resolve(__dirname, "../public/index.html"),
    }),
    new CopyPlugin({
      patterns: [
        {
          from: path.resolve(__dirname, "../public"),
          to: path.resolve(__dirname, "../dist"),
          toType: "dir",
          noErrorOnMissing: true,
          globOptions: {
            ignore: ["**/index.html"],
          },
          info: {
            minimized: true,
          },
        },
      ],
    }),
    new MiniCssExtractPlugin({ // 提取css文件
      filename: "static/css/[name].[contenthash:10].css",
      chunkFilename: "static/css/[name].[contenthash:10].chunk.css",
    }),
    new VueLoaderPlugin(),
    new DefinePlugin({
      __VUE_OPTIONS_API__: "true",
      __VUE_PROD_DEVTOOLS__: "false",
    }),
  ],
  optimization: {
    // 压缩的操作
    minimizer: [
      new CssMinimizerPlugin(),
      new TerserWebpackPlugin(),
      new ImageMinimizerPlugin({// 图片压缩:及其配置,配置照抄不用理解
        minimizer: {
          implementation: ImageMinimizerPlugin.imageminGenerate,
          options: {
            plugins: [
              ["gifsicle", { interlaced: true }],
              ["jpegtran", { progressive: true }],
              ["optipng", { optimizationLevel: 5 }],
              [
                "svgo",
                {
                  plugins: [
                    "preset-default",
                    "prefixIds",
                    {
                      name: "sortAttrs",
                      params: {
                        xmlnsOrder: "alphabetical",
                      },
                    },
                  ],
                },
              ],
            ],
          },
        },
      }),
    ],
    splitChunks: {
      chunks: "all",
    },
    runtimeChunk: {
      name: (entrypoint) => `runtime~${entrypoint.name}`,
    },
  },
  resolve: {
    extensions: [".vue", ".js", ".json"],
  },
  mode: "production",
  devtool: "source-map",
};
```

```javascript
// package.json
{
  "name": "react-cli",
  "version": "1.0.0",
  "description": "",
  "main": "index.js",
  "scripts": {
    "start": "npm run dev",
    "dev": "cross-env NODE_ENV=development webpack serve --config ./config/webpack.dev.js",
    "build": "cross-env NODE_ENV=production webpack --config ./config/webpack.prod.js"
  },
  "keywords": [],
  "author": "",
  "license": "ISC",
  "devDependencies": {// vue-cli需要的依赖包
    "@babel/core": "^7.17.10",
    "@pmmmwh/react-refresh-webpack-plugin": "^0.5.5",
    "babel-loader": "^8.2.5",
    "babel-preset-react-app": "^10.0.1",
    "copy-webpack-plugin": "^10.2.4",
    "cross-env": "^7.0.3",
    "css-loader": "^6.7.1",
    "css-minimizer-webpack-plugin": "^3.4.1",
    "eslint-config-react-app": "^7.0.1",
    "eslint-webpack-plugin": "^3.1.1",
    "html-webpack-plugin": "^5.5.0",
    "image-minimizer-webpack-plugin": "^3.2.3",
    "imagemin": "^8.0.1",
    "imagemin-gifsicle": "^7.0.0",
    "imagemin-jpegtran": "^7.0.0",
    "imagemin-optipng": "^8.0.0",
    "imagemin-svgo": "^10.0.1",
    "less-loader": "^10.2.0",
    "mini-css-extract-plugin": "^2.6.0",
    "postcss-loader": "^6.2.1",
    "postcss-preset-env": "^7.5.0",
    "react-refresh": "^0.13.0",
    "sass-loader": "^12.6.0",
    "style-loader": "^3.3.1",
    "stylus-loader": "^6.2.0",
    "webpack": "^5.72.0",
    "webpack-cli": "^4.9.2",
    "webpack-dev-server": "^4.9.0"
  },
  "dependencies": {
    "antd": "^4.20.2",
    "react": "^18.1.0",
    "react-dom": "^18.1.0",
    "react-router-dom": "^6.3.0"
  },
  "browserslist": ["last 2 version", "> 1%", "not dead"]
}
```

```javascript
// .eslintrc.js
module.exports = {
  extends: ["react-app"], // 继承 react 官方规则
  parserOptions: {
    babelOptions: {
      presets: [
        // 解决页面报错问题
        ["babel-preset-react-app", false],
        "babel-preset-react-app/prod",
      ],
    },
  },
};
```

```javascript
// babel.config.js
module.exports = {
  // 使用react官方规则
  presets: ["react-app"],
};
```

# VueCli_合并模式配置

生产模式和开发模式都能使用的webpack.config.js

```javascript
// webpack.config.js
const path = require("path");
const ESLintWebpackPlugin = require("eslint-webpack-plugin");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const CssMinimizerPlugin = require("css-minimizer-webpack-plugin");
const TerserWebpackPlugin = require("terser-webpack-plugin");
const ImageMinimizerPlugin = require("image-minimizer-webpack-plugin");
const { VueLoaderPlugin } = require("vue-loader");
const { DefinePlugin } = require("webpack");
const CopyPlugin = require("copy-webpack-plugin");

// 需要通过 cross-env 定义环境变量
const isProduction = process.env.NODE_ENV === "production";

const getStyleLoaders = (preProcessor) => {
  return [
    isProduction ? MiniCssExtractPlugin.loader : "vue-style-loader",
    "css-loader",
    {
      loader: "postcss-loader",
      options: {
        postcssOptions: {
          plugins: ["postcss-preset-env"],
        },
      },
    },
    preProcessor,
  ].filter(Boolean);
};

module.exports = {
  entry: "./src/main.js",
  output: {
    path: isProduction ? path.resolve(__dirname, "../dist") : undefined,
    filename: isProduction
      ? "static/js/[name].[contenthash:10].js"
      : "static/js/[name].js",
    chunkFilename: isProduction
      ? "static/js/[name].[contenthash:10].chunk.js"
      : "static/js/[name].chunk.js",
    assetModuleFilename: "static/js/[hash:10][ext][query]",
    clean: true,
  },
  module: {
    rules: [
      {
        test: /\.css$/,
        use: getStyleLoaders(),
      },
      {
        test: /\.less$/,
        use: getStyleLoaders("less-loader"),
      },
      {
        test: /\.s[ac]ss$/,
        use: getStyleLoaders("sass-loader"),
      },
      {
        test: /\.styl$/,
        use: getStyleLoaders("stylus-loader"),
      },
      {
        test: /\.(png|jpe?g|gif|svg)$/,
        type: "asset",
        parser: {
          dataUrlCondition: {
            maxSize: 10 * 1024,
          },
        },
      },
      {
        test: /\.(ttf|woff2?)$/,
        type: "asset/resource",
      },
      {
        test: /\.(jsx|js)$/,
        include: path.resolve(__dirname, "../src"),
        loader: "babel-loader",
        options: {
          cacheDirectory: true,
          cacheCompression: false,
          plugins: [
          ],
        },
      },
      {
        test: /\.vue$/,
        loader: "vue-loader", 
        options: {
          cacheDirectory: path.resolve(
            __dirname,
            "node_modules/.cache/vue-loader"
          ),
        },
      },
    ],
  },
  plugins: [
    new ESLintWebpackPlugin({
      context: path.resolve(__dirname, "../src"),
      exclude: "node_modules",
      cache: true,
      cacheLocation: path.resolve(
        __dirname,
        "../node_modules/.cache/.eslintcache"
      ),
    }),
    new HtmlWebpackPlugin({
      template: path.resolve(__dirname, "../public/index.html"),
    }),
    new CopyPlugin({
      patterns: [
        {
          from: path.resolve(__dirname, "../public"),
          to: path.resolve(__dirname, "../dist"),
          toType: "dir",
          noErrorOnMissing: true,
          globOptions: {
            ignore: ["**/index.html"],
          },
          info: {
            minimized: true,
          },
        },
      ],
    }),
    isProduction &&
      new MiniCssExtractPlugin({
        filename: "static/css/[name].[contenthash:10].css",
        chunkFilename: "static/css/[name].[contenthash:10].chunk.css",
      }),
    new VueLoaderPlugin(),
    new DefinePlugin({
      __VUE_OPTIONS_API__: "true",
      __VUE_PROD_DEVTOOLS__: "false",
    }),
  ].filter(Boolean),
  optimization: {
    minimize: isProduction,
    minimizer: [
      new CssMinimizerPlugin(),
      new TerserWebpackPlugin(),
      new ImageMinimizerPlugin({
        minimizer: {
          implementation: ImageMinimizerPlugin.imageminGenerate,
          options: {
            plugins: [
              ["gifsicle", { interlaced: true }],
              ["jpegtran", { progressive: true }],
              ["optipng", { optimizationLevel: 5 }],
              [
                "svgo",
                {
                  plugins: [
                    "preset-default",
                    "prefixIds",
                    {
                      name: "sortAttrs",
                      params: {
                        xmlnsOrder: "alphabetical",
                      },
                    },
                  ],
                },
              ],
            ],
          },
        },
      }),
    ],
    splitChunks: {
      chunks: "all",
    },
    runtimeChunk: {
      name: (entrypoint) => `runtime~${entrypoint.name}`,
    },
  },
  resolve: {
    extensions: [".vue", ".js", ".json"],
  },
  devServer: {
    open: true,
    host: "localhost",
    port: 3000,
    hot: true,
    compress: true,
    historyApiFallback: true,
  },
  mode: isProduction ? "production" : "development",
  devtool: isProduction ? "source-map" : "cheap-module-source-map",
};
```

# VueCli_优化模式配置

通过`webpack.config.js`配置`element-ui`的自动按需导入

```javascript
// webpack.config.js
const path = require("path");
const ESLintWebpackPlugin = require("eslint-webpack-plugin");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const CssMinimizerPlugin = require("css-minimizer-webpack-plugin");
const ImageMinimizerPlugin = require("image-minimizer-webpack-plugin");
const TerserWebpackPlugin = require("terser-webpack-plugin");
const CopyPlugin = require("copy-webpack-plugin");
const { VueLoaderPlugin } = require("vue-loader");
const { DefinePlugin } = require("webpack");
const AutoImport = require("unplugin-auto-import/webpack");
const Components = require("unplugin-vue-components/webpack");
const { ElementPlusResolver } = require("unplugin-vue-components/resolvers");
// 需要通过 cross-env 定义环境变量
const isProduction = process.env.NODE_ENV === "production";

const getStyleLoaders = (preProcessor) => {
  return [
    isProduction ? MiniCssExtractPlugin.loader : "vue-style-loader",
    "css-loader",
    {
      loader: "postcss-loader",
      options: {
        postcssOptions: {
          plugins: ["postcss-preset-env"],
        },
      },
    },
    preProcessor && { // 修改主题.自定义主题
      loader: preProcessor,
      options:
        preProcessor === "sass-loader"
          ? {
              // 自定义主题：自动引入我们定义的scss文件
              additionalData: `@use "@/styles/element/index.scss" as *;`,
            }
          : {},
    },
  ].filter(Boolean);
};

module.exports = {
  entry: "./src/main.js",
  output: {
    path: isProduction ? path.resolve(__dirname, "../dist") : undefined,
    filename: isProduction
      ? "static/js/[name].[contenthash:10].js"
      : "static/js/[name].js",
    chunkFilename: isProduction
      ? "static/js/[name].[contenthash:10].chunk.js"
      : "static/js/[name].chunk.js",
    assetModuleFilename: "static/js/[hash:10][ext][query]",
    clean: true,
  },
  module: {
    rules: [
      {
        test: /\.css$/,
        use: getStyleLoaders(),
      },
      {
        test: /\.less$/,
        use: getStyleLoaders("less-loader"),
      },
      {
        test: /\.s[ac]ss$/,
        use: getStyleLoaders("sass-loader"),
      },
      {
        test: /\.styl$/,
        use: getStyleLoaders("stylus-loader"),
      },
      {
        test: /\.(png|jpe?g|gif|svg)$/,
        type: "asset",
        parser: {
          dataUrlCondition: {
            maxSize: 10 * 1024,
          },
        },
      },
      {
        test: /\.(ttf|woff2?)$/,
        type: "asset/resource",
      },
      {
        test: /\.(jsx|js)$/,
        include: path.resolve(__dirname, "../src"),
        loader: "babel-loader",
        options: {
          cacheDirectory: true,
          cacheCompression: false,
          plugins: [
            // "@babel/plugin-transform-runtime" // presets中包含了
          ],
        },
      },
      {
        test: /\.vue$/,
        loader: "vue-loader", // 内部会给vue文件注入HMR功能代码
        options: {
          cacheDirectory: path.resolve(
            __dirname,
            "node_modules/.cache/vue-loader"
          ),
        },
      },
    ],
  },
  plugins: [
    new ESLintWebpackPlugin({
      context: path.resolve(__dirname, "../src"),
      exclude: "node_modules",
      cache: true,
      cacheLocation: path.resolve(
        __dirname,
        "../node_modules/.cache/.eslintcache"
      ),
    }),
    new HtmlWebpackPlugin({
      template: path.resolve(__dirname, "../public/index.html"),
    }),
    new CopyPlugin({
      patterns: [
        {
          from: path.resolve(__dirname, "../public"),
          to: path.resolve(__dirname, "../dist"),
          toType: "dir",
          noErrorOnMissing: true,
          globOptions: {
            ignore: ["**/index.html"],
          },
          info: {
            minimized: true,
          },
        },
      ],
    }),
    isProduction &&
      new MiniCssExtractPlugin({
        filename: "static/css/[name].[contenthash:10].css",
        chunkFilename: "static/css/[name].[contenthash:10].chunk.css",
      }),
    new VueLoaderPlugin(),
    new DefinePlugin({
      __VUE_OPTIONS_API__: "true",
      __VUE_PROD_DEVTOOLS__: "false",
    }),
    
    // 按需加载element-plus组件样式
    AutoImport({
      resolvers: [ElementPlusResolver()],
    }),
    Components({
      resolvers: [
        ElementPlusResolver({
          importStyle: "sass", // 自定义主题
        }),
      ],
    }),
  ].filter(Boolean),
  optimization: {
    minimize: isProduction,
    minimizer: [
      new CssMinimizerPlugin(),
      new TerserWebpackPlugin(),
      new ImageMinimizerPlugin({
        minimizer: {
          implementation: ImageMinimizerPlugin.imageminGenerate,
          options: {
            plugins: [
              ["gifsicle", { interlaced: true }],
              ["jpegtran", { progressive: true }],
              ["optipng", { optimizationLevel: 5 }],
              [
                "svgo",
                {
                  plugins: [
                    "preset-default",
                    "prefixIds",
                    {
                      name: "sortAttrs",
                      params: {
                        xmlnsOrder: "alphabetical",
                      },
                    },
                  ],
                },
              ],
            ],
          },
        },
      }),
    ],
    splitChunks: {
      chunks: "all",
      cacheGroups: {
        // layouts通常是admin项目的主体布局组件，所有路由组件都要使用的
        // 可以单独打包，从而复用
        // 如果项目中没有，请删除
        layouts: {
          name: "layouts",
          test: path.resolve(__dirname, "../src/layouts"),
          priority: 40,
        },
        // 如果项目中使用element-plus，此时将所有node_modules打包在一起，那么打包输出文件会比较大。
        // 所以我们将node_modules中比较大的模块单独打包，从而并行加载速度更好
        // 如果项目中没有，请删除
        elementUI: {
          name: "chunk-elementPlus",
          test: /[\\/]node_modules[\\/]_?element-plus(.*)/,
          priority: 30,
        },
        // 将vue相关的库单独打包，减少node_modules的chunk体积。
        vue: {
          name: "vue",
          test: /[\\/]node_modules[\\/]vue(.*)[\\/]/,
          chunks: "initial",
          priority: 20,
        },
        libs: {
          name: "chunk-libs",
          test: /[\\/]node_modules[\\/]/,
          priority: 10, // 权重最低，优先考虑前面内容
          chunks: "initial",
        },
      },
    },
    runtimeChunk: {
      name: (entrypoint) => `runtime~${entrypoint.name}`,
    },
  },
  resolve: {
    extensions: [".vue", ".js", ".json"],
    alias: {
      // 路径别名
      "@": path.resolve(__dirname, "../src"),
    },
  },
  devServer: {
    open: true,
    host: "localhost",
    port: 3000,
    hot: true,
    compress: true,
    historyApiFallback: true, // 解决vue-router刷新404问题
  },
  mode: isProduction ? "production" : "development",
  devtool: isProduction ? "source-map" : "cheap-module-source-map",
  performance: false,
};
```

```javascript
// App.vue
import {ElButton} from "element-plus"

export default {
  name:"APP",
  components:{ElButton}
}
```

# 总结

null

# loader介绍

以下章节均为原理:通过本地课件学习,工作后再补上笔记



























