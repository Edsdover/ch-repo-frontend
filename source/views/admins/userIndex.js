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
        if(user.adminUser == true){
          admins.push(user);
        }else if(user.adminUser == false){
          students.push(user);
        }
        $scope.admins = admins;
        $scope.students = students;
      });
    });
  }
  $scope.toggleAdminOff = function(){
    var admin = this.admin;
    $rootScope.activeUser.adminUser = false;
    console.log($rootScope.activeUser.adminUser);
    User.toggleAdmin(admin)
    .success(function(res){
      findAllUsers();
    });
  };
  $scope.toggleAdminOn = function(){
    var student = this.student;
    $rootScope.activeUser.adminUser = true;
    console.log($rootScope.activeUser.adminUser);
    User.toggleAdmin(student)
    .success(function(res){
      findAllUsers();
    });
  };
});
