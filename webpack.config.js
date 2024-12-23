const path = require('path');
const HtmlWebpackPlugin = require("html-webpack-plugin");
const CopyPlugin = require("copy-webpack-plugin");

module.exports = {
    entry: {
        app: './src/app.js',
    },
    mode: 'development',
    output: {
        filename: '[name].bundle.js',
        path: path.resolve(__dirname, 'dist'),
    },
    devServer: {
        static: {
            directory: path.join(__dirname, 'public'),
        },
        compress: true,
        port: 9000,
    },
    plugins: [
        new HtmlWebpackPlugin({
            filename: "index.html",
            template: "./index.html",
        }),
        new HtmlWebpackPlugin({
            filename: "login.html",
            template: "./login.html",
        }),
        new HtmlWebpackPlugin({
            filename: "signup.html",
            template: "./signup.html",
        }),
        new CopyPlugin({
            patterns: [
                {from: "./src/static/fonts", to: "static/fonts"},
                {from: "./src/static/images", to: "static/images"},
                {from: "./src/templates", to: "templates"},
                {from: "./src/styles", to: "css"},
                {from: "./node_modules/admin-lte/plugins/overlayScrollbars/css/OverlayScrollbars.min.css", to: "css"},
                {from: "./node_modules/admin-lte/dist/css/adminlte.min.css", to: "css"},
                {from: "./node_modules/admin-lte/plugins/jquery/jquery.min.js", to: "js"},
                {from: "./node_modules/admin-lte/plugins/bootstrap/js/bootstrap.bundle.min.js", to: "js"},
                {from: "./node_modules/admin-lte/plugins/chart.js/Chart.min.js", to: "js"},
                {from: "./node_modules/admin-lte/plugins/overlayScrollbars/js/jquery.overlayScrollbars.min.js", to: "js"},
                {from: "./node_modules/admin-lte/dist/js/adminlte.min.js", to: "js"},
            ]
        }),
    ]
};