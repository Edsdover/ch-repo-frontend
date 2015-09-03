// if active user show dashboard
//
// else big logo thing

'use strict';

angular.module('chRepo')
.controller('DashboardCtrl', function($rootScope, $scope, Cohort, Project, User, Intro, Assignment, sweet, $state, $http){

  $scope.tempProject = {};
  $scope.tempIntro = {};
  var currentAssignments = [];
  var pastAssignments = [];


  Assignment.index()
  .success(function(assignments){
    var currentTime = Number(new Date());
    assignments.forEach(function(assignment){
      if(Date.parse(assignment.dueDate) > currentTime){
        currentAssignments.push(assignment);
      }else{
        pastAssignments.push(assignment);
      }
      $scope.currentAssignments = currentAssignments;
      $scope.pastAssignments = pastAssignments;
    });
  });

  Project.index()
  .success(function(projects){
    $scope.projects = projects;
  });
  Cohort.index()
  .success(function(cohorts){
    $scope.cohorts = cohorts;
  });
  Intro.index()
  .success(function(intros){
    $scope.intros = intros;
  });

  $scope.viewOneAssignment = function(assignmentId){
    console.log('assignmentId', assignmentId);
    $state.go('home.show', {assignmentId:assignmentId});
  };
  $scope.viewOneIntro = function(introId){
    console.log('introId', introId);
    $state.go('intros.show', {introId:introId});
  };

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
         });
      });
    });
  };

});
