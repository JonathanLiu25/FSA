var EventEmitter = require('events').EventEmitter;
var game = new EventEmitter();
module.exports = game;

var questionPairs = [
    [`What is the weirdest food you have ever eaten?`, `What is your favorite food?`],
    [`What is your favorite hobby?`, `What is your biggest fear?`],
    [`What is Omri's spirit animal?`, `What is John's spirit animal?`]
];

var questionPairIndex = 0;

game.sendOutNewQuestions = function () {

    game.emit('newQuestions', questionPairs[questionPairIndex]);

    if (questionPairIndex + 1 === questionPairs.length) {
        questionPairIndex = 0;
    } else {
        questionPairIndex = questionPairIndex + 1;
    }

};

game.newResponse = response => game.emit('newResponse', response);
game.playerJoined = () => game.emit('playerJoined');
game.playerLeft = () => game.emit('playerLeft');