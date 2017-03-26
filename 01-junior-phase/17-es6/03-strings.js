
const name = 'Brick Tamland'
const favFood = 'ice cream'
const favClothing = 'nice pair of slacks'
const age = 12

function getAge(){
	console.log(this)
	return 33
}

// use backticks to make a string
// then interpolate with ${variableName}
console.log(`I'm ${getAge()}. I like to eat ${favFood} and I really enjoy a ${favClothing}.`)

// you can even do stuff inside the ${}, like maths or functions!

// 
const wizards = [
	{name: 'dumbledore', house: 'gryffindor'},
	{name: 'harry', house: 'gryffindor'},
	{name: 'severus', house: 'slytherin'}
]


const myList = wizards.map(wizard => `I am ${wizard.name} from ${wizard.house}`)

const myList = wizards.map(wizard => `<li>I am ${wizard.name} from ${wizard.house}</li>`)

// what about backticks within backticks?!

console.log(myList)


// TAKEAWAYS:
// always use template strings instead of 'hello ' + 'there'