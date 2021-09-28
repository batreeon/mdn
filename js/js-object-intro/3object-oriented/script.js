function Person(name) {
    this.name = name;
    this.greeting = function() {
        alert('Hi! I\'m '+this.name+'.');
    }
}

// let mike = new Person('mike');
// let p1 = new Object();
// let p2 = new Object({});
// let p2 = Object.creatw(p1);