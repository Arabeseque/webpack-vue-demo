const path = require('path');
const { VueLoaderPlugin } = require('vue-loader')
const webpack = require('webpack');

module.exports = {
  // 入口文件：应用的起点
  entry: './src/main.js',
  // 输出配置：构建后的文件保存路径和文件名
  output: {
    filename: (pathData) => {
      // 如果是主 chunk，用 [name].js，其他 chunk 用 [name]-chunk.js
      return pathData.chunk.name === 'main' ? '[name].js' : '[name]-chunk.js';
    },
    path: path.resolve(__dirname, 'dist')
  },
  module: {
    rules: [
      {
        // 处理 .vue 文件
        test: /\.vue$/,
        loader: 'vue-loader'
      },
      {
        // 处理 CSS 文件
        test: /\.css$/,
        use: ['style-loader', 'css-loader']
      }
    ]
  },
  plugins: [
    // 必须添加这个插件来启用 vue-loader
    new VueLoaderPlugin(),
    // 启用热更新插件
    new webpack.HotModuleReplacementPlugin()
  ],
  resolve: {
    alias: {
      // 提供完整版 Vue（包含编译器）以支持 .vue 文件的 template 编译
      'vue$': 'vue/dist/vue.esm-bundler.js'
    },
    extensions:[".*",".js",".vue",".json"]
  },
  optimization: {
    // 启用代码分割功能（SplitChunksPlugin）
    splitChunks: {
      chunks: 'all'
    }
  },
  devServer: {
    static: path.join(__dirname, 'dist'),
    compress: true,
    port: 9000,
    devMiddleware: {
      writeToDisk: true,
    },
    hot: true    // 开启 HMR
  },
  // development 模式下自动会启用 Tree Shaking，另外在 package.json 中配置 sideEffects 能进一步辅助 Tree Shaking 工作
  mode: 'development'
};
