'use strict';

angular.module('chRepo')
.controller('ShowOneProjectCtrl', function($scope, Project, sweet, $state){

  var projectId = $state.params.projectId;
  $scope.tempProject = {};

  Project.findById(projectId)
  .then(function(response){
    $scope.project = response.data;
  });
  $scope.updateProject = function(obj){
    Project.update(obj)
    .then(function(){
      Project.index()
      .success(function(projects){
        $scope.projects = projects;
      });
      sweet.show('Check', 'Your Project is saved!', 'success');
      $('#editProjectModal').modal('hide'); // jshint ignore:line
    })
    .catch(function(){
      sweet.show('Bugger', 'Your Project did not save.', 'error');
    });
  };
  $scope.deleteProject = function(project){
    $scope.tempProject = project;
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
      Project.delete($scope.tempProject)
      .success(function(res){
        sweet.show('Deleted!', 'The file has been removed', 'success');
        $state.go('assignments.index');
      });
    });
  };
});
