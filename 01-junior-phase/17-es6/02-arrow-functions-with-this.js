
const button = document.getElementsByTagName('button')[0]
console.log(button)
// this doesn't work :(
// setTimeout is not bound to anything, so it thinks 
// 'this' is the window.
// button.addEventListener('click', function(){
// 	setTimeout(function(){
// 		console.log(this)
// 	}, 1000)
// })

// we can fix it like this:
// button.addEventListener('click', function(){
// 	var self = this;
// 	setTimeout(function(){
// 		console.log(self)
// 	}, 1000)
// })

// but that's kind of a hack, so we fix it like this instead:
// button.addEventListener('click', function(){
// 	setTimeout(logThis.bind(this), 1000)
// })

// function logThis(){
// 	console.log(this)
// }

// Still kind of annoying... so we do this instead:
button.addEventListener('click', () => {
	console.log(this)
	setTimeout(() => console.log(this), 1000)
})
// this is bound to the parent scope! great!




// what if we did this:
const Neo = {};
const agentSmiths = ['Smith1', 'Smith2', 'Smith3'];

Neo.kick = function(agent) {
		// console.log(this)
    console.log('Neo kicked ', agent);
};

Neo.kickAgentSmiths = function () {
    agentSmiths.forEach(function (agent) {
    		// console.log(this)
        this.kick(agent);
    });
};



// COMBOS!:
router.get('/', (req, res, next) => {
  Artist
    .findById(id)
    .then(artist => artist.update(req.body)) 
    .then(updatedArtist => res.send(updatedArtist))
    .catch(next);
});
