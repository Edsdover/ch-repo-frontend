'use strict';

angular.module('chRepo')
.controller('EditAssignmentCtrl', function($scope, $state, Assignment, Project, Cohort, Intro, $window){

  $scope.tempProject = {};
  $scope.tempIntro = {};
  $scope.editItem = true;

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

  Assignment.findById($state.params.assignmentId)
  .then(function(response){
    $scope.assignment = response.data;
  });
  $scope.toggleProjectOff = function(){
    var project = $scope.selectedProject;
    $scope.projects.push(project);
    $scope.selectedProject = null;
  };
  $scope.toggleProjectOn = function(index){
    var project = this.project;
    var indx = $scope.projects.indexOf(this)+1;
    $scope.selectedProject = project;
    $scope.projects.splice(indx, 1);
  };
  $scope.selectedIntro = function(index){
    var intro = this.assignment.intro;
    var indx = $scope.intros.indexOf(this)+1;
    $scope.selectedIntro = intro;
  };

  $scope.update = function(obj){
    console.log('click');
    Assignment.update(obj)
    .then(function(){
      $window.swal({title: 'Assignment Posted', text: 'Congratulations, your Assignment is now live.', type: 'success'});
      $state.go('home.dashboard');
    })
    .catch(function(){
      $window.swal({title: 'Assignment Save Error', text: 'Warning, there was a problem saving your assignment.', type: 'error'});
    });
  };
});
