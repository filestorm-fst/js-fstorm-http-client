module.exports = {
  install(target, source) {

    /**---pin-------------------*/
    let sourcePin = source.pin;
    target.pin = {};
    Object.assign(target.pin, sourcePin);
    /**
     * ipfs.pin.add
     * */
    target.pin.add = async function (...args) {
      let cid = await source.pin.add(...args);
      for await (let c of cid) {
        await target.chain.emit({
          type: 'ipfs pin add',
          data: `ipfs pin add ${c.cid.toString()}`
        });
      }
      return cid;
    };

    /**
     * ipfs.pin.rm
     * */
    target.pin.rm = async function (...args) {
      let cid = await source.pin.rm(...args);
      for await (let c of cid) {
        await target.chain.emit({
          type: 'ipfs pin rm',
          data: `ipfs pin rm ${c.cid.toString()}`
        });
      }
      return cid;
    };

    /**
     * ipfs.pin.ls
     * */
    target.pin.ls = async function* (...args) {
      let cid = source.pin.ls(...args);
      for await (let c of cid) {
        /*
        await target.chain.emit({
          type: 'ipfs pin ls',
          data: `ipfs pin ls ${c.cid.toString()}`
        });
        */
        yield c;
      }
    };

  }
};




