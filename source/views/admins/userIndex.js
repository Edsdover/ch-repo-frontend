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
    $scope.adminShow = $scope.adminShow === false ? true : false;
  };
  $scope.toggleStudents = function() {
    $scope.studentShow = $scope.studentShow === false ? true : false;
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
});
