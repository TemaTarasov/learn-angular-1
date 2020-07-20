'use strict';

angular.module('art.input', []).component('artInput', {
  templateUrl: 'components/input/index.template.html',
  controller: InputController,
  bindings: {
    label: '@',
    name: '@',
    type: '@',
    required: '@',
    invalid: '<',
    value: '='
  }
});

function InputController() {
  this.$onInit = function () {
    this.name = (Math.random() * 1000000).toFixed(0);
    this.type = this.type || 'text';
    this.required = this.required || false;
    this.eye = this.type === 'password';

    this.showPassword = false;
  }.bind(this);

  this.toggleEye = function () {
    var value = !this.showPassword;

    this.type = value ? 'text' : 'password';
    this.showPassword = value;
  }.bind(this);
}
