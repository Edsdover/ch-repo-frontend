'use strict';

angular.module('chRepo')
.controller('IndexProjectCtrl', function($rootScope, $scope, Project, Intro, sweet, $state, User, Cohort, Assignment){

  $(document).ready(function() { // jshint ignore:line
    $scope.tempProject = {};
    $scope.tempIntro = {};
    $scope.selectedProject = null;
    $scope.selectedIntro = null;
    $scope.isEdit = false;

    Project.index()
    .success(function(projects){
      $scope.projects = projects;
    });
    Cohort.findAll()
    .success(function(cohorts){
      $scope.cohorts = cohorts;
    });
    Intro.index()
    .success(function(intros){
      $scope.intros = intros;
    });
    $scope.editProjectModal = function(){
      $scope.isEdit = true;
      $scope.selectedProject = this.project;
      Project.findById(this.project._id)
      .then(function(response){
        $scope.project = response.data;
      });
    };
    $scope.editIntroModal = function(){
      $scope.isEdit = true;
      $scope.selectedProject = this.intro;
      Intro.findById(this.intro._id)
      .then(function(response){
        $scope.intro = response.data;
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
    $scope.submitProject = function(obj){
      obj.projectName = $scope.selectedProject.name;
      obj.projectId = $scope.selectedProject._id;
      Assignment.create(obj)
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
    $scope.submitIntro = function(obj){
      obj.projectName = "Intro: "+ $scope.selectedIntro.name;
      obj.projectId = $scope.selectedIntro._id;
      Assignment.create(obj)
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
    $scope.deleteProjectConfirm = function(project){
      $scope.tempProject = project;
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
        Project.delete($scope.tempProject)
        .success(function(res){
          sweet.show('Deleted!', 'The file has been owned by a swift roundhouse!', 'success');
          Project.index()
          .success(function(projects){
            $scope.projects = projects;
          });
        });
      });
    };
    $scope.deleteIntroConfirm = function(intro){
      $scope.tempIntro = intro;
      sweet.show({
        title: 'Delete? Really?',
        text: 'This will blow this intro back to Nam',
        type: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#DD6B55',
        confirmButtonText: 'DO IT!',
        closeOnConfirm: false
      },
      function() {
        Intro.delete($scope.tempIntro)
        .success(function(res){
          sweet.show('Deleted!', 'The file has been owned by a swift roundhouse!', 'success');
          Intro.index()
          .success(function(intros){
            $scope.intros = intros;
          });
        });
      });
    };
    $scope.viewOneProject = function(projectId){
      $state.go('projects.show', {projectId:projectId});
    };
    $scope.viewOneIntro = function(introId){
      $state.go('intros.show', {introId:introId});
    };
    $scope.updateProject = function(obj){
      Project.update(obj)
      .then(function(){
        Project.index()
        .success(function(projects){
          $scope.projects = projects;
        });
        sweet.show('Check', 'Your Project is saved!', 'success');
        $('#editProjectModal').modal('hide'); // jshint ignore:line
      })
      .catch(function(){
        sweet.show('Bugger', 'Your Project did not save.', 'error');
      });
    };
  });
  $scope.updateIntro = function(obj){
    Intro.update(obj)
    .then(function(){
      sweet.show('Check', 'Your Intro is saved!', 'success');
      $('#editIntroModal').modal('hide'); // jshint ignore:line
    })
    .catch(function(err){
      sweet.show('Bugger', 'Your Intro did not save.', 'error');
      console.log(err);
    });
  };
  $('#sel').change(function() { // jshint ignore:line
    var currentVal = $('#projectTech').val(); // jshint ignore:line
    $('#projectTech').val(currentVal + $(this).val() + ",   "); // jshint ignore:line
  });
  // $scope.submit = function(obj){
  //   console.log('name', $scope.assignment.cohortName);
  //   obj.projectName = $scope.selectedProject.name;
  //   obj.projectId = $scope.selectedProject._id;
  //   obj.introName = $scope.selectedIntro.name;
  //   console.log($scope.selectedIntro.name);
  //   obj.introId = $scope.selectedIntro._id;
  //   Assignment.create(obj)
  //   .success(function(data){
  //     sweet.show('Check', 'Your Assignment is saved!', 'success');
  //     console.log('data', data);
  //     // var email = 'misankovich@gmail.com';
  //       // Cohort.findOne({cohortName: data.cohortName}, function(err, doc) {
  //       //   if (doc) {
  //       //     console.log(doc, 'doc');
  //       //     var email = doc.cohortEmail;
  //       //   }
  //       //   console.log(email, 'email');
  //       // })
  //       // .then(function(response){
  //       //   console.log(response, "Here ya go");
  //       //   $scope.assignment = response.data;
  //       // });
  //       // var name = 'Some TA';
  //       // var msg = 'New Assignment at ch-repo.herokuapp.com';
  //     //   $.ajax({
  //     //     type: "POST",
  //     //     url: "https://mandrillapp.com/api/1.0/messages/send.json",
  //     //     data: {
  //     //       'key': 'MDTpzgc6BNZ7carbIFxuYw',
  //     //       'message': {
  //     //         'from_email': email,
  //     //         'from_name': name,
  //     //         'headers': {
  //     //           'Reply-To': email
  //     //         },
  //     //         'subject': 'New Assignment',
  //     //         'text': msg,
  //     //         'to': [{
  //     //           'email': 'misankovich@gmail.com',
  //     //           'name': 'Michael Sankovich',
  //     //           'type': 'to'
  //     //         }]
  //     //       }
  //     //     }
  //     //   })
  //     //   .done(function(response) {
  //     //     alert('yaaaaay');
  //     //   })
  //     //   .fail(function(response) {
  //     //     alert('noooooo');
  //     //   });
  //     //   return false;
  //     //
  //     // sweet.show('Assignment Save Success', 'Success, Your project is saved!', 'success');
  //     $scope.assignment = {};
  //   })
  //   .error(function(error){
  //     console.log(error);
  //   });
  // };
});
