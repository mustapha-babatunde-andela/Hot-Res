

/*
  api-call service that makes the api call using the 
  angular in-built $http service for AJAX calls
*/

app.factory('hotelApi',['$http', function($http) {

  return {
    // function to handle hotel search api call
    hotelSearch: function(url) {
      return $http.get(url);
    }
  }
}]);

/*
    info.deleteHotel = function(managerToken, hotelId) {
      var req = {
        method: 'DELETE',
        url: '/api/hotels/' + hotelId,
        headers: {
          'x-access-token': managerToken
        },
      }
      return $http(req);
    }
    */