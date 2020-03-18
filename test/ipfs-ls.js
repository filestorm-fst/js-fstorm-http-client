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

  let files = await fStormHttpClient.ls('QmNWM9kwgnsskedBMNm7U2T9MXg2Cd4KkwRhMJNuD5UFXt');


  const cid = 'QmWXdjNC362aPDtwHPUE9o2VMqPeNeCQuTBTv1NsKtwypg';

  for await (const file of fStormHttpClient.ls(cid)) {
    console.log(file.path);
  }

}());
