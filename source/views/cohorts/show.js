'use strict';

angular.module('chRepo')
.controller('ShowOneCohortCtrl', function($scope, Cohort, $state, sweet, User){

  var cohortId = $state.params.cohortId;
  $scope.cohortStudentIds = [];
  $scope.cohortStudents = [];
  $scope.students = [];

  Cohort.findById(cohortId)
  .then(function(response){
    $scope.cohort = response.data;
    var studentIds = response.data.cohortStudentIds;
    var students = [];
    User.findAll()
    .then(function(res){
      res.data.forEach(function(user){
        if((studentIds).indexOf(user.id) > -1){
          students.push(user);
        }
        $scope.students = students;
      });
    });
  });
});
