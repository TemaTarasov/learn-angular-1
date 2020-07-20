'use strict';

angular.module('details.page', []).component('detailsPage', {
  templateUrl: 'pages/details/index.template.html',
  controller: DetailsController
});

DetailsController.$inject = ['$window'];
function DetailsController($window) {
  this.$onInit = function () {
    if (!storage.get('auth', false)) {
      $window.location.href = '#!/';

      return false;
    }

    this.name = storage.get('login');
    this.data = (
      storage.get('accounts', []).find(
        function (item) {
          return item.login === this.name;
        }.bind(this)
      ) || { data: [] }
    ).data;
    this.initial = _.cloneDeep(this.data);

    this.cancelBtn = _.isEqual(this.initial, this.data);

    return true;
  }.bind(this);

  this.handleLogout = function ($event) {
    $event.preventDefault();

    storage.remove('auth');
    storage.remove('login');
    $window.location.href = '#!/';
  }.bind(this);

  this.handleClick = function () {
    this.data.push({ login: '', password: '' });
  }.bind(this);

  this.handleRemove = function (key) {
    this.data = this.data.filter(function (_, index) {
      return index !== key;
    });
  }.bind(this);

  this.getError = function ($form, key, name) {
    return _.get($form[key + '.' + name], '$invalid');
  }.bind(this);

  this.getCancelDisabled = function (initial, data) {
    return _.isEqual(initial, data);
  }.bind(this);

  this.getSaveDisabled = function (data) {
    return (
      _.isEqual(data, this.initial) ||
      _.uniqBy(data, 'login').length !== data.length ||
      data.some(function (item) {
        return _.isEmpty(item.login) || _.isEmpty(item.password);
      })
    );
  }.bind(this);

  this.handleCancel = function () {
    var result = _.cloneDeep(this.initial);
    this.data = result;
  }.bind(this);

  this.handleSave = function (data) {
    var accounts = storage.get('accounts', []);
    var index = accounts.findIndex(function (item) {
      return item.login === this.name;
    }.bind(this));
    var result = _.cloneDeep(data);

    this.initial = result;
    this.data = result;

    accounts[index].data = result;
    storage.set('accounts', accounts);
  }.bind(this);
}
