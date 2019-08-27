# vue-ssr demo

基于 vue hackernews 2.0 ，同时更新为 webpack4 最新版本

## 升级过程中的一些事项

- `ExtractTextPlugin` 替换为 `MiniCssExtractPlugin`，同时 `MiniCssExtractPlugin.loader` 和 `vue-style-loader` 不能放在一起，因为这两个做的事情是互斥的，前者将 css 抽取为单独的 css 文件，后者将 css 内嵌到 html 里。一般是 production 模式用前者，dev 模式用后者

- `DefinePlugin` 的 `process.env.NODE_ENV` 可以去掉了，因为 webpack4 的 mode 可以自动注入环境变量

- webpack 的 sw-precache 插件已过时，替换为 `workbox-webpack-plugin` 

- `CommonChunkPlugin` 替换为 `optimization.splitChunks`, 同时 `chunks` 选项改为 `all` , 这样拆分的更彻底

- server config 的 `nodeExternals` whitelist 选项更新为 `[/\.css$/, /\?vue&type=style/]` (根据文档)

- 将原依赖全部升级到最新。babel 重新需要安装 `@babel/core @babel/preset-env babel-loader`, 需要新安装 `vue-template-compiler`

- 使用 `MiniCssExtractPlugin` 后，client 和 server config 的 css 配置需要分开写，这是个坑。。see [issue](https://github.com/webpack-contrib/mini-css-extract-plugin/issues/90)。 注意 `css-loader/locals` 已经变更为 `onlyLocals` 选项了