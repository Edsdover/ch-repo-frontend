'use strict';

angular.module('chRepo')
.controller('ShowOneProjectCtrl', function($scope, Project, sweet, $state){

  var projectId = $state.params.projectId;
  $scope.tempProject = {};

  Project.findById(projectId)
  .then(function(response){
    $scope.project = response.data;
  });

  $scope.deleteProject = function(project){
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
        $state.go('projects.index');
      });
    });
  };
});
