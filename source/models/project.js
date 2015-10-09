'use strict';

angular.module('chRepo')
.factory('Project', function($http, urls){

  var apiUrl = urls.apiUrl;
  var Project = {};

  Project.create = function(project){
    return $http.post(apiUrl + '/projects', project);
  };
  Project.update = function(project){
    return $http.put(apiUrl + '/projects', project);
  };
  Project.delete = function(project){
    return $http.delete(apiUrl + '/projects/' + project._id);
  };
  Project.index = function(){
    return $http.get(apiUrl + '/projects');
  };
  Project.findById = function(projectId){
  return $http.get(apiUrl + '/projects/' + projectId);
  };
  return Project;
});
