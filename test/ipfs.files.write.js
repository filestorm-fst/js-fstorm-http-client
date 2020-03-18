const FStormHttpClient = require('../src/index');
const config = require('./config');
const path = require('path');
const fs = require('fs');


(async function f() {


  const fStormHttpClient = new FStormHttpClient({
    IPFSProvider: config.IPFSProvider,
    chainProvider: config.chainProvider,
    chainAccount: {
      privateKey: '4099a9cdefc9c23466bb5552e90f07292bc8c367957d389feacb737b8530dad9'
    },

  });


  console.log(await fStormHttpClient.files.write('/dir-001/002.txt', '0024', {create: true}));

}());
