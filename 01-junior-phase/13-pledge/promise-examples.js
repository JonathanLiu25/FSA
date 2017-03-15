'use strict';

// this stuff is just copied from the practical promises workshop
var fs = require('fs');
var Promise = require('bluebird');
var chalk = require('chalk');

function readFile(filename, callback) {
  var randExtraTime = Math.random() * 200;
  setTimeout(function () {
    fs.readFile(filename, function (err, buffer) {
      if (err) callback(err);
      else callback(null, buffer.toString());
    });
  }, randExtraTime);
};

function promisifiedReadFile(filename) {
  return new Promise(function (resolve, reject) {
    readFile(filename, function (err, str) {
      if (err) reject(err);
      else resolve(str);
    });
  });
};

function green(text) {
  console.log(chalk.green(text));
};

function red(text) {
  console.error(chalk.red(text));
};

function done(){
  console.log('done')
}


// example 1
// calling .then on the same promise

// var promiseOne = promisifiedReadFile('text-one.txt')

// promiseOne
// .then(function(val){
//   console.log(val, 'logged from first .then()')
// })

// promiseOne
// .then(function(val){
//   console.log(val, 'logged from second .then()')
// })

// *********************
// *********************

// example 2
// calling .then on the same promise, even after
// it is resolved:

// var promiseOne = promisifiedReadFile('text-one.txt')

// promiseOne
// .then(function(val){
//   console.log(val, 'logged from first .then()')
// })

// promiseOne
// .then(function(val){
//   console.log(val, 'logged from second .then()')
// })

// // doesn't matter when we add the .then()
// setTimeout(function(){
//   promiseOne.then(green)
// }, 3000)

// *********************
// *********************

// example 3
// The value from the original promise 
// drips down to the first available handler
// promisifiedReadFile('text-one.txt')
// .then()
// .then()
// .then()
// .then(function(value){
//   console.log(value)
// })

// *********************
// *********************

// example 4
// The value that is returned from a promise
// is the resolved value for the next promise
// promisifiedReadFile('text-one.txt')
// .then()
// .then(function(value){
//   return 'I AM THE NEW VALUE NOW!'
// })
// .then(function(newValue){
//   console.log(newValue)
// })

// *********************
// *********************

// example 5
// The value that is returned from a promise
// is the resolved value for the next promise
// ...so what happens if the last promise 
// doesn't return anything?
// promisifiedReadFile('text-one.txt')
// .then(function(value){
//   console.log(value, '1')
// })
// .then(function(value){
//   console.log(value, '2')
// })
// .then(function(value){
//   console.log(value)
// })
// .then(function(value){
//   console.log(value)
// })
// .then(function(value){
//   console.log(value)
// })

// *********************
// *********************

// example 6
// The value that is returned from a promise
// is the resolved value for the next promise
// ...so what happens if the last promise 
// returns a promise?
// promisifiedReadFile('text-one.txt')
// .then(function(value){
//   console.log(value)
//   return promisifiedReadFile('text-two.txt')
// })
// .then(function(value){
//   console.log(value)
// })

// *********************
// *********************

// example 7
// The error generated also drips down 
// to the first error handler
// promisifiedReadFile('this-file-doesnt-exist.txt')
// .then(function(value){
//   console.log(value)
//   return promisifiedReadFile('text-two.txt')
// })
// .then(green)
// .then(green)
// .then(green)
// .then(null, red)

// *********************
// *********************

// example 8
// to log errors you can either pass an error function, 
// or just use .catch() (it is exactly the same!)

// promisifiedReadFile('this-file-doesnt-exist.txt')
// .then(function(value){
//   console.log(value)
//   return promisifiedReadFile('text-two.txt')
// })
// .then(green)
// .then(green)
// .then(green)
// .catch(red)

// *********************
// *********************

// example 9
// Once the error has been handled, it's back to success!
// promisifiedReadFile('this-file-doesnt-exist.txt')
// .then(green)
// .then(green)
// .then(green)
// .then(green)
// .then(null, function(err){
//   console.error(err)
//   return 'Relax, I fixed the error'
// })
// .then(green)

// *********************
// *********************

// example 10
// what if the function blows up and throws an error?
promisifiedReadFile('text-one.txt')
.then(function(value){
  console.log(value)
  throw Error('WOOPS')
})
.then(green)
.then(green)
.then(green)
.then(null, function(err){
  console.log(err)
  return promisifiedReadFile('text-two.txt')
})
.then(green)







