'use strict';

angular.module('chRepo')
.controller('AdminCtrl', function(User, $scope, sweet){

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
    console.log($rootScope.adminUser);
    User.toggleAdmin(admin)
    .success(function(res){
      findAllUsers();
    });
  };
  $scope.toggleAdminOn = function(){
    var student = this.student;
    console.log($rootScope.adminUser);
    User.toggleAdmin(student)
    .success(function(res){
      findAllUsers();
    });
  };
  // sweet.show({
  //     title: 'Demote?',
  //     text: 'Are you sure you want to revoke admin rights?',
  //     type: 'warning',
  //     showCancelButton: true,
  //     confirmButtonColor: '#DD6B55',
  //     confirmButtonText: 'Yes, demote them ALL!',
  //     closeOnConfirm: true
  // },
  // function() {
  //   sweet.show('Demoted!', 'These users have been demoted like scumb!', 'success');
  //   console.log($scope.selection);
  // });
});
