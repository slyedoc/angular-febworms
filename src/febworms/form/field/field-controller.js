angular.module('febworms').controller('febwormsFieldController', function($scope, febwormsUtils) {

  var self = this;
  var _form, _field;

  this.init = function(febwormsFormCtrl, fieldSchema, editMode) {
    
    self.initForm(febwormsFormCtrl);
    self.initField(fieldSchema);
    self.initDefaultData(fieldSchema, editMode);

    $scope.form = _form;
    $scope.field = _field;
    
  };

  this.initForm = function(febwormsFormCtrl) {
    _form = febwormsFormCtrl ? febwormsFormCtrl.model : {};

    return _form;
  };

  this.initField = function(fieldSchema) {

    _field = {
      $_id: 'id' + febwormsUtils.getUnique(),
      schema: fieldSchema
    };

    $scope.$watch('field.schema.name', function(value, oldValue) {
      self.registerState(value);
    });

    return _field;
  };

  this.initDefaultData = function(fieldSchema, editMode) {

    var fieldName = fieldSchema.name;

    
    if (editMode) {
      
      $scope.$watch('field.schema.value', function(value) {
        _form.data[fieldSchema.name] = value;
      });

      $scope.$watch('field.schema.name', function(value, oldValue) {
        if(value !== oldValue) {
          var data = _form.data[oldValue];
          delete _form.data[oldValue];
          _form.data[value] = data;
        }
      });

    } else if (_form.data && _form.data[fieldName] === undefined && fieldSchema.value !== undefined) {
      _form.data[fieldName] = fieldSchema.value;
    }

    return _form.data;
  };

  this.setFieldState = function(state) {
    // Called by the field-input directive
    _field.state = state;
    self.registerState(_field.schema.name);
  };

  this.registerState = function(fieldName) {
    // Re-register the ngModelCtrl with the form controller
    // whenever the name of the field has been modified.

    if (_form.state && _field.state) {
      _form.state.$removeControl(_field.state);
      _field.state.$name = fieldName;
      _form.state.$addControl(_field.state);
    }

    _field.name = fieldName;

  };

  this.field = function() {
    return _field;
  };

  this.form = function() {
    return _form;
  };
});