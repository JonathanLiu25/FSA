
ourAngularApp.controller('CartCtrl', function ($scope, $rootScope, CartFactory) {

	$scope.cart = CartFactory.cart
	// $rootScope.cart = [];
	
	$scope.total = CartFactory.getTotal; 

	$scope.purchaseCart = function() {
		alert('You win all the Murrays')
	};
});

ourAngularApp.factory('CartFactory', function($http) {
	var cart = [];
	var total = 0;

	$http.get('/cart')
		.then(function (response) {
			// cart = response.data;
			angular.copy(response.data, cart);
			// response.data !== cart
		})

	return {
		cart: cart,
		addToCart: function (picture) {
			return $http.post('/cart', picture)
				.then(function (response) {
					cart.push(picture);
					total += picture.price;
					return response.data;
				})
		},
		getTotal: function () {
			return total;
		}
	}
})










