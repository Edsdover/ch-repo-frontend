'use strict';

angular.module('chRepo')
.controller('ShowOneIntroCtrl', function($scope, Intro, $window, $state, sweet){

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
  $scope.updateIntro = function(obj){
    Intro.update(obj)
    .then(function(){
      Intro.index()
      .success(function(intros){
        $scope.intros = intros;
      });
      sweet.show('Check', 'Your Intro is saved!', 'success');
      $('#editIntroModal').modal('hide'); // jshint ignore:line
    })
    .catch(function(err){
      sweet.show('Bugger', 'Your Intro did not save.', 'error');
      console.log(err);
    });
  };

});
