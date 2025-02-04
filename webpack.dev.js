// 导入 webpack-merge 用于合并配置
const { merge } = require('webpack-merge');
// 导入公共配置
const common = require('./webpack.common.js');

module.exports = merge(common, {
  // 设置为开发模式
  mode: 'development',
  // 配置 source-map，方便调试
  devtool: 'inline-source-map',
  // 开发服务器配置
  devServer: {
    // 启用热更新
    hot: true,
    // 指定静态资源目录
    static: './dist',
    // 设置端口
    port: 8080,
    // 启用 gzip 压缩
    compress: true,
    // 自动打开浏览器
    open: true
  },
  output: {
    // 开发环境使用普通文件名
    filename: '[name].bundle.js'
  }
});
