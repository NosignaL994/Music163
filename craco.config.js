const CracoAntDesignPlugin = require("craco-antd")
const { getThemeVariables } = require('antd/dist/theme');
const path = require('path')
const resolve = dir => path.join(__dirname, dir)

module.exports = {
    webpack: {
        alias: {
            "@": resolve('src')
        }
    },
    plugins: [
        {
            plugin: CracoAntDesignPlugin,
            options: {
                lessLoaderOptions: {
                    lessOptions: {
                        modifyVars: getThemeVariables({
                            compact: true, // 开启紧凑模式
                        }),
                        javascriptEnabled: true
                    }
                },
                babelBubbleImportPlugin: {
                    libraryName: 'antd',
                    libraryDirectory: 'es',
                    style: true
                }
            }
        }
    ]
}