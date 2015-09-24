'use strict';

angular.module('chRepo')
.controller('NewProjectCtrl', function($scope, Project, sweet, $window){
<<<<<<< HEAD
  //
  $(document).ready(function() {
    $('#sel').change(function() {
        var currentVal = $('#projectTech').val();
        $('#projectTech').val(currentVal + $(this).val() + ",   ");
=======
  $(document).ready(function() { // jshint ignore:line
    $('#sel').change(function() { // jshint ignore:line
        var currentVal = $('#projectTech').val(); // jshint ignore:line
        $('#projectTech').val(currentVal + $(this).val() + ",   "); // jshint ignore:line
>>>>>>> 298e236f11ed9f999640aa13df7a3e8d6845b9ff
    });

  $scope.newItem = true;

  $scope.submit = function(obj){
    obj.notes = obj.notes;
<<<<<<< HEAD
    obj.tech = $('#projectTech').val();
=======
    obj.tech = $('#projectTech').val(); // jshint ignore:line
>>>>>>> 298e236f11ed9f999640aa13df7a3e8d6845b9ff
    Project.create(obj)
    .success(function(data){
      sweet.show('Project Save Success', 'Success, Your project is saved!', 'success');
      $scope.project = {};
      console.log(data);
    })
    .error(function(error){
      $window.swal({title: 'Project Save Error', text: 'Warning, there was a problem saving your project.', type: 'error'});
    });
  };
});
});
