'use strict';

angular.module('chRepo')
.controller('AdminCtrl', function(User, $scope, $rootScope, $state){

  $scope.adminShow = false;
  $scope.studentShow = false;

  findAllUsers();

  function findAllUsers(){
    var admins = [];
    var students = [];
    User.findAll()
    .then(function(res){
      res.data.forEach(function(user){
        if(user.adminUser == true){ // jshint ignore:line
          admins.push(user);
        }else if(user.adminUser == false){ // jshint ignore:line
          students.push(user);
        }
        $scope.admins = admins;
        $scope.students = students;
      });
    });
  }

  $scope.toggleAdmins = function() {
    if ($scope.adminShow === false) {
      $scope.adminShow = true;
    }
    else {
      $scope.adminShow = false;
    }
  };
  $scope.toggleStudents = function() {
    if ($scope.studentShow === false) {
      $scope.studentShow = true;
    }
    else {
      $scope.studentShow = false;
    }
  };

  $scope.toggleAdminOff = function(){
    var admin = this.admin;
    admin.adminUser = false;
    User.toggleAdmin(admin)
    .success(function(res){
      findAllUsers();
    });
  };
  $scope.toggleAdminOn = function(){
    var student = this.student;
    student.adminUser = true;
    User.toggleAdmin(student)
    .success(function(res){
      findAllUsers();
    });
  };
  $scope.showUser = function(){
    console.log(this.student._id);
    var studentIds = this.student._id;
    $state.go('admins.show', {studentIds: this.student._id});
  };
  $scope.showAdmin = function(){
    // console.log(this.student._id);
    var studentIds = this.admin._id;
    $state.go('admins.show', {studentIds:this.admin._id});
  };
});
