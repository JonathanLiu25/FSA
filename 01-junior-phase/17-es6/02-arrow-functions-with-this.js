
const button = document.getElementsByTagName('button')[0]

// this doesn't work :(
// setTimeout is not bound to anything, so it thinks 
// 'this' is the window.
button.addEventListener('click', function(){
	setTimeout(function(){
		console.log(this)
	}, 1000)
})

// we can fix it like this:
button.addEventListener('click', function(){
	var self = this;
	setTimeout(function(){
		console.log(self)
	}, 1000)
})

// but that's kind of a hack, so we fix it like this instead:
button.addEventListener('click', function(){
	var self = this;
	setTimeout(logThis.bind(this), 1000)
})

function logThis(){
	console.log(this)
}

// Still kind of annoying... so we do this instead:
button.addEventListener('click', function(){
	setTimeout(() => console.log(this), 1000)
})
// this is bound to the parent scope! great!

