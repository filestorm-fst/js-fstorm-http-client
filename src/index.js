const IPFSHttpClient = require('ipfs-http-client');
const {v4: uuidv4} = require('uuid');
const Chain = require('./storm3/chain');
const crypto = require('./utils/crypto.util');
const fs = require('fs');
const path = require('path');
const readline = require('readline');

const rootModule = require('./modules/root.module');
const pinModule = require('./modules/pin.module');
const filesModule = require('./modules/files.module');

const modules = [
  rootModule,
  pinModule,
  filesModule
];

function FStormHttpClient(options) {
  let source = IPFSHttpClient(options.IPFSProvider);
  // 合并 IPFSHttpClient 的方法
  Object.assign(this, source);

  // 模块覆盖
  modules.forEach(m => {
    m.install(this, source);
  });

  Object.keys(IPFSHttpClient).forEach(key => {
    this[key] = IPFSHttpClient[key];
  });

  this.chain = new Chain();

  this.setChainProvider(options.chainProvider);
  this.setChainAccount(options.chainAccount);

}

/**
 * @description 设置链
 * @param chainProvider { * } 符合实例话 storm3 的数据
 * @return this
 * */
FStormHttpClient.prototype.setChainProvider = function (chainProvider) {
  if (!chainProvider) {
    return;
  }
  this.chain.setChainProvider(chainProvider);
  return this;
};
/**
 * @description 设置链账号
 * @param chainAccount { Object }
 * @return this
 * */
FStormHttpClient.prototype.setChainAccount = function (chainAccount) {
  if (!chainAccount) {
    return;
  }
  this.chain.setAccount(chainAccount);
  return this;
};
/**
 * @description 加密
 * @param filePath {String} 需要加密的文件路径
 * @param password {String}
 * @return Promise
 * */
FStormHttpClient.prototype.encrypt = function (filePath, password = null) {
  return new Promise((resolve, reject) => {
    !password && (password = this.chain.account.fromPrivateKey);
    if (!password) {
      reject(new Error('No chain account provided'));
    }
    fs.stat(filePath, (err, stats) => {
      if (err) {
        return reject(err);
      }
      // 检测文件是否是文件
      if (!stats.isFile()) {
        return reject(new Error('Invalid file. stats: ' + filePath));
      }
      // 检测文件大小
      if (stats.size / 1024 / 1024 > 250) {
        return reject(new Error('File support up to 250MB. stats: ' + filePath));
      }

      let readStream = fs.createReadStream(filePath, {highWaterMark: stats.size});
      let readStreamFileInfo = path.parse(filePath);
      let writeStreamFilePath = path.resolve(path.dirname(filePath), './' + readStreamFileInfo.base + '.enc');
      let writeStream = fs.createWriteStream(writeStreamFilePath);

      readStream.on('data', (buffer) => {
        buffer = buffer.toString('hex');
        buffer = crypto.encrypt(password, buffer);
        writeStream.write(buffer + '\r\n');
      });
      readStream.on('close', () => {
        writeStream.write('-*End-*' + crypto.encrypt('', JSON.stringify(
          {
            ext: readStreamFileInfo.ext,
            v: 1
          }
        )), () => {
          writeStream.close();
          resolve(writeStreamFilePath);
        });

      });
    });

  });
};
/**
 * @description 解密文件
 * @param filePath 需要解密的文件路径
 * @param password {String}
 * @return Promise
 * */
FStormHttpClient.prototype.decrypt = function (filePath, password = null) {
  return new Promise((resolve, reject) => {
    !password && (password = this.chain.account.fromPrivateKey);
    if (!password) {
      reject(new Error('No chain account provided'));
    }
    fs.stat(filePath, (err, stats) => {
      if (err) {
        return reject(err);
      }
      // 检测文件是否是文件
      if (!stats.isFile()) {
        return reject(new Error('Invalid file. stats: ' + filePath));
      }
      let readStream = fs.createReadStream(filePath);
      let readLine = readline.createInterface({
        input: readStream
      });

      let readStreamFileInfo = path.parse(filePath);
      let writeStreamFilePath = path.resolve(path.dirname(filePath), './' + uuidv4() + '.dec');
      let writeStream = fs.createWriteStream(writeStreamFilePath);
      let encryptInfo = '';
      // 逐行读取
      readLine.on('line', line => {
        if (line === '') return;

        if (/^-\*End-\*/.test(line)) {
          encryptInfo = JSON.parse(crypto.decrypt('', line.replace(/-\*End-\*/, '')));
        } else {
          // body
          line = crypto.decrypt(password, line.toString());
          line = Buffer.from(line, 'hex');
          writeStream.write(line);
        }

      });
      readLine.on('close', () => {

        setTimeout(() => {
          let newPath = path.resolve(path.dirname(writeStreamFilePath), './' + readStreamFileInfo.name + encryptInfo.ext);
          fs.renameSync(writeStreamFilePath, newPath);
          resolve(newPath);
        }, 80);
      });

    });
  });


};

module.exports = FStormHttpClient;
