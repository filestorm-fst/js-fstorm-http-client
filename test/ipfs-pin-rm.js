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
  let CID = await fStormHttpClient.pin.rm('QmQ3n3V25bnMZ2wT1eKuHXf1TER5hpRjzSjW2Q8kARfHM6');
  CID.forEach(item => {
    console.log(item.cid.toString());
  });


}());
