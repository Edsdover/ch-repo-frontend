'use strict';

angular.module('chRepo')
.factory('User', function($http, $rootScope, urls){
  var User = {};
  var apiUrl = urls.apiUrl;

  User.oauth = function(provider){
    return $rootScope.afAuth.$authWithOAuthPopup(provider);
  };
  User.initialize = function(user){
    return $http.post(apiUrl + '/users', user.github);
  };
  User.register = function(user){
    return $rootScope.afAuth.$createUser(user);
  };
  User.logout = function(){
    return $rootScope.afAuth.$unauth();
  };
  User.findAll = function(){
    return $http.get(apiUrl + '/users');
  };
  User.findById = function(studentIds){
    return $http.get(apiUrl + '/users/'+ studentIds);
  };
  User.toggleAdmin = function(user){
    return $http.put(apiUrl + '/users', user);
  };
  return User;
});
