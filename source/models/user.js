'use strict';

angular.module('chRepo')
.factory('User', function($http, $rootScope, urls){
  var User = {};
  var apiUrl = urls.apiUrl;

  User.register = function(user){
    return $rootScope.afAuth.$createUser(user);
  };
  User.oauth = function(provider){
    return $rootScope.afAuth.$authWithOAuthPopup(provider);
  };
  User.logout = function(){
    return $rootScope.afAuth.$unauth();
  };
  User.initialize = function(user){
    return $http.post(apiUrl + '/users', user);
  };
  User.findAll = function(){
    return $http.get(apiUrl + '/users');
  };
  User.findById = function(studentId){
    return $http.get(apiUrl + '/users/' + studentId);
  };
  User.toggleAdmin = function(user){
    return $http.put(apiUrl + '/users', user);
  };
  User.update = function(user){
    return $http.put(apiUrl + '/users/edit', user);
  };
  return User;
});
