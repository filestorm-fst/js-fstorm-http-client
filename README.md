
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
  - options.chainProvider - any 可选 链服务端配置，可动态设置，支持 storm3 的设置方式
  - chainAccount - object 可选 发送到链交易的地址信息，可动态设置
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

##### 动态设置链
```javascript
  fStorm.setChainProvider(chainProvider);
```
##### 动态设置链交易的账号
```javascript
  fStorm.setChainAccount({
    keystore: {},
    password: ''
  });
  // 或者
  fStorm.setChainAccount({
    privateKey: ''
  });
```

#### API

##### Files

+ Regular Files API
  - fStorm.add(data, [options])
  - fStorm.get(ipfsPath, [options])

##### Graph

+ pin
  - fStorm.pin.add(hash, [options])
  - fStorm.pin.rm(hash, [options])

##### 加密

+ fStorm.encrypt(filePath, [password])
    - 说明：对文件进行加密
    - 参数
        + filePath - string 本地文件路径
        + password - string 密码，默认使用私钥
    - 返回值
        + Promise
            - resolve => encryptFilePath - string 加密后文件存放的路径
            - reject => error - object 错误对象


+ fStorm.decrypt(filePath, [password])
    - 说明：对文件进行解密
    - 参数
        + filePath - string 本地文件路径
        + password - string 密码，默认使用私钥
    - 返回值
        + Promise
            - resolve => encryptFilePath - string 解密后文件存放的路径
            - reject => error - object 错误对象

###### 例子

Regular Files API

- fStorm.add
```javascript
  const fs = require('fs');
  let files = await fStorm.add(fs.readFileSync(filePath));
  for await (let res of files) {
    console.log(res);
  }
```
- fStorm.get
```javascript
  let files = fStorm.get('QmNWM9kwgnsskedBMNm7U2T9MXg2Cd4KkwRhMJNuD5UFXt');;
  for await (let res of files) {
    console.log(res);
  }
```

Graph
- fStorm.pin.add
```javascript
  let cids = await fStorm.pin.add([
   'QmQ2r6iMNpky5f1m4cnm3Yqw8VSvjuKpTcK1X7dBR1LkJF'
  ]);
  cids.forEach(item => {
    console.log(item.cid.toString());
  });
```
- fStorm.pin.rm
```javascript
  let cids = await fStorm.pin.rm([
   'QmQ2r6iMNpky5f1m4cnm3Yqw8VSvjuKpTcK1X7dBR1LkJF'
  ]);
  cids.forEach(item => {
    console.log(item.cid.toString());
  });
```
加密文件
- fStorm.encrypt
```javascript
  fStorm.encrypt('D:\\test\\1.wmv')
    .then(filePath => {
      console.log(filePath); // D:\test\1.wmv.enc
    })
    .catch(err => {
      console.log(err);
    });
```
- fStorm.decrypt
```javascript
  fStorm.decrypt('D:\\test\\1.wmv.enc')
    .then(filePath => {
      console.log(filePath); // D:\\test\\1.wmv
    })
    .catch(err => {
      console.log(err);
    });
```
