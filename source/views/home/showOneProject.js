'use strict';

angular.module('chRepo')
.controller('HomeAssignmentCtrl', function($scope, Assignment, Project, sweet, $state){

  var projectId = $state.params.projectId;
  $scope.tempProject = {};

  Project.findById(projectId)
  .then(function(response){
    $scope.project = response.data;
  });
  Assignment.findById(projectId)
  .then(function(response){
    $scope.assignment = response.data;
  });

});
