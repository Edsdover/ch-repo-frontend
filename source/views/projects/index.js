'use strict';

angular.module('chRepo')
.controller('IndexProjectCtrl', function($rootScope, $scope, Project, Intro, sweet, $state, User, Cohort, Assignment){

  $scope.tempProject = {};
  $scope.tempIntro = {};

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
  $scope.submit = function(obj){
    obj.projectId = $scope.selectedProject._id;
    obj.projectName = $scope.selectedProject.name;
    obj.introId = $scope.selectedIntro._id;
    Assignment.create(obj)
    .success(function(data){
      console.log('data', data);
      sweet.show('Assignment Save Success', 'Success, Your project is saved!', 'success');
      $scope.assignment = {};
    })
    .error(function(error){
      console.log(error);
    });
  };
  $scope.deleteProjectConfirm = function(project){
    $scope.tempProject = project;
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
      Project.delete($scope.tempProject)
      .success(function(res){
        sweet.show('Deleted!', 'The file has been owned by a swift roundhouse!', 'success');
        Project.index()
        .success(function(projects){
          $scope.projects = projects;
         });
      });
    });
  };
  $scope.deleteIntro = function(intro){
    $scope.tempIntro = intro;
    sweet.show({
        title: 'Delete? Really?',
        text: 'This will blow this intro back to Nam',
        type: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#DD6B55',
        confirmButtonText: 'DO IT!',
        closeOnConfirm: false
    },
    function() {
      Intro.delete($scope.tempIntro)
      .success(function(res){
        sweet.show('Deleted!', 'The file has been owned by a swift roundhouse!', 'success');
        Intro.index()
        .success(function(intros){
          $scope.intros = intros;
         });
      });
    });
  };
  $scope.viewOneProject = function(projectId){
    $state.go('projects.show', {projectId:projectId});
  };
  $scope.viewOneIntro = function(introId){
    $state.go('intros.show', {introId:introId});
  };
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
});
