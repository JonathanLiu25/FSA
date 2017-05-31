ourAngularApp.controller('ProductsCtrl', function($scope, $rootScope, $http, CartFactory, ProductsFactory) {

	ProductsFactory.getAllProducts()
		.then(function(allProductsFromBackend) {
			$scope.products = allProductsFromBackend;
		})

  //get all pictures

  $scope.addToCart = function(pic) {
    CartFactory.addToCart(pic)
    	.then(function (dataFromBackend) {
    		//do stuff with backend data
    	})
      // $rootScope.cart.push(pic);
  }

});

ourAngularApp.factory('ProductsFactory', function($http) {

  return {
    getAllProducts: function() {
      return $http.get('/pictures')
        .then(function(response) {
        	return response.data;
          // $scope.products = response.data;
        })
    }
  }
})





















