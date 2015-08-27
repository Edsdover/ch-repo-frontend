'use strict';

angular.module('chRepo')
.controller('HomeAssignmentCtrl', function($scope, Assignment, Project, sweet, $state){

  var assignmentId = $state.params.assignmentId;
  // var projectId = $state.params.projectId;
  $scope.tempProject = {};

  // Project.findById(projectId)
  // .then(function(response){
  //   $scope.project = response.data;
  // });
  Assignment.findById(assignmentId)
  .then(function(response){
    console.log(response, "Here ya go");
    $scope.assignment = response.data;
  });

});
