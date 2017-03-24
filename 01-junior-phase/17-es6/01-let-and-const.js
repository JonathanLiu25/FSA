// var is function scoped
// That means that it is available inside the function 
// in which it is defined. If it is not defined inside a function
// then it is available on the window


// ======================================================== 
// var is function scoped, let and const are block scoped
// ========================================================
function setName(){
	var name = 'Dumbledore'
	console.log(name)
}

console.log(name) // => ReferenceError because name is scoped to the function


var age = 55
if(age > 40){
	var favHobby = 'golf'
	console.log('I love', favHobby)
}

var age = 55
if(age > 40){
	let favHobby = 'golf'
	console.log('I love', favHobby)
}


// ======================================================== 
// var can be re-declared, let and const cannot
// ========================================================

var name = 'Harry'
var name = 'Hermione'
console.log(name)

let name = 'Harry'
let name = 'Hermione'
console.log(name)

const name = 'Harry'
const name = 'Hermione'
console.log(name)

// ======================================================== 
// const are for constants
// (this just means the const has to point to the same thing)
// (i.e. it cannot be reassigned to point somewhere else)
// (the thing itself can still change...)
// ========================================================

// not OK
const greeting = 'Howdy'
greeting = 'hello'

// OK
const myArr = ['lamp']
myArr.push('corduroys')

// OK
const puppy = {
	name: 'rupert',
	age: 2
}
puppy.age++


// TAKEAWAYS:
// - always start with const
// - if you get yelled at, use let
// - you may never need to use var again

// proof this is no joke (and also a CLASSIC interview question):
for(var i = 0; i < 5; i++){
	setTimeout(function(){
		console.log(i)
	}, 1000*i)	
}
// in the olden days we would have to somehow 'freeze' the value of i
// for each loop. Somehow... close over the value of i.
for(var i = 0; i < 5; i++){
	(function (i){
		setTimeout(function(){
			console.log(i)
		}, 1000*i)			
	})(i)
}
// but that is way too complicated, so instead we now do this:
for(let i = 0; i < 5; i++){
	setTimeout(function(){
		console.log(i)
	}, 1000*i)	
}


// bonus - const and let are not hoisted...



