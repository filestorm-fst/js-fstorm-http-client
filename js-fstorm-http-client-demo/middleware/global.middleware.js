const config = require('../config');
const Response = require('../services/response.service');

module.exports = {
  install(app) {
    /**
     * @description 解析版本
     * */
    app.use(async (ctx, next) => {
      try {
        ctx.__v = ctx.request.headers.v || '1.0.0';
        await next();
      } catch (e) {
        throw new Error('版本异常');
      }
    });

    /**
     * @description 公开静态资源
     * */
    app.use(require('koa-static')(config.staticPublicPath, {maxage: 1000 * 60 * 60 * 24 * 30}));

    /**
     * @description 全局捕获异常
     * */
    app.use(async (ctx, next) => {
      try {
        await next();
      } catch (e) {
        ctx.body = new Response().error(e);
      }
    });

    /**
     * @description 解析 post body 数据
     * */
    app.use(require('koa-body')({
      multipart: true,
      formidable: {
        maxFileSize: 100 * 1024 * 1024
      }
    }));
  }
};


