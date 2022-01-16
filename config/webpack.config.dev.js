const path = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
  entry: {
    /**
     * 会将相同的模块打包到各自的 chunk 中
     */
    index: './src/index.js',  // 入口文件 .js
    another: './src/another.js'

    /**
     * 利用 dependOn: 'name' 属性，会将相同的文件抽离出来，生成一个公共的 js 文件  [name].bundle.js
     * 主页面 app.html 中会多引入一个 [name].bundle.js
     */
    // index: {
    //   import: './src/index.js',
    //   dependOn: 'common'
    // },
    // another: {
    //   import: './src/another.js',
    //   dependOn: 'common'
    // },
    // common: './src/common.js'
  },
  output: {
    // publicPath: "http://localhost:8080", // 开发环境 publicPath 无需设置
    path: path.resolve(__dirname, '../dist'),
    filename: "scripts/[name].[contenthash].js", // 浏览器具有缓存，所以每次打包使用不同的文件用来清除缓存
    clean: true // 每次打包都删除之前的 dist 文件
  },
  mode: "development", // 编译模式
  devtool: 'inline-source-map', //H 可以看到错误的源文件
  plugins: [
    new HtmlWebpackPlugin({   // 通过 html-webpack-plugin 每次打包自动生成 html
      template: "./src/index.html",
      filename: "app.html", // 打包的 html 文件名
      // port:63342,
      inject: 'body' // script 放到 body 中
    })
  ],
  devServer: { // live reloading(实时重新加载)
    static: './dist'
  },
  module: {
    rules: [
      // assets 资源模块 asset/resource asset/inline asset/source asset
      {
        test: /\.png/,
        // type: 'asset/resource', // 在文件中能找到,自动打包出来是一个 hash 名，链接是原本 src 中的链接
        type: 'asset', // 在文件中能找到,自动打包出来是一个 hash 名，链接是原本 src 中的链接
        generator: { // generator 的优先级 》 output 中的 assetModuleFilename
          // filename: 'images/[contenthash][ext]'  使用hash
          filename: 'images/[name][ext]'  // 使用自己起的图片名
        }
      }, {
        test: /\.jpg/,
        type: "asset/inline" // 打包出来图片的地址是 base64,并且在打包出来的文件中找不到
      }, {
        test: /\.txt/, // 打包文本类型
        type: 'asset/source'
      },
      {
        test: /\.jpg/, // 打包文本类型
        // 自动在 asset/resource 和 asset/inline 之间做出选择
        type: 'asset',
        parser: {
          dataUrlCondition: {
            maxSize: 8 * 1024 // 图片 > 8M, 使用 asset/resource， 否则使用 asset/inline
          }
        }
      }
    ]
  },
  optimization: {
    /**
     * 利用webpack 自带的一个插件 split-chunks-plugin,将公共代码抽离
     * --- 没有生效 ---
     */
    splitChunks: {
      cacheGroups: {
        vendor: {
          test: /[\\/]node_modules[\\/]/,
          name: 'vendors',
          chunks: 'all',
        }
      }
    }
  }
}