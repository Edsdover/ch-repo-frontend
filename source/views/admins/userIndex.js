'use strict';

angular.module('chRepo')
.controller('AdminCtrl', function(User, $scope, $rootScope){

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
  $scope.toggleAdminOff = function(){
    console.log(this.admin);
    var admin = this.admin;
    admin.adminUser = false;
    User.toggleAdmin(admin)
    .success(function(res){
      console.log('res', res);
      findAllUsers();
    });
  };
  $scope.toggleAdminOn = function(){
    console.log(this.student);
    var student = this.student;
    student.adminUser = true;
    User.toggleAdmin(student)
    .success(function(res){
      console.log('res', res);
      findAllUsers();
    });
  };
});
