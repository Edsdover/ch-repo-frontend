'use strict';

angular.module('chRepo')
.service('FBService', function($window, $firebaseAuth, urls){
  this.init = function(){
    this.fbRef = new $window.Firebase(urls.firebaseUrl);
    this.afAuth = $firebaseAuth(this.fbRef);
  };
});
