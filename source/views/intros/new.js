'use strict';

angular.module('chRepo')
.controller('NewIntroCtrl', function($scope, Intro, $window){

  $scope.newItem = true;

  $scope.submit = function(obj){
    Intro.create(obj)
    .success(function(data){
      $window.swal({title: 'Intro Save Success', text: 'Success, Your intro is saved!', type: 'success'});
      $scope.intro = {};
    })
    .error(function(error){
      console.log(error);
    });
  };
});
