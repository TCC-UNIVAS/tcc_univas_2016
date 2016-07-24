angular.module('starter.controllers', ['leaflet-directive'])

.controller('AppCtrl', function($scope, $ionicModal, $timeout) {

  // With the new view caching in Ionic, Controllers are only called
  // when they are recreated or on app start, instead of every page change.
  // To listen for when this page is active (for example, to refresh data),
  // listen for the $ionicView.enter event:
  //$scope.$on('$ionicView.enter', function(e) {
  //});

  // Form data for the login modal
  $scope.loginData = {};

  // Create the login modal that we will use later
  $ionicModal.fromTemplateUrl('templates/login.html', {
    scope: $scope
  }).then(function(modal) {
    $scope.modal = modal;
  });

  // Triggered in the login modal to close it
  $scope.closeLogin = function() {
    $scope.modal.hide();
  };

  // Open the login modal
  $scope.login = function() {
    $scope.modal.show();
  };

  // Perform the login action when the user submits the login form
  $scope.doLogin = function() {
    console.log('Doing login', $scope.loginData);

    // Simulate a login delay. Remove this and replace with your login
    // code if using a login system
    $timeout(function() {
      $scope.closeLogin();
    }, 1000);
  };
})

.controller('PlaylistsCtrl', function($scope) {
  $scope.playlists = [
    { title: 'Chill', id: 2 },
    { title: 'Dubstep', id: 3 },
    { title: 'Indie', id: 4 },
    { title: 'Rap', id: 5 }
  ];
})

.controller('PlaylistCtrl', function($scope, $stateParams) {
})

 //to render the map
.controller('MapCtrl', ['$scope', function($scope) {
  angular.extend($scope, {
    PA: {
      lat : -22.242285,
      lng : -45.929177,
      zoom: 13
    },
    events: {
      // map: {
      //   enable: ['click','contextmenu'],
      //   logic: 'emit'
      // }
    },
    tiles: {
      url: 'https://api.tiles.mapbox.com/v4/mapbox.streets/{z}/{x}/{y}.png?access_token=pk.eyJ1IjoicmljYXJkby1mYXJpYSIsImEiOiJjaXB4ZXA2ZXkwd3FyZmptMm4zZ3JnOGI4In0.Md-nC4l8kf5vwur-fDJPJg'
    }
  });


  $scope.markers = new Array();

  //when the tag "leaflet" have an ID use the follow syntax to get an event: <sourceObjectType>.<leafletId>.<eventName>
  //when it hasn1t any ID use the follow syntax: <sourceObjectType>.<eventName>
  $scope.$on("leafletDirectiveMap.map.click", function(event, args){
    var leafEvent = args.leafletEvent;
    console.log('Leaflet map click event detected.');

    $scope.markers.push({
      lat: leafEvent.latlng.lat,
      lng: leafEvent.latlng.lng,
      message: "lat: " + leafEvent.latlng.lat + "lng: " + leafEvent.latlng.lng
    });
  });


}]);
