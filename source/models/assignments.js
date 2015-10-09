'use strict';

angular.module('chRepo')
.factory('Assignment', function($http, urls){

  var apiUrl = urls.apiUrl;
  var Assignment = {};

  Assignment.index = function(){
    return $http.get(apiUrl + '/assignments');
  };
  Assignment.create = function(assignment){
    return $http.post(apiUrl + '/assignments', assignment);
  };
  Assignment.update = function(assignment){
    return $http.put(apiUrl + '/assignments/update', assignment);
  };
  Assignment.findByIdAndUpdate = function(assignment){
    return $http.put(apiUrl + '/assignments', assignment._id);
  };
  Assignment.findById = function(assignmentId){
    return $http.get(apiUrl + '/assignments/' + assignmentId);
  };
  Assignment.delete = function(assignment){
    return $http.delete(apiUrl + '/assignments/' + assignment);
  };
  return Assignment;
});
