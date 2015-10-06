'use strict';

angular.module('chRepo')
.factory('Cohort', function($http, urls){

  var apiUrl = urls.apiUrl;
  var Cohort = {};

  Cohort.create = function(cohort){
<<<<<<< HEAD
    console.log(cohort);
    return $http.post(apiUrl + '/cohorts', cohort);
  };
  // Cohort.update = function(intro){
  //   return $http.put(apiUrl + '/cohorts', intro);
  // };
  Cohort.delete = function(cohort){
    return $http.delete(apiUrl + '/cohorts/' + cohort._id);
  };
  Cohort.index = function(){
=======
    return $http.post(apiUrl + '/cohorts', cohort);
  };
  Cohort.update = function(intro){
    return $http.put(apiUrl + '/cohorts/update', intro);
  };
  Cohort.delete = function(cohort){
    return $http.delete(apiUrl + '/cohorts/' + cohort._id);
  };
  Cohort.findAll = function(){
>>>>>>> 8e6c4a36480a2f4302c472568e314d10496db36e
    return $http.get(apiUrl + '/cohorts');
  };
  Cohort.findById = function(cohortId){
  return $http.get(apiUrl + '/cohorts/' + cohortId);
  };
  return Cohort;
});
