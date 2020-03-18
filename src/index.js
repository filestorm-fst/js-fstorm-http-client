const IPFSHttpClient = require('ipfs-http-client');

const Chain = require('./storm3/chain');

const rootModule = require('./modules/root.module');
const pinModule = require('./modules/pin.module');
const filesModule = require('./modules/files.module');

const modules = [
  rootModule,
  pinModule,
  filesModule
];

function FStormHttpClient(options) {
  let source = IPFSHttpClient(options.IPFSProvider);
  Object.assign(this, source);

  // install
  modules.forEach(m => {
    m.install(this, source);
  });

  Object.keys(IPFSHttpClient).forEach(key => {
    this[key] = IPFSHttpClient[key];
  });

  let chain = new Chain(options.chainProvider);
  chain.register(this);
  chain.setAccount(options.chainAccount);
}


module.exports = FStormHttpClient;
