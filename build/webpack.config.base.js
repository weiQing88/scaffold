
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
const entrypoint = process.env.ENTRYPOINT || 'js';
const etPoints = config.etPoints;



const ROOTPATH = process.cwd();

module.exports = {
      entry : path.resolve( ROOTPATH, etPoints[ entrypoint ].path ),
      output : {
           filename : '[name].[hash:6].js',
           path : path.resolve( ROOTPATH, etPoints[ entrypoint ].output ),
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
                 // test: /\.(js|jsx|ts|tsx)$/, // 配置 typescript
                  test: /\.(js|jsx)$/, // 配置 typescript
                  use : 'happypack/loader?id=babel',
                  include : path.resolve( ROOTPATH, 'src/' ),
                  exclude : /node_modules/
              },
              {
                 // test : /\.(less|css)$/, 
                  test : /\.(scss|css)$/, 
                  use : 'happypack/loader?id=css',
                  include : [
                       path.resolve( ROOTPATH, 'src/' ),
                       path.resolve( ROOTPATH, 'node_modules', 'antd' ), // 允许解析 antd 样式文件
                  ],
                   exclude : entrypoint === 'mobile' ? /node_modules/ : /xx/ //  ‘/xx/’ => 随便赋值一个不存在的文路径 
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
           moduleIds: "hashed", 
          namedModules : true, 
          namedChunks : true, 
          splitChunks : { 
               cacheGroups: {
                    vendor: {
                        //第三方依赖
                        priority: 1,
                        name: 'vendor',
                        test: /node_modules/,
                        chunks: 'initial',
                        minSize: 100,
                        minChunks: 1 //重复引入了几次
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
                template : etPoints[ entrypoint ].template,
                title : config.template.title,
                config : config.template
          }),

         new Happypack({
               id : 'babel',
               use : [ //必须是数组
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
                                   [ 'import',  { libraryName: 'antd', libraryDirectory: 'es', style: 'css' }  ] , // 处理 antd ui
                              ]
                         }
                      }
               ]
         }),
         new Happypack({
               id : 'css',
               use :  [ 
                    isDev ? 'style-loader' : MiniCssExtractPlugin.loader,  // ** CSS 1 **
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
                              path : path.resolve( ROOTPATH, 'build/postcss.config.js' ), // 手动指定文件位置
                        }
                     }
                   },
                   'sass-loader', // 'less-loader', // 如果是sass, 这里改成 sass-loader 即可
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
                 '@' : path.resolve( ROOTPATH, 'src'),
                 '@assets' : path.resolve( ROOTPATH, 'assets'),
           }
      },
    externals: {}, 
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
   // performance: false,
     
}