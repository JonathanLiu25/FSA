// document.getElementById('photos').addEventListener('mouseover', function (event) {
//   console.log(event);
//   console.log('GET OFF ME!');
//   console.log(this);
// });

document.getElementById('photos').children[0].addEventListener('drag', function (event) {
  console.log(event.target);
  console.log(this);
  console.log('LET GO!!!1!');
});