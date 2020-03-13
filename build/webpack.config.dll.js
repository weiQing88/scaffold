const webpack = require('webpack');
const library = '[name]_dll';
const path = require('path');
const ROOTPATH = process.cwd();

module.exports = {
     entry : {
          react :  [ 'react', 'react-dom' ]
     },
        mode : 'production',
        
     output : {
          filename : '[name].dll.js', // '[name].dll.[hash:6].js',
          path : path.resolve(ROOTPATH, 'dist', 'dll' ),
          library,
     },
   plugins : [
        new webpack.DllPlugin({
               name : library,  //name和library一致
               path : path.resolve( ROOTPATH, 'dist', 'dll', 'manifest.json' )
        })
   ]


}


