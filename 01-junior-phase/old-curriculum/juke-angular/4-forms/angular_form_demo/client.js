var app = angular.module('kittygogo', []);

app.controller('MainController', function ($scope, $http, $interval) {
  $http.get('/kittens')
  .then(function (response) {
    $scope.kittenProjects = response.data;
  });
  $scope.addFiveToAmount = function (kittenProject) {
    $http.put('/kittens/' + kittenProject.id, {
      amountToAdd: +$scope.amount
    })
    .then(function () {
      kittenProject.raised += +$scope.amount;
    });
  };

  // $scope.card.info.type = "Visa"

$scope.amount = 5;
  // $interval(function() {
  //   console.log($scope.amount);
  // }, 1000)


});

app.controller('NavbarController', function ($scope, $timeout) {

  $scope.showScope = function () {
    console.log($scope)
  }

  //setting the default value of the object
  $scope.card ={
    info: {
      number: 123123123,
      type: "Visa"
    }
  }


  //random example of $timeout just to introduce you to more built-in angular services
  // $timeout(function() {
    $scope.username = 'Kate Humphrey'
  // }, 1000);
});