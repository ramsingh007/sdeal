// Ionic Starter App

// angular.module is a global place for creating, registering and retrieving Angular modules
// 'starter' is the name of this angular module example (also set in a <body> attribute in index.html)
// the 2nd parameter is an array of 'requires'
// 'starter.controllers' is found in controllers.js
angular.module('starter', ['ionic', 'starter.controllers','starter.services','starter.dir'])

.run(function($rootScope,$state,$http, webService, $ionicPlatform, $ionicPopup) {
  $ionicPlatform.ready(function() {
      $rootScope.title_ok = 'Ok';
$rootScope.title_close = 'Close';
    // Hide the accessory bar by default (remove this to show the accessory bar above the keyboard
    // for form inputs)
    if (window.cordova && window.cordova.plugins.Keyboard) {
      cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
      cordova.plugins.Keyboard.disableScroll(true);

    }
    if (window.StatusBar) {
      // org.apache.cordova.statusbar required
      StatusBar.styleDefault();
    }
  });
})

.constant('myConfig', {
  'apiUrl': 'http://116.72.216.152/'
})

.config(function($stateProvider, $urlRouterProvider,$ionicConfigProvider) {
   $ionicConfigProvider.backButton.previousTitleText(false).text('');
  $stateProvider

    .state('app', {
    url: '/app',
    abstract: true,
    templateUrl: 'templates/menu.html',
    controller: 'menucontroller'
  })

  .state('app.search', {
    url: '/search',
    views: {
      'menuContent': {
        templateUrl: 'templates/search.html',
         controller: 'AppCtrl'
      }
    }
  })
.state('app.myorders', {
    url: '/myorders',
    views: {
      'menuContent': {
        templateUrl: 'templates/myorder.html',
         controller: 'AppCtrl'
      }
    }
  })
.state('app.mycart', {
    url: '/mycart',
    views: {
      'menuContent': {
        templateUrl: 'templates/mycart.html',
         controller: 'AppCtrl'
      }
    }
  })
.state('app.orderco', {
    url: '/orderco',
    views: {
      'menuContent': {
        templateUrl: 'templates/orderco.html',
         controller: 'AppCtrl'
      }
    }
  })
.state('app.ordersummary', {
    url: '/ordersummary',
    views: {
      'menuContent': {
        templateUrl: 'templates/ordersummary.html',
         controller: 'AppCtrl'
      }
    }
  })
.state('app.paymentoption', {
    url: '/paymentoption',
    views: {
      'menuContent': {
        templateUrl: 'templates/paymentoption.html',
         controller: 'AppCtrl'
      }
    }
  })

.state('app.userdata', {
    url: '/userdata',
    views: {
      'menuContent': {
        templateUrl: 'templates/userdata.html',
         controller: 'AppCtrl'
      }
    }
  })
  .state('app.browse', {
      url: '/browse',
      views: {
        'menuContent': {
          templateUrl: 'templates/browse.html',
          controller: 'AppCtrl'

        }
      }
    })
    .state('app.playlists', {
      url: '/playlists',
      views: {
        'menuContent': {
          templateUrl: 'templates/playlists.html',
          controller: 'AppCtrl'
        }
      }
    })

  .state('app.playlist', {
    url: '/playlist',
    views: {
      'menuContent': {
        templateUrl: 'templates/playlist.html',
        controller: 'AppCtrl'
      }
    }
  });

  // if none of the above states are matched, use this as the fallback
  $urlRouterProvider.otherwise('/app/playlists');
});
