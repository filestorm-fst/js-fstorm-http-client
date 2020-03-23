const Router = require('koa-router');
const utils = require('../utils/utils');
const Response = require('../services/response.service');
const Cache = require('../local/cache');
const fStormHttpClient = require('../fstorm-http-client');
const fs = require('fs');
const path = require('path');
const mimeTypes = require('mime-types');
const {v4: uuidv4} = require('uuid');
const router = new Router({
  prefix: '/api/main'
});

/**
 * @description
 * @method get
 * */
router.post('/upload', async (ctx, next) => {
  await [
    {
      v: ['*'],
      h: async () => {
        let ext = mimeTypes.extension(ctx.request.files.file.type);
        let targetFile = ctx.request.files.file.path;
        let newFile = path.resolve(path.dirname(targetFile), './' + uuidv4() + '.' + ext);
        fs.renameSync(targetFile, newFile);
        let encryptFile = await fStormHttpClient.encrypt(newFile);
        let files = await fStormHttpClient.add(fs.readFileSync(encryptFile));
        let cid = '';
        for await (let res of files) {
          cid = res.cid.toString();
        }
        if (cid === '') {
          throw new Error('');
        }
        fs.unlinkSync(newFile);
        fs.unlinkSync(encryptFile);
        // console.log(encryptFile)

        let cache = new Cache();
        cache.set({
          time: new Date().getTime(),
          cid: cid
        });

        ctx.body = new Response().success();
      }
    },
  ].find(item => {
    return utils.isVersionRange(item.v, ctx.__v);
  }).h();

});

router.get('/download', async (ctx, next) => {
  await [
    {
      v: ['*'],
      h: async () => {
        let files = fStormHttpClient.get(ctx.request.query.cid);
        for await (const file of files) {
          let bufferArray = [];
          for await (const chunk of file.content) {
            bufferArray.push(chunk._bufs[0]);
          }
          // 合并 buffer
          let buffer = Buffer.concat(bufferArray);
          let localFile = path.resolve(__dirname, '../upload/' + uuidv4());
          fs.writeFileSync(localFile, buffer);
          let decryptFile = await fStormHttpClient.decrypt(localFile);
          fs.unlinkSync(localFile);
          ctx.type = mimeTypes.lookup(decryptFile);
          ctx.body = fs.readFileSync(decryptFile);
          ctx.set('Cache-Control', 'max-age=' + (60 * 60 * 24 * 30 * 1000));
          console.log(decryptFile);
          console.log(fs.unlinkSync(decryptFile));
        }
      }
    },
  ].find(item => {
    return utils.isVersionRange(item.v, ctx.__v);
  }).h();

});

/**
 * @description
 * @method get
 * */
router.get('/list', async (ctx, next) => {
  await [
    {
      v: ['*'],
      h: async () => {
        let cache = new Cache();
        ctx.body = new Response().success(cache.get());
      }
    },
  ].find(item => {
    return utils.isVersionRange(item.v, ctx.__v);
  }).h();

});

/**
 * @description
 * @method get
 * */
router.get('/test', async (ctx, next) => {
  await [
    {
      v: ['*'],
      h: async () => {
        ctx.body = new Response().success();
      }
    }
  ].find(item => {
    return utils.isVersionRange(item.v, ctx.__v);
  }).h();

});

module.exports = router;

