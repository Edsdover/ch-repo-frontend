'use strict';

angular.module('chRepo')
.controller('ShowOneIntroCtrl', function($scope, Intro, $window, $state){

  var introId = $state.params.introId;

  Intro.findById(introId)
  .then(function(response){
    $scope.intro = response.data;
  });

  $scope.deleteIntro = function(obj){
    Intro.delete(obj)
    .success(function(res){
      $window.swal({title: 'Intro Deleted', text: 'Intro is Deleted!', type: 'warning'});
      Intro.index()
      .success(function(intros){
        $state.go('projects.index');
      });
    });
  };

});
