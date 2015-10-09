'use strict';

angular.module('chRepo')
.controller('userCtrl', function($scope, User, sweet, $state, $sce, $timeout){

  var studentId = $state.params.studentId;
  User.findById(studentId)
  .then(function(response){
    $scope.user = response.data[0];
  });
});
