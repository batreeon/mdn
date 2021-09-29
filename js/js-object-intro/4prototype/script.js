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