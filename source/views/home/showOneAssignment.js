'use strict';

angular.module('chRepo')
.controller('HomeAssignmentCtrl', function($scope, Assignment, Project, sweet, $state){

  var assignmentId = $state.params.assignmentId;
  $scope.tempProject = {};


  Assignment.findById(assignmentId)
  .then(function(response){
    console.log(response, "Here ya go");
    $scope.assignment = response.data;

    var projectId = response.data.projectId;
    Project.findById(projectId)
    .then(function(response){
      console.log(response, "And here");
      $scope.project = response.data;
    });

  });

});
