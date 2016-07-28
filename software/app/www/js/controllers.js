angular.module('starter.controllers', ['ionic','leaflet-directive'])

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


 //to render the map
.controller('MapCtrl', ['$scope','$ionicPopup', '$http', function($scope, $ionicPopup, $http){
  angular.extend($scope, {
    PA: {
      lat : -22.242285,
      lng : -45.929177,
      zoom: 13
    },
    events: { },
    //this tile is needed to render the map when the app start, otherwise the map stay blank
    tiles: {
      url: 'https://api.tiles.mapbox.com/v4/mapbox.streets/{z}/{x}/{y}.png?access_token=pk.eyJ1IjoicmljYXJkby1mYXJpYSIsImEiOiJjaXB4ZXA2ZXkwd3FyZmptMm4zZ3JnOGI4In0.Md-nC4l8kf5vwur-fDJPJg'
    }
  });

  $scope.markers = new Array();

  //get all markers from the server
  //the response have an markers json
  $http.get('myURL/marker').success(function(res){
    angular.forEach(res, function (markers) {
      $scope.markers.push(markers);
    });
  }).error(function(err){
    console.log('An error occurred try again! ' + err);
  });

  //when the tag "leaflet" have an ID use the follow syntax to get an event: <sourceObjectType>.<leafletId>.<eventName>
  //when it hasn't any ID use the follow syntax: <sourceObjectType>.<eventName>
  $scope.$on("leafletDirectiveMap.map.click", function(event,args) {
    $scope.description = {text: ''};
    $scope.myPopup = $ionicPopup.show({
      templateUrl: 'form.html',
      title: 'Entre com os dados:',
      scope: $scope,
      buttons: [
        {
          text: 'Cancel',
          type: 'button-default',
          onTap: function () {
            $scope.myPopup.close();
            return false;
          }
        },
        {
          text: '<b>Confirm</b>',
          type: 'button-positive',
          onTap: function (e) {
            console.log($scope.description.text);

            if (!$scope.description.text) {
              //don't allow the user to close unless he enters some description
              e.preventDefault();
            } else {
              var leafEvent = args.leafletEvent;
              //console.log(leafEvent);
              $scope.markers.push({
                  lat: leafEvent.latlng.lat,
                  lng: leafEvent.latlng.lng,
                  message: $scope.description
              });
              $http.post('myURL/Marker',$scope.markers[$scope.markers.length - 1]).success(function(response){
                console.log('ok - ' + response);
              }).error(function(err){
                console.log('An error occurred try again! ' + err);
                $scope.markers.pop();
              });
              return 'confirm';
            }
          }
        }
      ]
    });
    $scope.myPopup.then(function (res) {
      console.log('Tapped!', res);
    });

  });

}]);
