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

  $scope.deleteAssignmentConfirm = function(assignment){
    $scope.tempAssignment = assignment;
    sweet.show({
        title: 'Delete? Really?',
        text: 'This will blow this project back to Nam',
        type: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#DD6B55',
        confirmButtonText: 'DO IT!',
        closeOnConfirm: false
    },
    function() {
      Assignment.delete($scope.tempAssignment)
      .success(function(res){
        sweet.show('Deleted!', 'The file has been owned by a swift roundhouse!', 'success');
        Assignment.index()
        .success(function(assignments){
          $scope.assignments = assignments;
          $state.go('home.dashboard', {assignmentId:assignmentId});
         });
      });
    });
  };

});
