var Door = require('./Door.js');
var Wall = require('./Wall.js')

// var Wall = require('./Wall.js').WallFunction;
// var someOtherFunction = require('./Wall.js').someOtherFunction;

// DEMO BUILTIN:
// var path = require('path')
// console.log(path.join(__dirname, '../../'))


// DEMO CHALK - need to have npm init and npm i --save chalk first
// var chalk = require('chalk')
// console.log(chalk.blue('DOGS RULE OK'))

function House(){
	this.wall = new Wall(10,10);
	this.door = new Door('green')
}


console.log(new House())


// console.log(someOtherFunction())


// qLIOeqGBbWRepzixT5kw9VxIK
// 141QzwabbWPtAeqbmW2SalcrGRvOwUJBeLtKNcTfsTBVUOKhIs
// 807112520-9oCDrkKYrQKhlEGgGxlWfu7AGO9mmCHl20egMz0W
// H6RiuLwVBglXRaBftGOKEh71VQYnECiQ1SaYZH3OsnwqT

// var Twitter = require('twitter');
 
// var client = new Twitter({
//   consumer_key: 'qLIOeqGBbWRepzixT5kw9VxIK',
//   consumer_secret: '141QzwabbWPtAeqbmW2SalcrGRvOwUJBeLtKNcTfsTBVUOKhIs',
//   access_token_key: '807112520-9oCDrkKYrQKhlEGgGxlWfu7AGO9mmCHl20egMz0W',
//   access_token_secret: 'H6RiuLwVBglXRaBftGOKEh71VQYnECiQ1SaYZH3OsnwqT'
// });
 
// var params = {screen_name: 'johnptmcdonald'};
// client.get('statuses/user_timeline', params, function(error, tweets, response) {
//   if (!error) {
//     tweets.forEach(function(tweet){
//     	console.log(tweet.text)
//     })
//   }
// });