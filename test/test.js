function Test() {
}

Test.prototype.echo = function () {
  console.log(this.li);
};
Test.prototype.li = [1, 2];


let a = function () {
  console.log(arguments);
};
a(122222222);
