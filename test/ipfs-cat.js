const FStormHttpClient = require('../src/index');
const config = require('./config');
const path = require('path');
const fs = require('fs');
const FileType = require('file-type');

(async function f() {
  const fStormHttpClient = new FStormHttpClient({
    IPFSProvider: config.IPFSProvider,
    chainProvider: config.chainProvider,
    chainAccount: {
      privateKey: '4099a9cdefc9c23466bb5552e90f07292bc8c367957d389feacb737b8530dad9'
    },
  });

  let files = await fStormHttpClient.cat('QmSNa6MU4L4FsvRFKc1Ch5mecCxSfuEdrkxWCnvSSYMzZz');
  let bufferArray = [];
  for await (let res of files) {
    bufferArray.push(res);
  }
  // 合并 buffer
  let buffer = Buffer.concat(bufferArray);
  // 获取
  let fileType = await FileType.fromBuffer(buffer);
  // 后缀
  let ext = fileType.ext;
  // mime
  let mimeType = fileType.mime;
  console.log(mimeType);
  // 保存文件
  fs.writeFileSync(path.resolve(__dirname, './save-file.' + ext), buffer);

}());
