const fs = require('fs');
const path = require('path');

class Cache {

  constructor(props) {
    this.jsonFile = path.resolve(__dirname, './cache.json');
    this.jsonData = [];
  }

  sync() {
    this.jsonData = fs.readFileSync(this.jsonFile).toString();
    this.jsonData = JSON.parse(this.jsonData);
  }

  set(data) {
    this.sync();
    this.jsonData.push(data);
    fs.writeFileSync(this.jsonFile, JSON.stringify(this.jsonData));
  }

  get() {
    this.sync();
    return this.jsonData;
  }
}


module.exports = Cache;
