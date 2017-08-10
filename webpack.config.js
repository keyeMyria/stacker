const path = require('path')
const webpack = require('webpack');

module.exports = {
	entry: './src/index.tsx',
	devtool: 'inline-source-map',
	devServer: {
		contentBase: './dist',
		hot: true
	},
	plugins: [
		new webpack.HotModuleReplacementPlugin()
	],
	module: {
		rules: [{
			test: /\.tsx?$/,
			use: 'ts-loader',
			exclude: /node_modules/
		}, {
			test: /\.css$/,
			use: [
				'style-loader',
				'css-loader'
			]
		}, {
			test: /\.(woff|woff2|eot|ttf|otf)$/,
			use: [
				'file-loader'
			]
		}]
	},
	resolve: {
		extensions: [".tsx", ".ts", ".js"]
	},
	output: {
	 	filename: 'bundle.js',
	 	path: path.resolve(__dirname, 'dist')
	}
}