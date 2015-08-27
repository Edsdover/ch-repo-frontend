'use strict';

angular.module('chRepo')
.controller('EditIntroCtrl', function($scope, $state, Intro, $window){

  $scope.editItem = true;

  Intro.findById($state.params.introId)
  .then(function(response){
    $scope.intro = response.data;
  });

  $scope.update = function(obj){
    console.log('click');
    Intro.update(obj)
    .then(function(){
      $window.swal({title: 'Intro Posted', text: 'Congratulations, your Intro is now live.', type: 'success'});
      $state.go('projects.index');
    })
    .catch(function(){
      $window.swal({title: 'Intro Save Error', text: 'Warning, there was a problem saving your intro.', type: 'error'});
    });
  };
});
