'use strict';

angular.module('chRepo')
.controller('AssignmentCtrl', function($scope, Assignment, Project, sweet, $state, Intro, $sce, Cohort){

  populateAssignment();
  var assignmentId = $state.params.assignmentId,
      currentTime = Number(new Date());
  function populateAssignment(){
    Assignment.findById(assignmentId)
    .then(function(response){
      if(Date.parse(response.data.dueDate) > currentTime){
        $scope.currentAssignment = true;
      }
      $scope.viewAssignment = response.data;
      Project.findById(response.data.projectId)
      .then(function(response){
        $scope.iframeURL = $sce.trustAsHtml(response.data.notes);
        $scope.project = response.data;
      });
      Intro.findById(response.data.introId)
      .then(function(response){
        $scope.intro = response.data;
      });
      Cohort.findAll()
      .then(function(response){
        $scope.cohorts = response.data;
      });
    });
  }
  $scope.editModal = function(){
    $scope.selectedProject = this.$parent.currentAssignment;
    $scope.assignment = $scope.viewAssignment;
  };
  $scope.updateAssignment = function(obj){
    Assignment.update(obj)
    .success(function(data){
      sweet.show('Check', 'Your Assignment is updated!', 'success');
      var email = obj.cohortEmail,
          name = 'Coding House Assignment App',
          msg = obj.projectName + ' edited! Read more at ch-repo.herokuapp.com.';
      $.ajax({ // jshint ignore:line
        type: "POST",
        url: "https://mandrillapp.com/api/1.0/messages/send.json",
        data: {
          'key': 'MDTpzgc6BNZ7carbIFxuYw',
          'message': {
            'from_email': email,
            'from_name': name,
            'headers': {'Reply-To': email},
            'subject': 'New Assignment',
            'text': msg,
            'to': [{
              'email': email,
              'name': name,
              'type': 'to'
            }]
          }
        }
      });
      populateAssignment();
      sweet.show(obj.projectName + ' Save Success', 'Success, Your Assignment is updated! And a notification has been sent to the cohort.', 'success');
    })
    .error(function(error){
      console.log(error);
    });
  };
  $scope.deleteAssignmentConfirm = function(assignment){
    $scope.tempAssignment = assignment;
    sweet.show({
      title: 'Delete? Really?',
      text: 'Once deleted the file cannot be recovered',
      type: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#DD6B55',
      confirmButtonText: 'DO IT!',
      closeOnConfirm: false
    },
    function() {
      Assignment.delete($scope.tempAssignment)
      .success(function(res){
        sweet.show('Deleted!', 'The file has been removed', 'success');
        $state.go('dashboard.home', {assignmentId:assignmentId});
      });
    });
  };

  $scope.markAsSubmitted = function(assignment) {
    console.log(this.submittedcontent.url);
  };
});
