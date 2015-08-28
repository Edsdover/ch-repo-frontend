'use strict';

angular.module('chRepo')
.controller('EditAssignmentCtrl', function($scope, $state, Assignment, $window){

  $scope.editItem = true;

  Assignment.findById($state.params.assignmentId)
  .then(function(response){
    $scope.assignment = response.data;
  });

  $scope.update = function(obj){
    console.log('click');
    Assignment.update(obj)
    .then(function(){
      $window.swal({title: 'Assignment Posted', text: 'Congratulations, your Assignment is now live.', type: 'success'});
      $state.go('projects.index');
    })
    .catch(function(){
      $window.swal({title: 'Assignment Save Error', text: 'Warning, there was a problem saving your assignment.', type: 'error'});
    });
  };
});
