angular.module('chRepo')

.controller('DashboardCtrl', function($rootScope, $scope, Cohort, Assignment, sweet, $state){

  $(document).ready(function() { // jshint ignore:line
    $(function() {// jshint ignore:line
      $( "#datepicker" ).datepicker();// jshint ignore:line
    });
    var hasActiveUser = false;
    $scope.hasCohort = false;
    $scope.currentAssignmentsShow = true;
    $scope.pastAssignmentsShow = false;
    checkAuth();
    function checkAuth(){
      if($scope.activeUser){
        populateDashboard();
        hasActiveUser = true;
        }
      if(!hasActiveUser){
        setTimeout(checkAuth, 1000);
        }
      }
    function populateDashboard(){
      $scope.activeUser.cohortsArray = [];
      $scope.activeUser.cohortsObj = [];
      var currentAssignments = [];
      var pastAssignments = [];
      var activeCohorts = [];
      Cohort.findAll()
      .success(function(cohorts){
        $scope.cohorts = cohorts;
        cohorts.forEach(function(cohort){
          var cohortStudents = cohort.cohortStudentIds;
          var activeId = $scope.activeUser.github.id;
          if(cohortStudents.indexOf(activeId) > -1){
            $scope.activeUser.cohortsArray.push(cohort.cohortName);
            $scope.activeUser.cohortsObj.push(cohort);
            $scope.hasCohort = true;
          }
        });
      })
      .then(function(){
        Assignment.index()
        .success(function(assignments){
          activeCohorts = $scope.activeUser.cohortsArray;
          var currentTime = Number(new Date());
          if($scope.adminUser === true){
            assignments.forEach(function(assignment){
              var assignmentCohort = assignment.cohortName;
              if(Date.parse(assignment.dueDate) > currentTime){
                currentAssignments.push(assignment);
              }else if(Date.parse(assignment.dueDate) < currentTime){
                pastAssignments.push(assignment);
              }
            });
            $scope.currentAssignments = currentAssignments;
            $scope.pastAssignments = pastAssignments;
          }
          if($scope.adminUser === false){
            assignments.forEach(function(assignment){
              var assignmentCohort = assignment.cohortName;
              if(Date.parse(assignment.dueDate) > currentTime && activeCohorts.indexOf(assignmentCohort) > -1){
                currentAssignments.push(assignment);
              }else if(activeCohorts.indexOf(assignmentCohort) > -1){
                pastAssignments.push(assignment);
              }
            });
            $scope.currentAssignments = currentAssignments;
            $scope.pastAssignments = pastAssignments;
          }
        });
      });
    }
    $scope.editModal = function(){
      if (this.$parent.currentAssignment){
        $scope.selectedProject = this.$parent.currentAssignment;
        Assignment.findById($scope.selectedProject._id)
        .then(function(response){
          response.data.dueDate = Date.parse(response.data.dueDate);
          $scope.assignment = response.data;
        });
      }else if(this.$parent.pastAssignment){
        $scope.selectedProject = this.$parent.pastAssignment;
        Assignment.findById($scope.selectedProject._id)
        .then(function(response){
          response.data.dueDate = Date.parse(response.data.dueDate);
          $scope.assignment = response.data;
        });
      }
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
        sweet.show(obj.projectName + ' Save Success', 'Success, Your Assignment is updated! And a notification has been sent to the cohort.', 'success');
        populateDashboard();
      })
      .error(function(error){
        console.log(error);
      });
    };
    $scope.deleteAssignmentConfirm = function(assignment){
      if(this.$parent.pastAssignment){
        $scope.tempAssignment = this.$parent.pastAssignment._id;
      }else{
        $scope.tempAssignment = this.$parent.currentAssignment._id;
      }
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
    $scope.viewOneAssignment = function(assignmentId){
      $state.go('assignments.show', {assignmentId:assignmentId});
    };
    $scope.currentAssignmentsToggle = function() {
      $scope.currentAssignmentsShow = $scope.currentAssignmentsShow === false ? true : false;
    };
    $scope.pastAssignmentsToggle = function() {
      $scope.pastAssignmentsShow = $scope.pastAssignmentsShow === false ? true : false;
    };
    $('.modal').on('hide.bs.modal', function(){ // jshint ignore:line
      $scope.$apply(function () {
        $scope.message = "Timeout called!";
        $scope.intro = null;
        $scope.project = null;
        $scope.selectedProject = null;
        $scope.isEdit = false;
      });
    });
    $scope.viewProfile = function(){
      var studentId = $rootScope.activeUser.mongoId._id;
      $state.go('users.show', {studentId : $rootScope.activeUser.mongoId._id});
    };
  // $scope.submitAssignment= function() {
  //   Assignment.findByIdAndUpdate(this.pastAssignment._id,
  //     {$push: {"submittedUsers": {user: $scope.activeUser.mongoId._id}}},
  //     {safe: true, upsert: true},
  //   function(err, assignment) {
  //   }
  //   );
  // };
  });
});
