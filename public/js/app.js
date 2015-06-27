

// define the module

var app = angular.module('hot-res', ['ui.router', 'ngCookies', 'angular-loading-bar'])

  .config(['$stateProvider', '$urlRouterProvider', '$locationProvider', function ($stateProvider, $urlRouterProvider, $locationProvider) {

    // $locationProvider.html5Mode(true);

    $urlRouterProvider.otherwise('/');

    $stateProvider

      .state('home', {
        url: '/',
        views: {
          '' : {
            templateUrl: '../partials/home-nav.html',
            controller: 'HomeCtrl'
          },
          'theView@home': {
            templateUrl: '../partials/landing.html',
            controller: 'HomeCtrl'
          }
        }
      })

      .state('createHotel', {
        url: '/addHotel',
        views: {
          '' : {
            templateUrl: '../partials/home-nav.html',
            controller: 'addHotelCtrl'
          },
          'theView@createHotel': {
            templateUrl: '../partials/add-hotel.html',
            controller: 'addHotelCtrl'
          }
        },
        data: {
          pageTitle: 'hotRes - Add Hotel'
        }
      })

      .state('about', {
        url: '/about',
        views: {
          '' : {
            templateUrl: '../partials/home-nav.html',
            controller: 'aboutCtrl'
          },
          'theView@about': {
            templateUrl: '../partials/about.html',
            controller: 'aboutCtrl'
          }
        },
        data: {
          pageTitle: 'hotRes - About hotRes'
        }
      })

      .state('faq', {
        url: '/faq',
        views: {
          '' : {
            templateUrl: '../partials/home-nav.html',
            controller: 'faqCtrl'
          },
          'theView@faq': {
            templateUrl: '../partials/faq.html',
            controller: 'faqCtrl'
          }
        },
        data: {
          pageTitle: 'hotRes - FAQ\'s'
        }
      })

      .state('singleHotel', {
        url: '/hotels/{hotelId}',
        templateUrl: '../partials/singleHotel.html',
        controller: 'singleHotelCtrl'
      });

  }])

  .config(['cfpLoadingBarProvider', function(cfpLoadingBarProvider) {
    cfpLoadingBarProvider.includeSpinner = false;
  }])

  .config(['cfpLoadingBarProvider', function(cfpLoadingBarProvider) {
    cfpLoadingBarProvider.includeBar = true;
  }]);