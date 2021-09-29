function Person(first, last, age, gender, interests) {
    this.name = {
        first,
        last
    };
    this.age = age;
    this.gender = gender;
    this.interests = interests;
}

Person.prototype.greeting = function() {
    console.log('hi,im '+this.name.first+'.');
}


function Teacher(first, last, age, gender, interests, subject) {
    Person.call(this, first, last, age, gender, interests);

    this.subject = subject;
}

Teacher.prototype.greeting = function() {
    console.log('hi,im ' + this.subject + ' teacher '+this.name.first+'.');
}

let t1 = new Teacher('lee', 'kevin', 28, 'male', ['basketball'], 'math');
t1.greeting();