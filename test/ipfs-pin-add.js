const FStormHttpClient = require('../src/index');
const config = require('./config');
const path = require('path');
const fs = require('fs');

const IPFSHttpClient = require('ipfs-http-client');

(async function f() {


  const fStormHttpClient = new FStormHttpClient({
    IPFSProvider: config.IPFSProvider,
    chainProvider: config.chainProvider,
    /*
        chainAccount: {
          keystore: {
            version: 3,
            id: '4babb107-dd9e-4025-969f-7e0965846736',
            address: 'e11ed3915fab957f2ea2b1395318eae9fb6ed18b',
            crypto: {
              ciphertext: '2d814453d7a398693d84691cc2252fb861af9076da1769072576b6ea04c85a5f',
              cipherparams: {iv: '44396c94ce183fc5830ec649f77474c7'},
              cipher: 'aes-128-ctr',
              kdf: 'scrypt',
              kdfparams: {
                dklen: 32,
                salt: 'c4666c1c6695f2c8001081e5dc3a659427bc5aedb28d27f11a284cf95e7fa3bd',
                n: 8192,
                r: 8,
                p: 1
              },
              mac: 'f8e4c198f185ef31d1579a6f4020541da60943d0fd1b3b24232b7f723b599692'
            }
          },
          password: '',
        },*/
    chainAccount: {
      privateKey: '4099a9cdefc9c23466bb5552e90f07292bc8c367957d389feacb737b8530dad9'
    },

  });


    let CID = await fStormHttpClient.pin.add([
      'QmQ2r6iMNpky5f1m4cnm3Yqw8VSvjuKpTcK1X7dBR1LkJF'
    ]);
    CID.forEach(item => {
      console.log(item.cid.toString());
    });

}());
