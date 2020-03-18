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
  // 001 文本(在线输出)
  /*
  let files = await fStormHttpClient.get('QmfDmsHTywy6L9Ne5RXsj5YumDedfBLMvCvmaxjBoe6w4d');
  for await (let res of files) {
    console.log((await res.content.next()).value.toString());
  }
  */

  let files = fStormHttpClient.get('QmNWM9kwgnsskedBMNm7U2T9MXg2Cd4KkwRhMJNuD5UFXt');

  for await (const file of files) {
    let bufferArray = [];
    for await (const chunk of file.content) {
      bufferArray.push(chunk._bufs[0]);
    }

    // 合并 buffer
    let buffer = Buffer.concat(bufferArray);
    console.log(buffer);
    // 获取
    let fileType = await FileType.fromBuffer(buffer);
    // 后缀
    let ext = fileType.ext;
    // mime
    let mimeType = fileType.mime;
    console.log(mimeType);
    // 保存文件
    fs.writeFileSync(path.resolve(__dirname, './save-file.' + ext), buffer);

  }


}());
