'use strict';

angular.module('chRepo')
.controller('userCtrl', function($scope, User, sweet, $state, $sce, $timeout){

  var studentIds = $state.params.studentIds;

  User.findById(studentIds)
  .then(function(response){
    $scope.user = response.data[0];
  });
});
