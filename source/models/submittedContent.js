'use strict';

angular.module('chRepo')
.factory('SubmittedContent', function($http, urls){

  var apiUrl = urls.apiUrl;
  var SubmittedContent = {};

  SubmittedContent.create = function(submittedcontent){
    return $http.post(apiUrl + '/submittedcontent', submittedcontent);
  };
  SubmittedContent.update = function(submittedcontent){
    return $http.put(apiUrl + '/submittedcontent/update', submittedcontent);
  };
  SubmittedContent.findByIdAndUpdate = function(submittedcontent){
    return $http.put(apiUrl + '/submittedcontent', submittedcontent._id);
  };
  SubmittedContent.delete = function(submittedcontent){
    return $http.delete(apiUrl + '/submittedcontent/' + submittedcontent);
  };
  SubmittedContent.index = function(){
    return $http.get(apiUrl + '/submittedcontent');
  };
  SubmittedContent.findById = function(submittedcontent){
    return $http.get(apiUrl + '/submittedcontent/' + submittedcontent);
  };
  return SubmittedContent;
});
