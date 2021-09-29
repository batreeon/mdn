function dosomething(){}
console.log(dosomething.prototype);

let dst = function(){};
console.log(dst.prototype);

dosomething.prototype.foo = 'bar';
console.log(dosomething.prototype);

let dstInstance = new dosomething();
dstInstance.prop = 'some value';
console.log(dstInstance);
console.log(dstInstance.__proto__);
console.log(dstInstance.__proto__.__proto__);
console.log(dstInstance.constructor.name);

dosomething.prototype.greeting = function() {
    console.log('Hello world!');
}

dstInstance.greeting();
let dstInstance1 = new dosomething();
dstInstance1.greeting();

// 这个是不行的，你看上面greeting定义时，prototype是原始构造函数才具有的属性
dstInstance.prototype.hello = function() {
    console.log('hello!');
}