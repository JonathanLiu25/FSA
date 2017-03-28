'use strict';

const express = require('express');
const volleyball = require('volleyball');

const app = express();

app.use(volleyball);

app.use(express.static(__dirname));

const puppies = [{
  name: 'Taylor',
  id: 1,
  image: 'https://designerdoginfo.files.wordpress.com/2013/01/puggle-puppy-4.jpg?w=584'
}, {
  name: 'Reggie',
  id: 2,
  image: 'http://images.shape.mdpcdn.com/sites/shape.com/files/styles/slide/public/puppy-2_0.jpg'
}, {
  name: 'Christian',
  id: 3,
  image: 'http://www.101dogbreeds.com/wp-content/uploads/2015/04/Coydog-Puppy-Pictures.jpg'
}, {
  name: 'Jessie',
  id: 4,
  image: 'http://www.101dogbreeds.com/wp-content/uploads/2015/10/Chi-Spaniel-Puppy-Pictures.jpg'
}, {
  name: 'Pandora',
  id: 5,
  image: 'http://4.bp.blogspot.com/-3JeIxWBU7bY/UKjIt8lVpCI/AAAAAAAABx8/YM8piSOwczs/s1600/Schipperke-Puppy.jpg'
}];

const kittens = [{
  name: 'Toby',
  id: 6,
  image: 'http://placekitten.com/g/401/401'
}, {
  name: 'Thaddeus',
  id: 7,
  image: 'http://placekitten.com/g/402/402'
}, {
  name: 'Bella',
  id: 8,
  image: 'http://placekitten.com/g/403/403'
}, {
  name: 'Tiger',
  id: 9,
  image: 'http://placekitten.com/g/400/400'
}, {
  name: 'Oliver',
  id: 10,
  image: 'http://placekitten.com/g/404/404'
}];

app.get('/api/puppies', function (req, res) {
  res.json(puppies.map(p=>{
    return {
      id: p.id,
      name: p.name
    }
  }));
});

app.get('/api/kittens', function (req, res) {
  res.json(kittens.map(k=>{
    return {
      id: k.id,
      name: k.name
    }
  }));
});

//this is for 
app.get('/api/puppies/:id', function (req, res) {
  console.log(req.params.id)
  const aPuppy = puppies.find(p => p.id === +req.params.id);
  if (!aPuppy) res.sendStatus(404); //add this line if you go to a puppy that doesn't exist. And we could choose to display that differently
  else res.json(aPuppy);
});

app.get('/api/kittens/:id', function (req, res) {
  const aKitten = kittens.find(k => k.id === req.params.id);
  if (!aKitten) res.sendStatus(404); 
  else res.json(aKitten);
});


//this is for browserHistory demo
// app.use(function (req, res) {
//   res.sendFile(__dirname + '/index.html');
// });

app.listen(3000, function () {
  console.log('Server listening on port', 3000);
});
