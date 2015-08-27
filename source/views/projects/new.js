'use strict';

angular.module('chRepo')
.controller('NewProjectCtrl', function($scope, Project, sweet){

  $scope.newItem = true;

  $scope.submit = function(obj){
    Project.create(obj)
    .success(function(data){
      sweet.show('Project Save Success', 'Success, Your project is saved!', 'success');
      $scope.project = {};
    })
    .error(function(error){
      console.log(error);
    });
  };
});
