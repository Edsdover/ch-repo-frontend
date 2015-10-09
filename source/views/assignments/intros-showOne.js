'use strict';

angular.module('chRepo')
.controller('ShowOneIntroCtrl', function($scope, Intro, $state, sweet){

  var introId = $state.params.introId;
  $scope.tempIntro = {};

  Intro.findById(introId)
  .then(function(response){
    $scope.intro = response.data;
  });

  $scope.deleteIntro = function(obj){
    $scope.tempIntro = obj;
    sweet.show({
      title: 'Delete? Really?',
      text: 'Once deleted the file cannot be recovered',
      type: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#DD6B55',
      confirmButtonText: 'DO IT!',
      closeOnConfirm: false
    },
    function() {
      Intro.delete($scope.tempIntro)
      .success(function(res){
        sweet.show('Deleted!', 'The file has been removed', 'success');
        $state.go('assignments.index');
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
