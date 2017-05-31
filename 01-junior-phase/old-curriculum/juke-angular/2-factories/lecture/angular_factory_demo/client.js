var ourAngularApp = angular.module('murray', []);

ourAngularApp.factory('MathTool', function() {
	var tools = {}

	tools.add = function (a, b) {
		return a + b;
	}

	return tools
})

ourAngularApp.factory('MoreMath', function(MathTool) {
	return {
		megaAdd: function (a, b) {
			return MathTool.add(a,b) + MathTool.add(a,b)
		}
	}
})


ourAngularApp.controller('UseMath', function (MoreMath) {
	var num = MoreMath.megaAdd(1,2)

	console.log(num);
})

















