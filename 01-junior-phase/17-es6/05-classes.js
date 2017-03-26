// Unlike many other languages (Java, Ruby, etc), 
// JavaScript does not have class-based concepts built in

// JavaScript uses prototypal inheritance, rather than class-based inheritance
// ES6 introduces the class keyword, 
// similar to other languages to make it more intuitive to "create" classes

// IT IS:
// syntactic sugar for writing constructor functions 
// that helps eliminate some boilerplate
// familiar to developers coming from other languages

// IT ISN'T:
// adding new functionality - behind the scenes, the behavior is the same as a constructor function.
// It does not replace prototypal inheritance

// This is the 'old' style:

function Dog (name, breed) {
    this.name = name;
    this.breed = breed;
}

// instance methods
Dog.prototype.bark = function () {
	console.log('arf!');
};
Dog.prototype.sayName = function () {
	console.log('Hi, my name is ', this.name); 
};

// static (class) methods
Dog.fetchAll = function () {
	return $http.get('/api/dogs')
	.then(res => res.data)
	.catch(console.error);
};

const fluffy = new Dog('fluffy', 'Three-headed Mastiff');
fluffy.bark(); // arf!




// new tricks!
class Dog {
	constructor (name, breed) {
		this.name = name;
		this.breed = breed;
	}
    
	// Notice the lack of commas between these methods!
	sayName () {
		console.log(`Hi, my name is ${this.name}`);
	}

	bark () {
		console.log('arf!');
	}

}

const fluffy = new Dog('fluffy', 'pitbull');
fluffy.bark() // arf!


// inheritance is a real pain in old JS:
function Animal (name) {
	this.name = name;
}
Animal.prototype.sayName = function () {
	console.log('Hi, my name is ', this.name);
};

function Dog (name, breed) {
	Animal.call(this, name);
	this.breed = breed;
}
// we need to specify that the prototype of a Dog 
// derives from the prototype of an Animal
Dog.prototype = Object.create(Animal.prototype);
Dog.prototype.constructor = Dog;

Dog.prototype.bark = function () {
	console.log('arf!');
};


// NEW DOG!
class Animal {
	constructor (name) {
		this.name = name;
	}
    
	sayName () {
		console.log('Hi, my name is ', this.name);
	}
}

class Dog extends Animal { // the 'extends' keyword extends the parent's prototype
	constructor (name, breed) {
		super(name); // the 'super' keyword replaces 'Animal.call(this, name)'
		this.breed = breed;
	}
	
	bark () {
		console.log('arf!');
	}
}

