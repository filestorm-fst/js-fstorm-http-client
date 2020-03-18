const Storm3 = require('storm3');
const Tx = require('ethereumjs-tx');

const path = require('path');
const fs = require('fs');

class LocalCache {
  constructor(key) {
    this.cacheFile = path.resolve(__dirname, './.cache.' + key + '.json');
    if (!fs.existsSync(this.cacheFile)) {
      fs.writeFileSync(this.cacheFile, '{}');
    }
  }

  set(key, value) {
    let cacheJSON = JSON.parse(fs.readFileSync(this.cacheFile).toString());
    cacheJSON[key] = value;
    fs.writeFileSync(this.cacheFile, JSON.stringify(cacheJSON));
  }

  get(key) {
    let cacheJSON = JSON.parse(fs.readFileSync(this.cacheFile).toString());
    return cacheJSON[key];
  }
}

function Chain(...args) {
  let localCache;
  this.storm3 = new Storm3(...args);
  this.account = {
    fromPrivateKey: '',
    fromAddress: '',
    toAddress: ''
  };
  this.sendTransaction = async function (txDataString) {
    return new Promise(async (resolve, reject) => {

      let nonce = await this.storm3.fst.getTransactionCount(this.account.fromAddress);
      let cacheNonce = localCache.get('nonce');
      if (cacheNonce) {
        // nonce 大于等于
        if (Number.parseInt(cacheNonce) >= Number.parseInt(nonce)) {
          cacheNonce++;
          nonce = cacheNonce;
        }
      }

      let privateKey = Buffer.from(this.account.fromPrivateKey, 'hex');
      let rawTx = {
        nonce: nonce,
        gasPrice: this.storm3.utils.toHex(0),
        gasLimit: this.storm3.utils.toHex(4300000),
        gas: this.storm3.utils.toHex(41000),
        to: this.account.toAddress,
        value: 0,
        data: this.storm3.utils.toHex(txDataString)
      };
      let tx = new Tx(rawTx);
      tx.sign(privateKey);
      let serializedTx = tx.serialize();
      let hash = await this.storm3.fst.sendSignedTransaction('0x' + serializedTx.toString('hex'));
      // let hash = '';
      // set nonce to local storage
      localCache.set('nonce', nonce);

      resolve(hash);
    });

  };
  this.register = function (fStormHttpClient) {
    fStormHttpClient.chain = this;
  };
  this.emit = async function (data) {
    await this.sendTransaction(data.data);
  };
  this.setAccount = function (account) {
    account = JSON.parse(JSON.stringify(account));
    if (account.privateKey) {
      if (account.privateKey.substr(0, 2) !== '0x') {
        account.privateKey = '0x' + account.privateKey;
      }
      let keystore = this.storm3.fst.accounts.encrypt(account.privateKey, '');
      this.account.fromAddress = '0x' + keystore.address;
      this.account.toAddress = this.account.fromAddress;
      this.account.fromPrivateKey = account.privateKey.slice(2);
    } else if (account.keystore) {
      account.keystore = typeof account.keystore === 'object' ? account.keystore : JSON.parse(account.keystore);
      let acc = this.storm3.fst.accounts.decrypt(account.keystore, account.password);
      this.account.fromAddress = acc.address.toLocaleLowerCase();
      this.account.toAddress = this.account.fromAddress;
      this.account.fromPrivateKey = acc.privateKey.slice(2);
    }


    try {
      localCache = new LocalCache(this.account.fromAddress);
    } catch (e) {
      console.log(e);
    }
  };
}


module.exports = Chain;
