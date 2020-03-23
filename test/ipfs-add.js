const FStormHttpClient = require('../src/index');
const config = require('./config');
const path = require('path');
const fs = require('fs');

(async function f() {

  const fStormHttpClient = new FStormHttpClient({
    IPFSProvider: config.IPFSProvider,
    chainProvider: config.chainProvider,
    chainAccount: {
      privateKey: '0xe73fb7deae271d3b7f8a0f5b2040047dc6ee77e38d2c746d09689f3eb1c6b3d5'
    }
  });


  fStormHttpClient.setChainAccount({
    keystore: {
      'version': 3,
      'id': 'a0ced7fa-3e2d-4234-b6d4-7647a7dbfb6f',
      'address': 'e11ed3915fab957f2ea2b1395318eae9fb6ed18b',
      'crypto': {
        'ciphertext': '63b40a50705514a305170d9714643f81ecb5a8b283ae841abc5ad5ea176039c9',
        'cipherparams': {'iv': '4fa8dfec4cfe20f413a04635d6fdf29a'},
        'cipher': 'aes-128-ctr',
        'kdf': 'scrypt',
        'kdfparams': {
          'dklen': 32,
          'salt': '58e5f2e559ab74b930ec13fb8ad6c970b9164bcdcde1db284075093446f4d84f',
          'n': 8192,
          'r': 8,
          'p': 1
        },
        'mac': '156fea5c2d3dfbf7a04c68a0f2ee6409638caf7203f44d9094a216b0f294d516'
      }
    },
    password: '123456'
  });

  fStormHttpClient.setChainProvider(config.chainProvider);

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

  let files = await fStormHttpClient.add(fs.readFileSync('C:\\Users\\Administrator\\Desktop\\WebStorm2020.exe'));
  for await (let res of files) {
    console.log(res.cid.toString());
  }
  /*
  const files = [{
    path: '/tmp/myfile2.txt',
  }];

  for await (const result of fStormHttpClient.add(files)) {
    console.log(result.cid.toString());
  }*/

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
