const merge = require('webpack-merge');
const baseConfig = require('./webpack.config.base');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const UglifyJsPlugin = require('uglifyjs-webpack-plugin');
const OptimizeCssAssetsPlugin = require('optimize-css-assets-webpack-plugin'); 
const webpack = require('webpack');
const MiniCssExtractPlugin = require('mini-css-extract-plugin'); 
const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin;
const CompressionPlugin = require('compression-webpack-plugin');


 const webpackConfig = merge(baseConfig, {
    mode : 'production',
  //  module : { rules : [] },
    optimization: {
        minimizer : [ 
            new UglifyJsPlugin({
                cache: true,
                parallel: true,
                sourceMap: true
            }),
             new OptimizeCssAssetsPlugin({  // 压缩被抽离的css文件
                  assetNameRegExp: /\.optimize\.css$/g,
                  cssProcessor: require('cssnano'),
                  cssProcessorOptions: { safe: true, discardComments: { removeAll: true } },
                  canPrint: true
                }),
        ]
      },
    plugins  : [
         new CleanWebpackPlugin({ // 不需要添加路径
              cleanOnceBeforeBuildPatterns :['**/*', '!dll', '!dll/**'], // 默认 ‘**/*’， ‘!’可排除掉不想删除的文件
         }),
         new MiniCssExtractPlugin({  
              filename: 'css/main.[contenthash].css',
              chunkFilename: '[id].css'
         }),
         new BundleAnalyzerPlugin()
    ],
    devtool : 'source-map', 
});



module.exports = webpackConfig