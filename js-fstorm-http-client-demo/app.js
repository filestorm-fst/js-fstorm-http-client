(async function f() {

  const {serverListen} = require('./env.js');
  const Koa = require('koa');

  const app = new Koa();

  require('./router/require.router').install(app);
  require('./middleware/global.middleware').install(app);

  let server = app.listen(serverListen.port, serverListen.address);

}());


