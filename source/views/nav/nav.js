'use strict';

angular.module('chRepo')
.controller('NavCtrl', function($rootScope, $scope, $state, $firebaseObject, $http, User){

  $scope.oauth = function(provider){
    User.oauth(provider)
    .then(function(response){
      $rootScope.displayName = response.github.displayName;
      location.reload(); // jshint ignore:line
    });
  };
  $scope.afAuth.$onAuth(function(data){
    if(data.github.email === "misankovich@gmail.com") {
      data.github.cachedUserProfile.site_admin = true;
      $rootScope.activeUser = data;
      $rootScope.displayName = data.github.displayName;
      $http.defaults.headers.common.Authorization = 'Bearer ' + data.token;
      updateUser(data);
    } else if(data){
      $rootScope.activeUser = data;
      $rootScope.displayName = data.github.displayName;
      $http.defaults.headers.common.Authorization = 'Bearer ' + data.token;
      updateUser(data);
    }else{
      $rootScope.activeUser = null;
      $rootScope.displayName = null;
      $http.defaults.headers.common.Authorization = null;
    }
  });
  function updateUser(data){
    User.initialize(data).then(function(response){
      $rootScope.activeUser.mongoId = response.data;
      $rootScope.adminUser = $rootScope.activeUser.github.cachedUserProfile.site_admin ? true : false;
      $rootScope.adminUser = $rootScope.activeUser.mongoId.adminUser ? true : false;
    });
  }
  $scope.logout = function(){
    User.logout()
    .then(function(){
      location.reload(); // jshint ignore:line
    });
  };
});
