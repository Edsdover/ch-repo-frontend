'use strict';

angular.module('chRepo')
.controller('NavCtrl', function($rootScope, $scope, $state, $firebaseObject, $http, User){

  $scope.oauth = function(provider){
    User.oauth(provider)
    .then(function(response){
      $rootScope.displayName = response.github.displayName;
      $state.go('home.dashboard');
    });
  };

  function getDisplayName(data){
    return data.github.displayName;
  }

  $scope.afAuth.$onAuth(function(data){
    console.log('data, nav.js:', data.github);
    if(data.github.email === 'misankovich@gmail.com') {
      data.github.cachedUserProfile.site_admin = true;
      $rootScope.activeUser = data;
      $rootScope.displayName = data.github.displayName;
      $http.defaults.headers.common.Authorization = 'Bearer ' + data.token;
      User.initialize(data).then(function(response){
        $rootScope.activeUser.mongoId = response.data;
        adminAssignment();
      });
    } else if(data){
      $rootScope.activeUser = data;
      $rootScope.displayName = data.github.displayName;
      $http.defaults.headers.common.Authorization = 'Bearer ' + data.token;
      User.initialize(data).then(function(response){
        $rootScope.activeUser.mongoId = response.data;
        adminAssignment();
      });
    }else{
      $rootScope.activeUser = null;
      $rootScope.displayName = null;
      $http.defaults.headers.common.Authorization = null;
    }
  });
  var adminAssignment = function(){
    $rootScope.adminUser = $rootScope.activeUser.github.cachedUserProfile.site_admin ? true : false;
    // $rootScope.adminUser = $rootScope.activeUser.mongoId.adminUser ? true : false;
  };
  $scope.logout = function(){
    User.logout();
  };
});
