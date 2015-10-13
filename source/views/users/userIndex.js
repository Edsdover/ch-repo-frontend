'use strict';

angular.module('chRepo')
.controller('UserCtrl', function(User, $scope, $state, Cohort, sweet){

  $scope.cohortStudentIds = [];
  $scope.cohortStudents = [];
  $scope.modalCohortStudents = [];
  $scope.cohortStudentIds = [];
  $scope.adminShow = false;
  $scope.studentShow = false;
  $scope.cohortShow = true;
  $scope.isEdit = false;
  $scope.areStudents = false;

  findAllUsers();
  findAllCohorts();

  function findAllUsers(){
    var admins = [],
        students = [];
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
    Cohort.findAll()
    .then(function(res){
      res.data.forEach(function(cohort){
        cohort.studentNumber = cohort.cohortStudentIds.length;
      });
      $scope.cohorts = res.data;
    });
  }
  $scope.saveNewCohort = function(obj){
    var cohort = new Object(obj);
    obj.cohortStudentIds = $scope.cohortStudentIds;
    Cohort.create(obj)
    .success(function(res){
      sweet.show('Cohort Save Success', 'Success, Your cohort is saved!', 'success');
      findAllCohorts();
    })
    .error(function(error){
      console.log(error);
    });
  };
  $scope.editCohortModal = function(){
    $scope.isEdit = true;
    var modalListStudents = [],
        modalCohortStudents = [];
    $scope.cohortStudentIds = this.cohort.cohortStudentIds;
    var modalStudents = $scope.modalListStudents;
    $scope.modalCohort = this.cohort;
    $scope.modalCohort.cohortName = this.cohort.cohortName;
    modalStudents.forEach(function(student){
      if($scope.cohortStudentIds.indexOf(student.id) > -1){
          modalCohortStudents.push(student);
        } else if (modalCohortStudents.indexOf(student) < 0){
          modalListStudents.push(student);
        }
      $scope.modalListStudents = modalListStudents;
      $scope.modalCohortStudents = modalCohortStudents;
    });
  };
  $scope.editUserModal = function(){
    $scope.user = this.$parent.student;
  };
  $scope.editAdminModal = function(){
    $scope.user = this.$parent.admin;
  };
  $scope.updateCohort = function(obj){
    obj.cohortStudentIds = $scope.cohortStudentIds;
    Cohort.update(obj)
    .success(function() {
      findAllCohorts();
      sweet.show('Cohort Edit Success', 'Success, Your cohort is updated!', 'success');
    })
    .error(function(error){
      console.log(error);
    });
  };
  $scope.updateUser = function(user){
    User.update(user)
    .success(function(data){
    })
    .error(function(error){
      console.log(error);
    });
  };
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
  $scope.addStudentToList = function(){
    var modalListStudent = this.modalListStudent,
        indx = $scope.modalListStudents.indexOf(modalListStudent);
    $scope.cohortStudentIds.push(modalListStudent.id);
    $scope.modalCohortStudents.push(modalListStudent);
    $scope.modalListStudents.splice(indx, 1);
    $scope.areStudents=true;
  };
  $scope.removeStudentFromList = function(){
    var modalCohortStudent = this.modalCohortStudent,
        indx = $scope.modalCohortStudents.indexOf(modalCohortStudent),
        idIndx = $scope.cohortStudentIds.indexOf(modalCohortStudent);
    $scope.modalCohortStudents.splice(indx, 1);
    $scope.cohortStudentIds.splice(idIndx, 1);
    $scope.modalListStudents.push(modalCohortStudent);
    if ($scope.modalListStudent === 0) {
      $scope.areStudents=false;
    }
  };
  $scope.toggleAdmins = function() {
    $scope.adminShow = $scope.adminShow === false ? true : false;
  };
  $scope.toggleStudents = function() {
    $scope.studentShow = $scope.studentShow === false ? true : false;
  };
  $scope.toggleCohorts = function() {
    $scope.cohortShow = $scope.cohortShow === false ? true : false;
  };
  $scope.toggleAdmin = function(){
    if(this.admin){
      userSavePrivileges(this.admin);
    }else if(this.student){
      userSavePrivileges(this.student);
    }
  };
  function userSavePrivileges(user){
    User.toggleAdmin(user)
    .then(function(res){
      findAllUsers();
    });
  }
  $scope.showUser = function(){
    var studentId = this.student._id;
    $state.go('users.show', {studentId : this.student._id});
  };
  $scope.showAdmin = function(){
    var studentId = this.admin._id;
    $state.go('users.show', {studentId : this.admin._id});
  };
  $('.modal').on('hide.bs.modal', function(){ // jshint ignore:line
    $scope.$apply(function () {
      $scope.isEdit = false;
      $scope.modalCohort = null;
      $scope.modalCohortStudents = [];
      $scope.cohortStudentIds = [];
      $scope.searchStudents = null;
      $scope.searchAddedStudents = null;
      findAllUsers();
      findAllCohorts();
    });
  });
});
