

app.controller('addHotelCtrl', ['$scope', '$state', 'hotelApi', function($scope, $state, hotelApi) {


  // scope variable to be used to add the add hotel button in the state
  $scope.showAddButton = false;
  $scope.showAboutButton = true;
  $scope.showfaqButton = true;

  console.log('Add Hotel');

  // function to validate input
  $scope.validate = function() {
    // set validate variable to true, to assume at first that all fields pass validation
    var validate = true;







    // return validate variable based on result of all input checks
    return validate;
  }

}]);