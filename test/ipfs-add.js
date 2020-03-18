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
  // ----------------------
  // 001
  /*

    let files = await fStormHttpClient.add(fs.readFileSync(path.resolve(__dirname, './ipfs-add.js')));
    for await (let res of files) {
      console.log(res);
    }
  */

  // ----------------------
  // 002 文件

  /*
   let files = await fStormHttpClient.add(fs.readFileSync('C:\\Users\\Administrator\\Desktop\\Devpn.exe'));
    for await (let res of files) {
      console.log(res);
    }
    */
  const files = [{
    path: '/tmp/myfile2.txt',
    // content: 'ABC'
  }];

  for await (const result of fStormHttpClient.add(files)) {
    console.log(result);
  }

  // console.log(jsFStormHttpClient.multibase);
  // await IPFS.files.mkdir('/dir-002');

  /**
   * files.mkdir
   * */
  // await IPFS.files.mkdir('/dir-002');
  // await IPFS.files.mkdir('/dir-002');
  // await IPFS.files.mkdir('/dir-003');
  /**
   * files.write
   * */
  // await IPFS.files.write('/dir-001/001.txt','002')
  // await IPFS.files.write('/dir-001/001.txt', '001', {create: true});

  /**
   * files.cp
   * */
  // console.log(await IPFS.files.cp('/dir-001/001.txt', '/dir-002/001.txt'));

  /**
   * files.ls
   * */
  // let files = await IPFS.files.ls('/dir-001');
  // console.log(await files.next());

  /**
   * files.mv
   * */
  // await IPFS.files.mv('/dir-003/003.txt', '/dir-004/004.txt')

  /**
   * files.read
   * */
  // let content = await IPFS.files.read('/dir-003/003.txt');
  // console.log((await content.next()).value.toString());

  /**
   * files.rm
   * */
  // await IPFS.files.rm('/dir-001/003.txt');
  // await IPFS.files.rm('/dir-001', {recursive: true});


  /**
   * files.stat
   * */
  // let stat = await IPFS.files.stat('/dir-001');
  // console.log(stat);
  // let stat = await IPFS.files.stat('/001.png');
  // console.log(stat);


  /**
   * block.put
   * */
  // console.log(await IPFS.block.put(Buffer.from('001')));


  // const pinset = await IPFS.pin.add('QmWATWQ7fVPP2EFGu71UkfnqhYXDYH566qy47CnJDgvs8u');
  // console.log(pinset);

  // const pinset = await IPFS.pin.ls();
  // console.log(await pinset.next());


}());
