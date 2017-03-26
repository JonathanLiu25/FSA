// rest takes a comma-delineated grouping, and
// turns it into an array

function addNumbers(...nums){
	console.log(nums)

	return nums.reduce((curr, prev) => curr + prev, 0)
}

addNumbers(1,2,3,4,5)


// spread does the opposite (spreads)

function concatWords(name, job, age, family){
	return `I am ${name}, a ${job}. I served the ${family} family`
}

concatWords(...['dobby', 'free elf', 'unknown', 'Malfoy'])

