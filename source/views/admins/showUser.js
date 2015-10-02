'use strict';

angular.module('chRepo')
.controller('userCtrl', function($scope, User, sweet, $state, $sce){

  var studentIds = $state.params.studentIds;
  $scope.user = {};

  User.findById(studentIds)
  .then(function(response){
    $scope.user = response.data;
  });
});
