'use strict';

angular.module('chRepo')
.controller('ShowUserCtrl', function($scope, $rootScope, User, sweet, $state, $sce, $timeout, SubmittedContent){

  var studentId = $state.params.studentId;
  User.findById(studentId)
  .then(function(response){
    $scope.user = response.data[0];
      SubmittedContent.findAll()
      .then(function(response){
        $scope.submissions = response.data;
        console.log($scope.submissions);
      });
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
