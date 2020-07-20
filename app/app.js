'use strict';

angular.module('app', ['ngRoute', 'art.input', 'main.page', 'signup.page', 'details.page']).config(Config);

Config.$inject = ['$routeProvider'];
function Config($routeProvider) {
  $routeProvider
    .when('/', { template: '<main-page class="w-100 h-100 d-block"></main-page>' })
    .when('/sign-up', { template: '<sign-up-page class="w-100 h-100 d-block"></sign-up-page>' })
    .when('/details', { template: '<details-page class="w-100 h-100 d-block"></details-page>' })
    .otherwise('/');
}
