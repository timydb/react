
let webpack = require('Webpack');
module.exports = {
    devtool: 'eval-source-map',
    entry: {
        main: __dirname + "/client/app.jsx",
        vendor:['react','react-dom','react-router-dom']
    },
    output: {
        path: __dirname + "/build",
        filename: "bundle.js"
    },
    plugins: [
        new webpack.optimize.CommonsChunkPlugin({
            name: 'vendor', 
            filename: 'vendor.js',
        }),
        new webpack.optimize.UglifyJsPlugin({
            output: {
                comments: false,
            },
            compress: {
                warnings: false
            }
        })
    ],
    module: {
        //loaders加载器
        loaders: [
            {
                test: /\.js[x]?$/,
                exclude: /node_modules/,
                loader: 'babel-loader',
                query: {
                    presets: ['react', 'es2015'],
                    plugins: ['react-html-attrs'],//添加组件的插件配置
                }
            },
            //下面是添加csss的loader，即css模块化的配置方法
            {
                test: /\.css$/,
                loader: 'style-loader!css-loader?modules&importLoaders=1&localIdentName=[name]_[local]_[hash:base64:5]'
            }
        ]
    }
};
