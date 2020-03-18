
module.exports = {
  install(target, source) {

    /**---files-------------------*/
    let sourceFiles = source.files;
    target.files = {};
    Object.assign(target.files, sourceFiles);
    /**
     * ipfs.files.write
     * */
    target.files.write = async function (...args) {
      return await source.files.write(...args);
    };

  }
};




