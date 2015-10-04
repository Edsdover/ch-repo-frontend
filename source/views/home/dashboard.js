'use strict';

angular.module('chRepo')
.controller('DashboardCtrl', function($scope, Cohort, Assignment, sweet, $state){

  $scope.tempProject = {};
  $scope.tempIntro = {};
  $scope.activeUser.cohortsArray = [];
  $scope.activeUser.cohortsObj = [];
  var currentAssignments = [];
  var pastAssignments = [];
  var activeCohorts = [];

  Cohort.findAll()
  .success(function(cohorts){
    cohorts.forEach(function(cohort){
      var cohortStudents = cohort.cohortStudentIds;
      var activeId = $scope.activeUser.github.id;
      if(cohortStudents.indexOf(activeId) > -1){
        $scope.activeUser.cohortsArray.push(cohort.cohortName);
        $scope.activeUser.cohortsObj.push(cohort);
      }
    });
  })
  .then(function(){
    Assignment.index()
    .success(function(assignments){
      activeCohorts = $scope.activeUser.cohortsArray;
      var currentTime = Number(new Date());
      if($scope.adminUser === false){
        assignments.forEach(function(assignment){
          var assignmentCohort = assignment.cohortName;
          if(Date.parse(assignment.dueDate) > currentTime && activeCohorts.indexOf(assignmentCohort) > -1){
            currentAssignments.push(assignment);
          }else if(activeCohorts.indexOf(assignmentCohort) > -1){
            pastAssignments.push(assignment);
          }
          $scope.currentAssignments = currentAssignments;
          $scope.pastAssignments = pastAssignments;
        });
      }else if($scope.adminUser === true){
        assignments.forEach(function(assignment){
          var assignmentCohort = assignment.cohortName;
          if(Date.parse(assignment.dueDate) > currentTime){
            currentAssignments.push(assignment);
          }else{
            pastAssignments.push(assignment);
          }
          $scope.currentAssignments = currentAssignments;
          $scope.pastAssignments = pastAssignments;
        });
      }
    });
  });
  $scope.viewOneAssignment = function(assignmentId){
    $state.go('home.show', {assignmentId:assignmentId});
  };
  $scope.deleteAssignmentConfirm = function(assignment){
    $scope.tempAssignment = this.pastAssignment._id;
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
        Assignment.index()
        .success(function(assignments){
          $scope.assignments = assignments;
        })
        .then(function(){
          location.reload(); // jshint ignore:line
         });
      });
    });
  };
  $scope.submitAssignment= function() {
    Assignment.findByIdAndUpdate(this.pastAssignment._id,
      {$push: {"submittedUsers": {user: $scope.activeUser.mongoId._id}}},
      {safe: true, upsert: true},
    function(err, assignment) {
    }
    );
  };
});
