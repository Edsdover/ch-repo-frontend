'use strict';

angular.module('chRepo')
.controller('ShowOneCohortCtrl', function($scope, Cohort, $state, sweet, User){

  var cohortId = $state.params.cohortId;

  Cohort.findById(cohortId)
  .then(function(response){
    $scope.cohort = response.data;
    var studentIds = response.data.cohortStudentIds;
    console.log(studentIds);
    User.findById(studentIds)
    .then(function(response){
      console.log(response.data);
    });
  });

  // $scope.deleteProject = function(obj){
  //   Project.delete(obj)
  //   .success(function(res){
  //     sweet.swal({title: 'Project Deleted', text: 'Project is Deleted!', type: 'warning'});
  //     Project.index()
  //     .success(function(projects){
  //       $state.go('projects.index');
  //     });
  //   });
  // };

});
