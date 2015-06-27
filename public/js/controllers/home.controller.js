

app.controller('HomeCtrl', ['$scope', '$state', 'hotelApi', function($scope, $state, hotelApi) {

  // set variables to show buttons
  $scope.showAddButton = true;
  $scope.showAboutButton = true;
  $scope.showfaqButton = true;
  
  // scope function to handle hotel search form submission
  $scope.search = function() {

  }
}]);