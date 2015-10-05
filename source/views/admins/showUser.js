'use strict';

angular.module('chRepo')
.controller('userCtrl', function($scope, User, sweet, $state, $sce, $timeout){

  var studentIds = $state.params.studentIds;
console.log("studentIds", studentIds);
  // $scope.user = {};

  User.findById(studentIds)
  .then(function(response){
    console.log("does it work", studentIds);
    $scope.user = response.data[0];
    console.log("response", response);
  });
});
