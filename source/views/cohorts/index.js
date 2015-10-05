'use strict';

angular.module('chRepo')
.controller('IndexCohortCtrl', function($scope, Cohort, User, sweet, $state){

  Cohort.index()
  .success(function(res){
    res.forEach(function(cohort){
      cohort.studentNumber = cohort.cohortStudentIds.length;
    });
    $scope.cohorts = res;
  });
  $scope.deleteCohort = function(){
    var cohort = this.cohort;
    $scope.tempCohort = cohort;
    sweet.show({
      title: 'Delete? Really?',
      text: 'This will blow this cohort back to Nam',
      type: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#DD6B55',
      confirmButtonText: 'DO IT!',
      closeOnConfirm: false
    },
    function() {
      Cohort.delete($scope.tempCohort)
      .success(function(res){
        sweet.show('Deleted!', 'The file has been owned by a swift roundhouse!', 'success');
        Cohort.index()
        .success(function(cohorts){
          cohorts.forEach(function(cohort){
            cohort.studentNumber = cohort.cohortStudentIds.length;
          });
          $scope.cohorts = cohorts;
         });
      });
    });
  };
  $scope.showOneCohort = function(){
    var cohortId = this.cohort._id;
    $state.go('cohorts.show', {cohortId:cohortId});
  };
});
