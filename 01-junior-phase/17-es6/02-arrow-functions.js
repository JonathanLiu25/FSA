
// much more concise, 
// implicit returns, 
// doesn't rebind value of this

var add = function(a,b){
	return a + b
}

const add = (a,b) => {
	return a + b
}
// we can make it more concise

// let's do it again with this double function
var double = function(x){
	return x*2
}

const double = x => x*2


const films = [
"The Philosopher's Stone",
"The Chamber of Secrets",
"The Prisoner of Azkaban",
"The Goblet of Fire",
"The Order of the Phoenix",
"The Half-Blood Prince",
"The Deathly Hallows"
]

// what does this do?
films.map(function(film){
	return `<li>${film}</li>`
})

// we can do it more concisely with arrow functions:
films.map(film => `<li>${film}</li>`)

// two more things to make it even better
// 1 - remove parens (if only one parameter)
// unfortunately we can't remove the parens if there are 2 or mor parameters
// 2 - make it a one liner (remove the curlies and the return - one-liners automatically returns)
films.map(film => `<li>${film}</li>`)


// a gotcha:
films.map((film, i) => {filmName: film, index: i})
// => gives you an error, JS though the curlies were there for the function
// how do we fix it?


// Arrow functions and this
// arrow functions do not automatically rebind 'this'
// (which is great for nested methods, as we don't have to 'bind' anymore)


// TAKEAWAYS
// Use 'function' for functions in global scope, and for Object.prototype properties, 
// Use class for object constructors (we'll come to this soon)
// Use => everywhere else.



// TODO - default function args
// when NOT to use arrow functions
// spread and rest
// JS modules
// classes
// Look at GH! https://www.youtube.com/watch?v=_WxXZQvMepI&feature=youtu.be
