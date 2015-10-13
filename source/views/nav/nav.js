'use strict';

angular.module('chRepo')
.controller('NavCtrl', function($rootScope, $scope, $firebaseObject, $http, User, $state){

  $scope.oauth = function(provider){
    User.oauth(provider)
    .then(function(response){
      $rootScope.displayName = response.github.displayName;
    });
  };
  $scope.afAuth.$onAuth(function(data){
    if(data && data.github.email === 'Edsdover@gmail.com' || 'misankovich@gmail.com') {
      $http.defaults.headers.common.Authorization = 'Bearer ' + data.token;
      updateUser(data);
    }else if(data){
      $http.defaults.headers.common.Authorization = 'Bearer ' + data.token;
      location.reload(); // jshint ignore:line
      updateUser(data);
    }else{
      $rootScope.activeUser = null;
      $rootScope.displayName = null;
      $http.defaults.headers.common.Authorization = null;
    }
  });
  function updateUser(data){
    User.initialize(data).then(function(response){
      $rootScope.activeUser = data;
      $rootScope.displayName = data.github.displayName;
      $rootScope.activeUser.mongoId = response.data;
      $rootScope.adminUser = $rootScope.activeUser.mongoId.adminUser ? true : false;
    });
  }
  $scope.logout = function(){
    User.logout();
    location.reload(); // jshint ignore:line
  };
});
