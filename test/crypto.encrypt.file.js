const FStormHttpClient = require('../src/index');
const config = require('./config');
const path = require('path');
const fs = require('fs');

(async function f() {

  const fStormHttpClient = new FStormHttpClient({
    IPFSProvider: config.IPFSProvider,
  });

  fStormHttpClient.setChainAccount({
    privateKey: '0x4099a9cdefc9c23466bb5552e90f07292bc8c367957d389feacb737b8530dad9'
  });

  fStormHttpClient.setChainProvider(config.chainProvider);

  fStormHttpClient.encrypt(path.resolve(__dirname, './1.wmv'))
    .then(filePath => {
      console.log(filePath);// D:\test\1.wmv.enc
    })
    .catch(err => {
      console.log(err);
    });

}());
