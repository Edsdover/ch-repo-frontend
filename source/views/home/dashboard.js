'use strict';

angular.module('chRepo')
.controller('DashboardCtrl', function($rootScope, $scope, Cohort, Project, User, Intro, Assignment, sweet, $state, $http){

  $scope.tempProject = {};
  $scope.tempIntro = {};
  getAssignments();

  function getAssignments(){
    Assignment.index()
    .success(function(assignments){
      var currentAssignments = [];
      var pastAssignments = [];
      var currentTime = Number(new Date());
      assignments.forEach(function(assignment){
        if(Date.parse(assignment.dueDate) > currentTime){
          currentAssignments.push(assignment);
        }else{
          pastAssignments.push(assignment);
        }
        $scope.currentAssignments = currentAssignments;
        $scope.pastAssignments = pastAssignments;
      });
    });
  }
  $scope.editAssignment = function(obj){
    obj.dueDate = '';
    $('#editAssignmentModal').modal('show'); // jshint ignore:line
    $scope.assignment = obj;
    $scope.assignment.cohortName = obj.cohortName;
  };

  $scope.viewOneAssignment = function(assignmentId){
    $state.go('home.show', {assignmentId:assignmentId});
  };

  $scope.deleteAssignmentConfirm = function(assignment){
    $scope.tempAssignment = assignment;
    sweet.show({
        title: 'Delete? Really?',
        text: 'This will blow this project back to Nam',
        type: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#DD6B55',
        confirmButtonText: 'DO IT!',
        closeOnConfirm: false
    },
    function() {
      Assignment.delete($scope.tempAssignment)
      .success(function(res){
        sweet.show('Deleted!', 'The file has been owned by a swift roundhouse!', 'success');
        getAssignments();
      });
    });
  };
  //newProjectModal
  $scope.formValid = false;

  $(document).ready(function() { // jshint ignore:line
    $('#projectName').keyup(function(){ // jshint ignore:line
      if ($scope.project.name.length > 0){
        $scope.formValid = true;
      }else{
        $scope.formValid = false;
      }
    });
    $('#sel').change(function() { // jshint ignore:line
      var currentVal = $('#projectTech').val(); // jshint ignore:line
      $('#projectTech').val(currentVal + $(this).val() + ",   "); // jshint ignore:line
    });

    $scope.submitNewProject = function(obj){
      obj.notes = obj.notes;
      obj.tech = $('#projectTech').val(); // jshint ignore:line
      Project.create(obj)
      .success(function(data){
        sweet.show('Project Save Success', 'Success, Your project is saved!', 'success');
        $scope.project = {};
      })
      .error(function(error){
        sweet.show({
            title: 'Project Save Error',
            text: 'Warning, there was a problem saving your project.',
            type: 'error'
        });
      });
    };
  });
  //newIntroModal
  $scope.submitNewIntro = function(obj){
    Intro.create(obj)
    .success(function(data){
      sweet.show({
          title: 'Intro Save Success',
          text: 'Success, Your intro is saved!',
          type: 'success'
      });
      $scope.intro = {};
    })
    .error(function(error){
      sweet.show({
          title: 'Intro Save Error',
          text: 'Warning, there was a problem saving your intro.',
          type: 'error'
      });
    });
  };
  $scope.updateAssignment = function(assignment){
    Assignment.update(assignment)
    .success(function(data){
      sweet.show('Check', 'Your Assignment is saved!', 'success');
      $scope.assignment = {};
    })
    .error(function(error){
      sweet.show({
          title: 'Assignment Save Error',
          text: 'Warning, there was a problem saving your assignment.',
          type: 'error'
      });
    });
  };
});
