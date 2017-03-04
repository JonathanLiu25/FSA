var Door = require('./Door.js');
var Wall = require('./Wall.js')


function House(){
	this.wall = new Wall(10,10);
	this.door = new Door('green')
}


console.log(new House())

