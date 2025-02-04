const { merge } = require('webpack-merge');
const common = require('./webpack.common.js');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const TerserPlugin = require('terser-webpack-plugin');
const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin;
const path = require('path');

module.exports = merge(common, {
  // 设置为生产模式
  mode: 'production',
  // 生产环境不需要 source-map
  devtool: false,
  output: {
    path: path.resolve(__dirname, 'dist'),
    // 使用内容哈希命名
    // 通过 内容哈希 生成唯一的文件名，确保当文件内容变化时，文件名也会变化，浏览器会重新加载最新的资源。
    filename: '[name].[contenthash:8].js',
    // 清理输出目录
    // 清理旧的输出目录，可能会导致 冗余文件、缓存问题 和 资源混乱
    clean: true
  },
  module: {
    rules: [
      {
        test: /\.css$/,
        use: [
          // 替换 style-loader，提取 CSS 到单独文件
          MiniCssExtractPlugin.loader,
          'css-loader'
        ]
      }
    ]
  },
  plugins: [
    // 提取 CSS 到单独文件
    new MiniCssExtractPlugin({
      filename: 'css/[name].[contenthash:8].css'
    }),
    // 打包分析插件（可选，建议按需开启）
    new BundleAnalyzerPlugin()
  ],
  optimization: {
    // 压缩代码
    minimizer: [
      new TerserPlugin({
        terserOptions: {
          compress: {
            // 生产环境移除 console
            // 会在生产环境下移除所有 console 语句
            drop_console: true
          }
        }
      })
    ],
    // 分割代码块配置
    splitChunks: {
      chunks: 'all',
      // 缓存分组
      cacheGroups: {
        // 第三方模块
        vendors: {
          name: 'chunk-vendors',
          test: /[\\/]node_modules[\\/]/,
          priority: -10,
          chunks: 'initial'
        },
        // 公共模块
        common: {
          name: 'chunk-common',
          minChunks: 2,
          priority: -20,
          chunks: 'initial',
          reuseExistingChunk: true
        }
      }
    }
  },
  // 设置外部依赖，使用 CDN 加载
  externals: {
    vue: 'Vue'
  }
});
