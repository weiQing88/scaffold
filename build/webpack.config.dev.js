const merge = require('webpack-merge');
const webpack = require('webpack');
const apiMocker = require('mocker-api');
const baseConfig = require('./webpack.config.base');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const path = require('path');
const ROOTPATH = process.cwd();
const entrypoint = process.env.ENTRYPOINT || 'js';


/**
 *  开发环境配置项目
 */
module.exports = merge(baseConfig, {
    mode : 'development',
    optimization: {
        minimize: false,
    },
    plugins  : [
        new webpack.HotModuleReplacementPlugin(), 
   ],
    devtool : 'cheep-module-eval-source-map',
    devServer : {
        port : 3001,
        quiet : false,
        inline : true, 
        stats : 'errors-only',
        overlay : false,
        clientLogLevel : 'silent',
        compress : true,
        hot : true,
        historyApiFallback : true,
        contentBase : entrypoint == 'mobile' ? 'mDist/' : 'dist/',  // 执行环境指向 dist 目录
        before(app){
            apiMocker(app, path.resolve( ROOTPATH, 'mock/index.js' ))
        }
    },
});