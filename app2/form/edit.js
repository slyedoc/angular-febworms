angular.module('app').controller('FormEditController', function ($scope, $location, notifications) {

  // The form model
  $scope.form = {};

  $scope.onSave = function() {
    var schema = $scope.form.schema;
    $scope.form.$save().then(function () {
      notifications.add("Schema for " + schema.name + " saved.", 'info', 1);
      $location.path('/form');
    });
  };

  $scope.onCancel = function() {
    $location.path('/form');
  };

});

// angular.module('app2').factory('FormEditResolver', function ($route, Form) {
//   return Form.get({ id: $route.current.params.id });
// });

