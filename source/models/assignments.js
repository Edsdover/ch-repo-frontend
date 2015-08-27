'use strict';

angular.module('chRepo')
.factory('Assignment', function($http, urls){

  var apiUrl = urls.apiUrl;
  var Assignment = {};

  Assignment.create = function(assignment){
    console.log(assignment);
    return $http.post(apiUrl + '/assignments', assignment);
  };
  // Assignment.update = function(intro){
  //   return $http.put(apiUrl + '/cohorts', intro);
  // };
  // Assignment.addAssignment = function(assignment){
  //   return $http.put(apiUrl + '/cohorts/addAssignments', assignment);
  // };
  // Assignment.delete = function(intro){
  //   return $http.delete(apiUrl + '/cohorts/' + intro._id);
  // };
  Assignment.index = function(){
    return $http.get(apiUrl + '/assignments');
  };
  // Assignment.findById = function(introId){
  //   return $http.get(apiUrl + '/cohorts/' + introId);
  // };
  return Assignment;
});
