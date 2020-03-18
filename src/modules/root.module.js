module.exports = {
  install(target, source) {

    /**---root-------------------*/
    /**
     * ipfs.add
     * */
    target.add = async function* (...args) {
      let files = source.add(...args);
      for await (let file of files) {
        await target.chain.emit({
          type: 'ipfs add',
          data: `ipfs add ${file.cid.toString()}`
        });
        yield file;
      }
    };
    /**
     * ipfs.get
     * */
    target.get = async function* (...args) {
      let files = source.get(...args);
      for await (let file of files) {
        await target.chain.emit({
          type: 'ipfs get',
          data: `ipfs get ${file.path}`
        });
        yield file;
      }
    };

  }
};




