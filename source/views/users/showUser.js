'use strict';

angular.module('chRepo')
.controller('ShowUserCtrl', function($scope, User, sweet, $state, $sce, $timeout){

  var studentId = $state.params.studentId;
  User.findById(studentId)
  .then(function(response){
    $scope.user = response.data[0];
  });

  $scope.updateUser = function(user){
    User.update(user)
    .success(function(data){
      sweet.show('Check', 'User is updated!', 'success');
    })
    .error(function(error){
      console.log(error);
    });
  };

});
