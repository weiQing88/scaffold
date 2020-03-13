
const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin'); 
const isDev = process.env.NODE_ENV === 'development';
const config = require('./config')[ isDev ? 'dev' : 'build' ];
const Happypack = require('happypack');
const webpack = require('webpack');
const AutoDllPlugin = require('autodll-webpack-plugin'); 
const HardSourceWebpackPlugin = require('hard-source-webpack-plugin'); 
const CopyWebpackPlugin = require('copy-webpack-plugin'); 
const Dotenv = require('dotenv-webpack'); 




const ROOTPATH = process.cwd();

module.exports = {
      entry : {
           index  : path.resolve( ROOTPATH, 'src/main.js' ),
         // index  : path.resolve( ROOTPATH, 'src/main.tsx' ),
      },
      output : {
           filename : '[name].[hash:6].js',
           path : path.resolve( ROOTPATH, 'dist'),
           chunkFilename: '[name].[hash:6].chunk.js', 
           publicPath: '/'   
      },
      module : {
         noParse: /jquery|lodash/,
         rules : [
                     {  
                         test: /\.(ts|tsx)?$/,
                         loader : 'awesome-typescript-loader',
                            options : {
                               configFileName : path.resolve( ROOTPATH, 'build/tsconfig.json') 
                          }, 
                          include : path.resolve( ROOTPATH, 'src/' ),
                          exclude : /node_modules/   
                },
               {
                  test: /\.(js|jsx)$/,
                  use : 'happypack/loader?id=babel',
                  include : path.resolve( ROOTPATH, 'src/' ),
                  exclude : /node_modules/
              },
              {
                  test : /\.(less|css)$/,
                  use : 'happypack/loader?id=css',
                  include : [
                       path.resolve( ROOTPATH, 'src/' ),
                       path.resolve( ROOTPATH, 'node_modules', 'antd' ), // 允许解析 antd 样式文件
                  ]
                   // exclude : /node_modules/
               },
               {
                    test: /\.(woff2?|eot|ttf|otf)(\?.*)?$/,
                    loader: 'url-loader',
                    options: {
                      limit: 10000,
                      name: 'assets/fonts/[name].[hash:7].[ext]',
                      outputPath : 'assets'
                    }
                  },
                 {
                    test: /\.(mp4|webm|ogg|mp3|wav|flac|aac)(\?.*)?$/,
                    loader: 'url-loader',
                    options: {
                      limit: 10000,
                      name: 'media/[name].[hash:6].[ext]',
                      outputPath : 'assets'
                    }
                  },
              {
                 test : /\.(png|jpg|gif|jpeg|webp|svg)$/,
                 use : [
                     {
                       loader : 'url-loader',
                       options : {
                            limit : 10240, // 10K
                            esModule : false, 
                            name : '[name]_[hash:6].[ext]',
                            outputPath : 'assets'
                       }
                     }
                 ]
              }
         ]
      },
      
   
      optimization : {
           moduleIds: "hashed", // 混淆文件路径名
          namedModules : true,
          namedChunks : true, 
          splitChunks : { 
               cacheGroups: {
                    vendor: {
                        priority: 1,
                        name: 'vendor',
                        test: /node_modules/,
                        chunks: 'initial',
                        minSize: 100,
                        minChunks: 1 
                    }
                }
          },
          runtimeChunk: {
               name: 'mainifest'
           },
      },
      plugins : [
          new webpack.HashedModuleIdsPlugin(), 
          new HtmlWebpackPlugin({
                template : path.resolve( ROOTPATH, 'public/index.html' ),
                title : config.template.title,
                config : config.template
          }),

         new Happypack({
               id : 'babel',
               use : [ 
                        {
                         loader : 'babel-loader',
                         options : {
                              presets : [
                                   [ '@babel/preset-env', { 'targets': '> 0.25%, not dead' } ],
                                    '@babel/preset-react',
                                    // '@babel/preset-typescript' 需要ESLint检测类型。
                                   ],
                              plugins : [
                                   isDev && 'react-hot-loader/babel',
                                   [
                                      '@babel/plugin-transform-runtime',
                                      {
                                          'corejs' : 3
                                      }
                                   ],

                                   ["@babel/plugin-proposal-optional-chaining", { "loose" : true }], 
                                   ["@babel/plugin-proposal-decorators", { "legacy": true }], // decorator
                                   ["@babel/plugin-proposal-class-properties", { "loose" : true }],
                                   '@babel/plugin-syntax-dynamic-import', 
                                   // '@babel/plugin-transform-modules-commonjs',
                                   [ 'import',  { libraryName: 'antd', libraryDirectory: 'es', style: 'css' }  ] , 
                              ]
                         }
                      }
               ]
         }),
         new Happypack({
               id : 'css',
               use :  [ 
                    isDev ? 'style-loader' : MiniCssExtractPlugin.loader,  
                    {
                      loader: 'css-loader',
                       options: {
                            modules: false, 
                         }   
                    },
                   {
                   loader : 'postcss-loader',
                   options : {
                        config : {
                              path : path.resolve( ROOTPATH, 'build/postcss.config.js' ), 
                        }
                     }
                   },
                   'less-loader', 
               ]
         }),

         new HardSourceWebpackPlugin(),
         new webpack.IgnorePlugin(/\.\/locale/, /moment/), 
         new Dotenv({
                 path: path.resolve( ROOTPATH, 'build/.env')
        }),
         
         
      ],
      resolve : {
          extensions : ['.js', '.jsx', '.json', '.css', '.less', '.ts'],
          modules : ['node_modules'],
           alias : {
                 '@' : path.resolve( ROOTPATH, 'src')
           }
      },
    externals: {},  // demo : 'jquery': 'jQuery'
    node: {
     module: 'empty',
     dgram: 'empty',
     dns: 'mock',
     fs: 'empty',
     http2: 'empty',
     net: 'empty',
     tls: 'empty',
     child_process: 'empty',
   },
  
   //关闭性能处理
   // performance: false,
     
}