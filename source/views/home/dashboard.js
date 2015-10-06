'use strict';

angular.module('chRepo')
.controller('DashboardCtrl', function($rootScope, $scope, Cohort, Project, User, Intro, Assignment, sweet, $state, $http){



  $scope.tempProject = {};
  $scope.tempIntro = {};
  var currentAssignments = [];
  var pastAssignments = [];
  // $scope.isAdmin='';

  // $scope.checkAdmin = function() {
  //   if ($scope.adminUser) { $scope.isAdmin = false; }
  //   else { $scope.isAdmin = true; }
  // };
  // $scope.checkAdmin();

  $scope.checkAdmin = function() {
    if ($scope.adminUser) { $scope.isAdmin = false; }
    else { $scope.isAdmin = true; }
  };
  $scope.checkAdmin();


  Assignment.index()
  .success(function(assignments){
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

  Project.index()
  .success(function(projects){
    $scope.projects = projects;
  });
  Cohort.index()
  .success(function(cohorts){
    $scope.cohorts = cohorts;
  });
  Intro.index()
  .success(function(intros){
    $scope.intros = intros;
  });

  $scope.viewOneAssignment = function(assignmentId){
    $state.go('home.show', {assignmentId:assignmentId});
  };

  $scope.deleteAssignmentConfirm = function(assignment){
    $scope.tempAssignment = this.pastAssignment._id;
    sweet.show({
      title: 'Delete? Really?',
      text: 'Once removed the file cannot be recovered',
      type: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#DD6B55',
      confirmButtonText: 'DO IT!',
      closeOnConfirm: false
    },
    function() {
      Assignment.delete($scope.tempAssignment)
      .success(function(res){
        sweet.show('Deleted!', 'the file has been removed', 'success');
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
    console.log(this.pastAssignment._id);
    // console.log($scope.activeUser);
    Assignment.findByIdAndUpdate(this.pastAssignment._id,
      {$push: {"submittedUsers": {user: $scope.activeUser.mongoId._id}}},
      {safe: true, upsert: true},
      function(err, assignment) {
        console.log(assignment);
    }
  );
  };
  // $scope.submitAssignment= function() {
  //   console.log(this.pastAssignment._id);
  //   console.log($scope.activeUser.mongoId._id);
  // };
});
