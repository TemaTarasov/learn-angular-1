'use strict';

angular.module('main.page', []).component('mainPage', {
  templateUrl: 'pages/main/index.template.html',
  controller: MainController
});

MainController.$invalid = ['$window'];
function MainController($window) {
  this.handleSubmit = function (data) {
    var items = storage.get('accounts', []);
    items = Array.isArray(items) ? items : [];

    var login = data.login;
    var password = data.password;
    var result = items.find(function (item) {
      return item.login === login && item.password === password;
    });

    if (result) {
      storage.set('auth', true);
      storage.set('login', result.login);
      $window.location.href = '#!/details';

      return true;
    }

    this.form.$invalid = this.form.login.$invalid = this.form.password.$invalid = true;

    return false;
  }.bind(this);
}
