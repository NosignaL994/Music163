const CracoLessPlugin = require("craco-less")
const path = require('path')
const resolve = dir => path.join(__dirname, dir)

module.exports = {
    webpack: {
        alias: {
            "@": resolve('src')
        }
    },
    babel: {
        plugins: [
            ["import", {libraryName: "antd", style: true}],
        ]
    },
    plugins: [
        {
            plugin: CracoLessPlugin,
            options: {
                lessLoaderOptions: {
                    lessOptions: {
                        javascriptEnabled: true
                    }
                }
            }
        }
    ]
}