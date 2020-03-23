const FStormHttpClient = require('js-fstorm-http-client');

const fStormHttpClient = new FStormHttpClient({
  IPFSProvider: '',
  chainProvider: '',
  chainAccount: {
    privateKey: ''
  }
});

module.exports = fStormHttpClient;
