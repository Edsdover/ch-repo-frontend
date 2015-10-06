'use strict';

angular.module('chRepo')
.controller('HomeAssignmentCtrl', function($scope, Assignment, Project, sweet, $state, User, Intro, $sce){

  var assignmentId = $state.params.assignmentId;
  $scope.tempProject = {};

  var currentTime = Number(new Date());
  Assignment.findById(assignmentId)
  .then(function(response){
    if(Date.parse(response.data.dueDate) > currentTime){
      $scope.currentAssignment = true;
    }
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
      text: 'Once deleted the file cannot be recovered',
      type: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#DD6B55',
      confirmButtonText: 'DO IT!',
      closeOnConfirm: false
    },
    function() {
      Assignment.delete($scope.tempAssignment)
      .success(function(res){
        sweet.show('Deleted!', 'The file has been removed', 'success');
        Assignment.index()
        .success(function(assignments){
          $scope.assignments = assignments;
          $state.go('home.dashboard', {assignmentId:assignmentId});
         });
      });
    });
  };
});
