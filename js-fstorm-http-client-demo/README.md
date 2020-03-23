## js-fstorm-http-client 使用例子

#### 使用方式

- 下载本目录所有文件
    + 运行 `npm install`
    + 复制 `env.example.js` 为 `env.js`
    + 更改 `fstorm-http-client.js` 配置，按照 js-fstorm-http-client 使用方式提供一个实例
    ```javascript
        const FStormHttpClient = require('js-fstorm-http-client');
        const fStormHttpClient = new FStormHttpClient({
          ...
        });
        module.exports = fStormHttpClient;
    ```
  + 运行 `node app.js`

- 浏览器打开 `http://127.0.0.1:8008` 即可完成测试

