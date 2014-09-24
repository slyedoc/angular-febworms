angular.module('febworms').directive('febwormsParsePattern', function() {

  return {
    require: ['ngModel'],
    link: function($scope, $element, $attrs, ctrls) {
      var ngModelCtrl = ctrls[0];

      ngModelCtrl.$parsers.push(validate);
        console.log('123');
      function validate(value) {
        console.log(value);
        try {
          new RegExp(value);
        } catch(e) {
          ngModelCtrl.$setValidity('pattern', false);
          return undefined;
        }

        ngModelCtrl.$setValidity('pattern', true);
        return value;
      }
    }
  };
});