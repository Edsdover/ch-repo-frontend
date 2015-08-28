'use strict';

angular.module('chRepo')
.controller('DashboardCtrl', function($rootScope, $scope, Cohort, Project, User, Intro, Assignment, sweet, $state, $http){

  $scope.tempProject = {};
  $scope.tempIntro = {};

  Assignment.index()
  .success(function(assignments){
    $scope.assignments = assignments;
    console.log('$scope.assignments', $scope.assignments);
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
    $state.go('home.show', {assignmentId: assignmentId});
    console.log(assignmentId);
  };
  $scope.viewOneIntro = function(introId){
    console.log('introId', introId);
    $state.go('intros.show', {introId:introId});
  };

});
