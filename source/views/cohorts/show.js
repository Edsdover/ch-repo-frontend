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
    // console.log(studentIds);
    var students = [];
    User.findAll()
    .then(function(res){
      res.data.forEach(function(user){
        // console.log(user.id);
        if((studentIds).indexOf(user.id) > -1){
          students.push(user);
        }
        $scope.students = students;
      });
      console.log('students', students);
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
