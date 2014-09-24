angular.module('app').directive('navbar', function () {
  return {
    restrict: 'A',
    templateUrl: 'components/navbar/navbar.tmpl.html',
    controller: 'NavbarCtrl',
    replace: true
  };
});
