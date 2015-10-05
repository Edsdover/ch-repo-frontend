'use strict';

angular.module('chRepo')
.run(function($rootScope, $window, $firebaseAuth, urls){
  $rootScope.fbRoot = new $window.Firebase(urls.firebaseUrl);
  $rootScope.afAuth = $firebaseAuth($rootScope.fbRoot);
  $window.swal.setDefaults({
    allowEscapeKey: true,
    allowOutsideClick: true,
    showConfirmButton: true
  });
});
