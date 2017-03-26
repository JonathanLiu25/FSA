
const lordOfDarkness = {
	name: {
		firstName: {
			atBirth: 'tom marvolo riddle',
			later: 'voldemort'
		}
	},
	house: 'Slytherin',
	favFood: 'Tacos',
	favFilm: 'The Incredibles'
}

// whaaat? How cool is this?
const { atBirth, later } = lordOfDarkness.name.firstName;
// pulling off the name and house values of the object
console.log(later)

// We use this in react EVERY DAY!

// we can every rename the variables as we destructure...


// bonus - object literal shorthand

function makeWizard(name, house, age){
	return {name, house, age}
}

// can be shorthanded into this:
function makeWizard(name, house, age){
	return {name, house, age}
}

// TAKEAWAYS
// 1 - use destructuring anytime you will be using 
// a lot of properties from an object (esp if they are nested deep in the object)



