/**
 * @description 格式化时间
 * @param options {Object}
 * */
module.exports.parseDateTime = function (options = {format: null, timestamp: null}) {
  !options.format && (options.format = 'y-m-d h:i:s');
  !options.timestamp && (options.timestamp = null);
  const date = options.timestamp === null ? new Date() : new Date(Number(options.timestamp)),
    y = date.getFullYear(), m = date.getMonth() + 1,
    d = date.getDate(), h = date.getHours(),
    i = date.getMinutes(), s = date.getSeconds();
  return options.format
    .replace(/y/g, y).replace(/m/g, m < 10 ? '0' + m : m)
    .replace(/d/g, d < 10 ? '0' + d : d).replace(/h/g, h < 10 ? '0' + h : h)
    .replace(/i/g, i < 10 ? '0' + i : i).replace(/s/g, s < 10 ? '0' + s : s);
};
/**
 * @description 校验数据
 * @param rules {Array}
 * @return Promise resolve => ok | reject => 校验失败 callBack(errInfo)
 * */
module.exports.validate = async function (rules) {
  return new Promise((resolve, reject) => {
    if (!(rules instanceof Array)) {
      return reject({message: 'rules type is not a array', code: 0, source: rules,});
    }
    for (let i = 0; i < rules.length; i++) {
      let rule = rules[i];
      if (({}).toString.call(rule.handle) === '[object Function]') {
        if (rule.handle(rule.value) === false) {
          return reject({message: rule.errMsg || '', code: 1, source: rule,});
        }
      } else if (({}).toString.call(rule.handle) === '[object RegExp]') {
        if (rule.value === undefined || !rule.handle.test(rule.value)) {
          return reject({message: rule.errMsg || '', code: 1, source: rule,});
        }
      } else {
        return reject({message: 'rules item handle type is not a regexp or function', code: 0, source: rule,});
      }
    }
    resolve();
  });
};

module.exports.sleep = async function (t = 1000) {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      resolve();
    }, t);
  });
};

module.exports.isVersionRange = function ([v1 = null, v2 = null], diff) {

  const main = (inputVersion) => {
    this.is = (diffVersion) => {
      diffVersion = diffVersion.split('-')[0];
      let _base = inputVersion.split('.');
      let _diff = diffVersion.split('.');
      let longSize = Math.max(_base.length, _diff.length);
      _base = _base.concat(new Array(longSize - _base.length).fill(0)).map(i => parseInt(i, 10));
      _diff = _diff.concat(new Array(longSize - _diff.length).fill(0)).map(i => parseInt(i, 10));
      let i = 0;
      while (i < longSize) {
        if (_base[i] > _diff[i]) {
          return 'gt';
        }
        if (_base[i] < _diff[i]) {
          return 'lt';
        }
        i++;
      }
      return 'eq';
    };
    this.gt = (diffVersion) => {
      return this.is(diffVersion) === 'gt';
    };
    this.lt = (diffVersion) => {
      return this.is(diffVersion) === 'lt';
    };
    return this;
  };
  if (v1 === '*' && v2 === '*') {
    return true;
  }
  if (v1 === diff && v2 === diff) {
    return true;
  }
  if (arguments[0].length === 1) {
    return v1 === '*' || v1 === diff;
  }
  if (v1 === '*') {
    return main(diff).lt(v2);
  }
  if (v2 === '*') {
    return main(diff).is(v1) === 'eq' || main(diff).gt(v1);
  }

  return (main(diff).is(v1) === 'eq' || main(diff).gt(v1))
    && main(diff).lt(v2);
};


/**
 * @description 生成随机字符串
 * @param length {Number} 长度
 * @param type {Number} 1 字母数字结合  | 2 纯字母 | 3 纯数字
 * */
module.exports.makeRandomString = function (length = 32, type = 1) {
  let chars = '',
    string = '';
  switch (type) {
    case 1:
      chars = 'ABCDEFGHJKMNPQRSTWXYZabcdefhijkmnprstwxyz2345678';
      break;
    case 2:
      chars = 'ABCDEFGHJKMNPQRSTWXYZabcdefhijkmnprstwxyz';
      break;
    case 3:
      chars = '0123456789';
      break;
  }
  for (let i = 0; i < length; i++) {
    string += chars.charAt(Math.floor(Math.random() * chars.length));
  }
  return string;
};
/**
 * @description 获取不带毫秒的时间戳
 * */
module.exports.getTimestamp = function () {
  return Number.parseInt(new Date().getTime() / 1000);
};
/**
 * @description 判断是否为假值 null undefined '' false
 * */
module.exports.isEmptyValue = function (value) {
  return [null, undefined, '', false].includes(value);
};
