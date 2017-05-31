var app = angular.module('PuppyShop', []);

app.controller('MainController', function ($scope) {

    $scope.currentPuppyName = null;

    console.log('From MainController', $scope);

});

app.controller('ListController', function ($scope) {

    $scope.puppies = [
        {
            name: 'Cisco',
            cute: true,
            price: 'Eliot\'s life',
            allergies: ['Peanuts', 'People', 'Other Dogs']
        },
        {
            name: 'Sierra',
            cute: true,
            price: 35000
        },
        {
            name: 'Wilbur',
            cute: false,
            price: 50
        }
    ];

});

app.controller('AddPuppyController', function ($scope) {

    console.log('From AddPuppyController', $scope);

    $scope.addPuppy = function () {

        $scope.puppies.push({
            name: 'Nugget',
            cute: true,
            price: 'Priceless'
        });

    };

});