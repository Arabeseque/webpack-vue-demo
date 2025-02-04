const path = require('path');
const { VueLoaderPlugin } = require('vue-loader');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');

// 动态获取环境变量
const isProduction = process.env.NODE_ENV === 'production';

module.exports = {
  entry: './src/main.js',
  output: {
    path: path.resolve(__dirname, 'dist'),
  },
  module: {

    rules: [
      {
        test: /\.vue$/,
        loader: 'vue-loader'
      },
      {
        test: /\.css$/,

        oneOf: [
          // 处理 Vue SFC 中的 <style> 块
          {
            resourceQuery: /vue/,
            use: [
              isProduction ? MiniCssExtractPlugin.loader : 'vue-style-loader',
              'css-loader'
            ]
          },
          // 处理普通 CSS 文件
          {
            use: [
              isProduction ? MiniCssExtractPlugin.loader : 'style-loader',
              'css-loader'
            ]
          }
        ]
      }
    ]
  },

  plugins: [
    new VueLoaderPlugin(),

  ],
  resolve: {
    alias: {
      'vue$': 'vue/dist/vue.esm-bundler.js'
    },
    extensions: [".*", ".js", ".vue", ".json"]
  },
  optimization: {
    splitChunks: {
      chunks: 'all'
    }
  }
};
