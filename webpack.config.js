
let webpack = require('Webpack');
module.exports = {
    devtool: 'eval-source-map',
    entry: __dirname + "/client/app.jsx",
    output: {
        path: __dirname + "/build",
        filename: "bundle.js"
    },
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
