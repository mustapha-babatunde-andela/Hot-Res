
// Directive to change page title dynamically based on state

app.directive('updateTitle', ['$rootScope', '$timeout', function($rootScope, $timeout) {
  return {
    link: function(scope, element) {
      var listener = function(event, toState) {
        var title = 'hotRes - Quick Hotel Search and Reservation';
        if (toState.data && toState.data.pageTitle) {
          title = toState.data.pageTitle;
        }

        $timeout(function() {
          element.text(title);
        }, 0, false);
      };

      $rootScope.$on('$stateChangeSuccess', listener);
    }
  };
}]);