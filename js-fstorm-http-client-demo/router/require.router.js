const path = require('path');
const glob = require('glob');


module.exports = {
  install(app) {
    glob(path.resolve(__dirname, './**/*.js'), (_, files) => {
      files.forEach(file => {
        if (!/router\.js$/.test(file)
          || /require\.router\.js$/.test(file)
        ) return;
        app.use(require(file).routes());
      });
    });
  }
};
