'use strict';

angular.module('chRepo')
.controller('NewCohortCtrl', function($scope, Cohort, User, sweet, $state){

  $scope.newItem = true;
  $scope.cohortStudentIds = [];
  $scope.cohortStudents = [];
  $scope.students = [];
  $scope.tempCohort = {};
  findAllUsers();

  Cohort.index()
  .success(function(res){
    $scope.cohorts = res;
  });

  function findAllUsers(){
    var students = [];
    User.findAll()
    .then(function(res){
      res.data.forEach(function(user){
        if(user.adminUser === false){
          students.push(user);
        }
        $scope.students = students;
      });
    });
  }
  $scope.deleteCohort = function(){
    var cohort = this.cohort;
    $scope.tempCohort = cohort;
    sweet.show({
        title: 'Delete? Really?',
        text: 'This will blow this cohort back to Nam',
        type: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#DD6B55',
        confirmButtonText: 'DO IT!',
        closeOnConfirm: false
    },
    function() {
      Cohort.delete($scope.tempCohort)
      .success(function(res){
        sweet.show('Deleted!', 'The file has been owned by a swift roundhouse!', 'success');
        Cohort.index()
        .success(function(cohorts){
          $scope.cohorts = cohorts;
         });
      });
    });
  };
  $scope.editCohort = function(){
    $scope.cohort = this.cohort;
    $scope.cohortStudents = this.cohort.cohortStudents;
    console.log(this.cohort);
    console.log($scope.cohortStudents);
  };
  $scope.toggleCohortOn = function(){
    var student = this.student;
    var indx = $scope.students.indexOf(student);
    console.log(indx);
    $scope.cohortStudentIds.push(student.id);
    $scope.cohortStudents.push(student);
    $scope.students.splice(indx, 1);
    console.log($scope.students);
  };
  $scope.toggleCohortOff = function(){
    var student = this.cohortStudent;
    var indx = $scope.cohortStudents.indexOf(student);
    console.log(indx);
    $scope.cohortStudents.splice(indx, 1);
    $scope.students.push(this.cohortStudent);
  };
  $scope.update = function(obj){
    var cohort = new Object(obj);
    obj.cohortStudentIds = $scope.cohortStudentIds;
    Cohort.create(obj)
    .success(function(res){
      sweet.show('Assignment Save Success', 'Success, Your project is saved!', 'success');
      $scope.cohort = {};
      $scope.cohortStudents = [];
      Cohort.index()
      .success(function(res){
        $scope.cohorts = res;
      });
    })
    .error(function(error){
      console.log(error);
    });
  };
  $scope.showOneCohort = function(){
    var cohortId = this.cohort._id;
    $state.go('cohorts.show', {cohortId:cohortId});
  };
});
