'use strict';

angular.module('chRepo')
.factory('Intro', function($http, urls){

  var apiUrl = urls.apiUrl;
  var Intro = {};

  Intro.create = function(intro){
    return $http.post(apiUrl + '/intros', intro);
  };
  Intro.update = function(intro){
    return $http.put(apiUrl + '/intros', intro);
  };
  Intro.delete = function(intro){
    return $http.delete(apiUrl + '/intros/' + intro._id);
  };
  Intro.index = function(){
    return $http.get(apiUrl + '/intros');
  };
  Intro.findById = function(introId){
    return $http.get(apiUrl + '/intros/' + introId);
  };
  return Intro;
});
