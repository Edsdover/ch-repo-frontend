
angular.module('chRepo')

.controller('DashboardCtrl', function($scope, Cohort, Assignment, sweet, $state){

  $scope.hasCohort = false;
  populateDashboard();

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
  }
  $scope.viewOneAssignment = function(assignmentId){
    $state.go('home.show', {assignmentId:assignmentId});
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
  $scope.editModal = function(){
    if (this.$parent.currentAssignment){
      $scope.selectedProject = this.$parent.currentAssignment;
      Assignment.findById($scope.selectedProject._id)
      .then(function(response){
        response.data.dueDate = null;
        $scope.assignment = response.data;
      });
    }else if(this.$parent.pastAssignment){
      $scope.selectedProject = this.$parent.pastAssignment;
      Assignment.findById($scope.selectedProject._id)
      .then(function(response){
        response.data.dueDate = null;
        $scope.assignment = response.data;
      });
    }
  };
  $scope.updateAssignment = function(obj){
    Assignment.update(obj)
    .success(function(data){
      sweet.show('Check', 'Your Assignment is updated!', 'success');
      // var email = 'aug.2015@codinghouse.co';
      var email = 'edsdover@gmail.com';
      var name = 'Coding House Assignment App';
      var msg = obj.projectName + ' edited! Read more at ch-repo.herokuapp.com.';
      $.ajax({ // jshint ignore:line
        type: "POST",
        url: "https://mandrillapp.com/api/1.0/messages/send.json",
        data: {
          'key': 'MDTpzgc6BNZ7carbIFxuYw',
          'message': {
            'from_email': email,
            'from_name': name,
            'headers': {
              'Reply-To': email
            },
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
  $('.modal').on('hide.bs.modal', function(){ // jshint ignore:line
    $scope.$apply(function () {
      $scope.message = "Timeout called!";
      $scope.intro = null;
      $scope.project = null;
      $scope.selectedProject = null;
      $scope.isEdit = false;
    });
  });
  $scope.submitAssignment= function() {
    Assignment.findByIdAndUpdate(this.pastAssignment._id,
      {$push: {"submittedUsers": {user: $scope.activeUser.mongoId._id}}},
      {safe: true, upsert: true},
    function(err, assignment) {
    }
    );
  };
});
