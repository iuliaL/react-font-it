const path = require('path');
const webpack = require('webpack');
const DashboardPlugin = require('webpack-dashboard/plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');

const PATHS = {
	root: path.resolve(__dirname, '.'),
	nodeModules: path.resolve(__dirname, './node_modules'),
	src: path.resolve(__dirname, './src'),
	dist: path.resolve(__dirname, './dist'),
};

const DEV_SERVER = {
	watchOptions: {
		ignored: /node_modules/
	},
	historyApiFallback: true,
	overlay: true
};

module.exports = (env = {}) => {
	console.log({ env });
	const isBuild = !!env.build;
	const isDev = !env.build;
	const isSourceMap = !!env.sourceMap || isDev;

	return {
		cache: true,
		devtool: isDev ? 'eval-source-map' : 'source-map',
		devServer: DEV_SERVER,

		context: PATHS.root,

		entry: {
			"react-font-it": PATHS.src + '/index.tsx',
		},
		output: {
			path: PATHS.dist,
			filename: '[name].js',
			publicPath: '/',
			library: "reactFontIt",
			libraryTarget: "umd"
		},

		resolve: {
			alias: {
				'@src': PATHS.src,
			},
			extensions: ['.ts', '.tsx', '.js', '.jsx', '.json'],
			modules: [PATHS.src, 'node_modules'],
		},

		module: {
			rules: [
				// tslint
				{
					test: /\.tsx?$/,
					include: PATHS.src,
					enforce: 'pre',
					loader: 'tslint-loader',
					options: {
						emitErrors: true,
						typeCheck: true
					}
				},

				// typescript
				{
					test: /\.tsx?$/,
					include: PATHS.src,
					use: [
						{
							loader: 'ts-loader',
							options: {
								compilerOptions: {
									sourceMap: isSourceMap,
								},
							}
						}
					]
				},

			],
		},

		plugins: [
			new webpack.DefinePlugin({
				// This is to disable webpack-dashboard analytics when building for prod.
				'process.env': {
					NODE_ENV: JSON.stringify(isDev ? 'development' : 'production'),
				},
			}),
			// Generate index.html
			new HtmlWebpackPlugin({
				title: "MIIMETIQ UI lib",
			}),
			...(isDev ? [
				new DashboardPlugin(),
				new webpack.NamedModulesPlugin(),
			] : []),
			...(isBuild ? [
				new webpack.LoaderOptionsPlugin({
					minimize: true,
					debug: false
				}),
				new webpack.optimize.UglifyJsPlugin({
					cache: true,
					parallel: true,
					beautify: false,
					compress: {
						screw_ie8: true
					},
					comments: false,
					sourceMap: isSourceMap,
				}),
			] : []),
		]
	};
};

