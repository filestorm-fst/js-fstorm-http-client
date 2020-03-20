const FStormHttpClient = require('../src/index');
const config = require('./config');
const path = require('path');
const fs = require('fs');

(async function f() {

  const fStormHttpClient = new FStormHttpClient({
    IPFSProvider: config.IPFSProvider,
    chainProvider: config.chainProvider,
    chainAccount: {
      privateKey: '0xe73fb7deae271d3b7f8a0f5b2040047dc6ee77e38d2c746d09689f3eb1c6b3d5'
    }
  });
  const files = [{
    path: path.resolve(__dirname, './ipfs-add-2.js'),
    // content: 'ABC'
  }];

  let res = fStormHttpClient.add(files, {recursive: true});

  for await (let r of res) {
    console.log(r);
  }


}());
