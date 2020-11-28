const path = require('path');
const HtmlWebpackPlugin =  require('html-webpack-plugin');

module.exports = {
    // define entry file and output
    entry: './src/index.js',
    output: {
        path: path.resolve(__dirname , 'dist'),
        filename: 'main.js'
    },
    // define babel loader
    module: {
        rules: [
            {test: /\.jsx?$/, loader: 'babel-loader', exclude: /node_modules/},
            {test : /\.(js)$/, use: 'babel-loader'},
			{test : /\.css$/, use: ['style-loader', 'css-loader']},
			{
				test: /\.scss$/,
				use: ['style-loader', 'css-loader', 'sass-loader']
			 }
        ]
    },
    mode:'development',
    plugins : [
        new HtmlWebpackPlugin ({
            template : 'src/index.html'
        })
	],
	resolve: {
		extensions: ['.js', '.jsx', '.scss']
	}
};