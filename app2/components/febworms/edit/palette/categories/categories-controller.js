angular.module('febworms').controller('febwormsEditPaletteCategoriesController', function($scope, febwormsConfig) {

  $scope.categories = febwormsConfig.fields.categories;

  $scope.setCategory = function(name, category) {
    $scope.categoryName = name;
    $scope.category = category;
  };
});