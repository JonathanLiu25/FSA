function Wall(height, length){
	this.height = height;
	this.length = length;
}

Wall.prototype.getArea = function(){
	return this.length*this.height;
}



module.exports = Wall;

// can also do...
// function someOtherFunction(){
// 	console.log('BEEP BOP BOOP I AM HUMAN')
// }
// module.exports = {
// 	WallFunction: Wall,
// 	someOtherFunction: someOtherFunction
// }