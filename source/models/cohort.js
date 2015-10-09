'use strict';

angular.module('chRepo')
.factory('Cohort', function($http, urls){

  var apiUrl = urls.apiUrl;
  var Cohort = {};

  // Cohort.index = function(cohort){
  //   return $http.post(apiUrl + '/cohorts', cohort);
  // };
  Cohort.create = function(cohort){
    return $http.post(apiUrl + '/cohorts', cohort);
  };
  Cohort.update = function(intro){
    return $http.put(apiUrl + '/cohorts/update', intro);
  };
  Cohort.delete = function(cohort){
    return $http.delete(apiUrl + '/cohorts/' + cohort._id);
  };
  Cohort.findAll = function(){
    return $http.get(apiUrl + '/cohorts');
  };
  Cohort.findById = function(cohortId){
  return $http.get(apiUrl + '/cohorts/' + cohortId);
  };
  return Cohort;
});
