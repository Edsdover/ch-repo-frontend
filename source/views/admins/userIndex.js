'use strict';

angular.module('chRepo')
.controller('AdminCtrl', function(User, $scope, $rootScope, $state, Cohort, sweet){

  $scope.cohortStudentIds = [];
  $scope.cohortStudents = [];
  $scope.adminShow = false;
  $scope.studentShow = false;
  $scope.isEdit = false;

  findAllUsers();
  findAllCohorts();

  function findAllUsers(){
    var admins = [];
    var students = [];
    User.findAll()
    .then(function(res){
      res.data.forEach(function(user){
        if(user.adminUser === true){
          admins.push(user);
        }else if(user.adminUser === false){
          students.push(user);
        }
        $scope.modalListStudents = res.data;
        $scope.admins = admins;
        $scope.students = students;
      });
    });
  }
  function findAllCohorts(){
    var cohorts = [];
    Cohort.findAll()
    .then(function(res){
      res.data.forEach(function(cohort){
        cohort.studentNumber = cohort.cohortStudentIds.length;
        cohorts.push(cohort);
        $scope.cohorts = cohorts;
      });
    });
  }
  $scope.toggleAdmins = function() {
    $scope.adminShow = $scope.adminShow === false ? true : false;
  };
  $scope.toggleStudents = function() {
    $scope.studentShow = $scope.studentShow === false ? true : false;
  };
  $scope.toggleCohorts = function() {
    $scope.cohortShow = $scope.cohortShow === false ? true : false;
  };
  $scope.toggleAdminOff = function(){
    var admin = this.admin;
    admin.adminUser = false;
    userSavePrivileges(admin);
  };
  $scope.toggleAdminOn = function(){
    var student = this.student;
    student.adminUser = true;
    userSavePrivileges(student);
  };
  function userSavePrivileges(user){
    User.toggleAdmin(user)
    .success(function(res){
      findAllUsers();
    });
  }
  $scope.showUser = function(){
    var studentIds = this.student._id;
    $state.go('admins.show', {studentIds:this.student._id});
  };
  $scope.showAdmin = function(){
    var studentIds = this.admin._id;
    $state.go('admins.show', {studentIds:this.admin._id});
  };
  $scope.showOneCohort = function(){
    var cohortId = this.cohort._id;
    $state.go('cohorts.show', {cohortId:cohortId});
  };
  $scope.editCohortModal = function(){
    $scope.isEdit = true;
    var modalListStudents = [];
    var modalCohortStudents = [];
    var cohortStudentIds = this.cohort.cohortStudentIds;
    var modalStudents = $scope.modalListStudents;
    $scope.modalCohort = this.cohort;
    modalStudents.forEach(function(student){
      if(cohortStudentIds.indexOf(student.id) > 0){
          modalCohortStudents.push(student);
        } else if (modalCohortStudents.indexOf(student) < 0){
          modalListStudents.push(student);
        }
      $scope.modalListStudents = modalListStudents;
      $scope.modalCohortStudents = modalCohortStudents;
    });
  };
  $('.modal').on('hide.bs.modal', function(){ // jshint ignore:line
    $scope.$apply(function () {
      $scope.isEdit = false;
      $scope.modalCohort = null;
      $scope.modalCohortStudents = [];
      findAllUsers();
      findAllCohorts();
    });
  });
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
        Cohort.findAll()
        .success(function(cohorts){
          cohorts.forEach(function(cohort){
            cohort.studentNumber = cohort.cohortStudentIds.length;
          });
          $scope.cohorts = cohorts;
         });
      });
    });
  };
  //modal functions
  $scope.addStudentToList = function(){
    var student = this.student;
    var indx = $scope.students.indexOf(student);
    $scope.cohortStudentIds.push(student.id);
    $scope.cohortStudents.push(student);
    $scope.students.splice(indx, 1);
  };
  $scope.removeStudentFromList = function(){
    var student = this.cohortStudent;
    var indx = $scope.cohortStudents.indexOf(student);
    $scope.cohortStudents.splice(indx, 1);
    $scope.students.push(this.cohortStudent);
  };
  $scope.saveNewCohort = function(obj){
    var cohort = new Object(obj);
    obj.cohortStudentIds = $scope.cohortStudentIds;
    Cohort.create(obj)
    .success(function(res){
      sweet.show('Assignment Save Success', 'Success, Your project is saved!', 'success');
      $scope.cohort = {};
      $scope.cohortStudents = [];
      Cohort.findAll()
      .success(function(res){
        $scope.cohorts = res;
      });
    })
    .error(function(error){
      console.log(error);
    });
  };
  $scope.updateCohort = function(obj){
    obj.cohortStudentIds = $scope.cohortStudentIds;
    Cohort.update(obj)
    .success(function(res){
      sweet.show('Assignment Save Success', 'Success, Your project is saved!', 'success');
      $scope.cohort = {};
      $scope.cohortStudents = [];
      Cohort.findAll()
      .success(function(res){
        $scope.cohorts = res;
      });
    })
    .error(function(error){
      console.log(error);
    });
  };
});
