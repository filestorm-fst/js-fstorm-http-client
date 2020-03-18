
# js-fstorm-http-client

This is an alpha version

#### 安装
> npm install js-fstorm-http-client
#### 使用
> const FStormHttpClient = require('js-fstorm-http-client');
###### 实例化一个新的 FStormHttpClient 对象
> const fStormHttpClient = new FStormHttpClient(options);

###### 参数
+ options 必选
  - options.IPFSProvider - any 必选 IPFS服务端配置，支持 ipfs-http-client 的设置方式
  - options.chainProvider - any 必选 链服务端配置，支持 storm3 的设置方式
  - chainAccount - object 必选 发送到链交易的地址信息
      * chainAccount.privateKey - string 可选 地址私钥（如果提供 privateKey 则无需提供 keystore 和 密码）
      * chainAccount.keystore - object | string 可选 keystore（如果未提供 privateKey，则必须提供 keystore 和 密码）
      * chainAccount.password - string 可选 密码

###### 例子
```javascript
 const fStorm = new FStormHttpClient({
    IPFSProvider:  'http://localhost:5001',
    chainProvider:  'http://localhost:8645',
    chainAccount: {
      privateKey: ''
    },
  });
```
###### 或者使用 keystore + 密码的方式
```javascript
 const fStorm = new FStormHttpClient({
   IPFSProvider: config.IPFSProvider,
   chainProvider: config.chainProvider,
   chainAccount: {
     keystore: {},
     password: ''
   }
});
```
#### API

##### Files

- Regular Files API
  - ipfs.add(data, [options])
  - ipfs.get(ipfsPath, [options])

##### Graph

- pin
  - ipfs.pin.add(hash, [options])
  - ipfs.pin.ls([hash], [options])
  - ipfs.pin.rm(hash, [options])

