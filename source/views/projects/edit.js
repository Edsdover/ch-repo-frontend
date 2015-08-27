'use strict';

angular.module('chRepo')
.controller('EditProjectCtrl', function($scope, $state, Project, $window){

  $scope.editItem = true;

  Project.findById($state.params.projectId)
  .then(function(response){
    $scope.project = response.data;
  });

  $scope.update = function(obj){
    Project.update(obj)
    .then(function(){
      $window.swal({title: 'Project Posted', text: 'Congratulations, your Project is now live.', type: 'success'});
      $state.go('projects.index');
    })
    .catch(function(){
      $window.swal({title: 'Project Save Error', text: 'Warning, there was a problem saving your project.', type: 'error'});
    });
  };
});
