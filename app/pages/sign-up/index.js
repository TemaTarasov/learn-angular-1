'use strict';

angular.module('signup.page', []).component('signUpPage', {
  templateUrl: 'pages/sign-up/index.template.html',
  controller: SignUpController
});

SignUpController.$inject = ['$window'];
function SignUpController($window) {
  this.$onInit = function () {
    this.$invalid = false;
  }.bind(this);

  this.handleSubmit = function (data) {
    var items = storage.get('accounts', []);
    var login = data.login;
    var password = data.password;
    var repeatPassword = data.repeatPassword;

    var result = items.find(function (item) {
      return item.login === login;
    });

    if (result) {
      this.form.$invalid = this.form.login.$invalid = true;

      return false;
    }

    if (password !== repeatPassword) {
      this.form.$invalid = this.form.repeatPassword.$invalid = true;

      return false;
    }

    storage.set('auth', true);
    storage.set('login', login);
    storage.set('accounts', items.concat({ login, password, data: [] }));
    $window.location.href = '#!/details';

    return true;
  }.bind(this);
}
