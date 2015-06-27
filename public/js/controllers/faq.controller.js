

app.controller('faqCtrl', ['$scope', '$state', 'hotelApi', function($scope, $state, hotelApi) {

  // set variables to show buttons
  $scope.showAboutButton = true;
  $scope.showAddButton = true;
  $scope.showfaqButton = false;
  
}]);