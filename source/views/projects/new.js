'use strict';

angular.module('chRepo')
.controller('NewProjectCtrl', function($scope, Project, sweet, $window){
  //
  $(document).ready(function() {
    $('#sel').change(function() {
        var currentVal = $('#projectTech').val();
        $('#projectTech').val(currentVal + $(this).val() + ",   ");
    });

  $scope.newItem = true;

  $scope.submit = function(obj){
    // var moddedLink = obj.notes.split('<iframe src="')[1].split('"></iframe>')[0];
    // obj.notes = moddedLink;
    obj.notes = obj.notes;
    obj.tech = $('#projectTech').val();
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
