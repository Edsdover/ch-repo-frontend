'use strict';

angular.module('chRepo')
.controller('HomeAssignmentCtrl', function($scope, Assignment, Project, sweet, $state, User, Intro, $sce){

  var assignmentId = $state.params.assignmentId;
  $scope.tempProject = {};

  Assignment.findById(assignmentId)
  .then(function(response){
    $scope.assignment = response.data;
    Project.findById(response.data.projectId)
    .then(function(response){
      $scope.iframeURL = $sce.trustAsHtml(response.data.notes);
      $scope.project = response.data;
    });
    Intro.findById(response.data.introId)
    .then(function(response){
      $scope.intro = response.data;
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
