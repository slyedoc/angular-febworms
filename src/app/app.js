
var app = angular.module('app', ['ngRoute', 'ngLogo']);

app.controller('MainCtrl', function($scope, appMenuItems) {
  $scope.menuItems = appMenuItems;
});