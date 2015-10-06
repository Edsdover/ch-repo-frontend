'use strict';

angular.module('chRepo')
.controller('IndexProjectCtrl', function($rootScope, $scope, Project, Intro, sweet, $state, User, Cohort, Assignment){

  $(document).ready(function() { // jshint ignore:line
    $scope.tempProject = {};
    $scope.tempIntro = {};
    $scope.selectedProject = null;
    $scope.selectedIntro = null;

    Project.index()
    .success(function(projects){
      $scope.projects = projects;
    });
    Cohort.index()
    .success(function(cohorts){
      $scope.cohorts = cohorts;
      console.log($scope.cohorts);
    });
    Intro.index()
    .success(function(intros){
      $scope.intros = intros;
    });
    $scope.toggleProjectOn = function(){
      $scope.selectedProject = this.project;
      findProjects();
    };
    $scope.toggleIntroOn = function(){
      $scope.selectedIntro = this.intro;
      findIntros();
    };
    // $scope.submitProject = function(obj){
    //   obj.projectName = $scope.selectedProject.name;
    //   obj.projectId = $scope.selectedProject._id;
    //   Assignment.create(obj)
    //   .success(function(data){
    //     sweet.show('Check', 'Your Assignment is saved!', 'success');
    //     $scope.assignment = {};
    //   })
    //   .error(function(error){
    //     sweet.show({
    //       title: 'Assignment Save Error',
    //       text: 'Warning, there was a problem saving your assignment.',
    //       type: 'error'
    //     });
    //   });
    // };
    // $scope.submitIntro = function(obj){
    //   obj.projectName = "Intro: "+ $scope.selectedIntro.name;
    //   obj.projectId = $scope.selectedIntro._id;
    //   Assignment.create(obj)
    //   .success(function(data){
    //     sweet.show('Check', 'Your Assignment is saved!', 'success');
    //     $scope.assignment = {};
    //   })
    //   .error(function(error){
    //     sweet.show({
    //       title: 'Assignment Save Error',
    //       text: 'Warning, there was a problem saving your assignment.',
    //       type: 'error'
    //     });
    //   });
    // };
    $scope.deleteProjectConfirm = function(project){
      $scope.tempProject = project;
      sweet.show({
        title: 'Delete? Really?',
        text: 'Once this is deleted, it cannot be recovered',
        type: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#DD6B55',
        confirmButtonText: 'DO IT!',
        closeOnConfirm: false
      },
      function() {
        Project.delete($scope.tempProject)
        .success(function(res){
          sweet.show('Deleted!', 'The file has been removed', 'success');
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
        text: 'Once this is deleted, it cannot be recovered',
        type: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#DD6B55',
        confirmButtonText: 'DO IT!',
        closeOnConfirm: false
      },
      function() {
        Intro.delete($scope.tempIntro)
        .success(function(res){
          sweet.show('Deleted!', 'The file has been removed', 'success');
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
    function findProjects(){
      Project.findById($scope.selectedProject._id)
      .then(function(response){
        $scope.project = response.data;
      });
    }
    function findIntros(){
      Intro.findById($scope.selectedIntro._id)
      .then(function(response){
        $scope.intro = response.data;
      });
    }
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


    $scope.submitProject = function(obj){
      obj.projectName = $scope.selectedProject.name;
      obj.projectId = $scope.selectedProject._id;
      Assignment.create(obj)
    .success(function(data){
      sweet.show('Check', 'Your Assignment is saved!', 'success');
      console.log('data', data);
          var email = 'aug.2015@codinghouse.co';
           var name = 'Coding House TAs';
           var msg = 'New Assignment at ch-repo.herokuapp.com';
           $.ajax({
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
         sweet.show('Assignment Save Success', 'Success, Your project is saved! And a notification has been sent to the cohort', 'success');
          $scope.assignment = {};

    })
    .error(function(error){
      console.log(error);
    });
  };


  $scope.submitIntro = function(obj){
    obj.projectName = "Intro: "+ $scope.selectedIntro.name;
    obj.projectId = $scope.selectedIntro._id;
    Assignment.create(obj)
    .success(function(data){
      sweet.show('Check', 'Your Intro is saved!', 'success');
      console.log('data', data);
          var email = 'aug.2015@codinghouse.co';
           var name = 'Coding House TAs';
           var msg = 'New Intro-Assignment at ch-repo.herokuapp.com';
           $.ajax({
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
                 'subject': 'New Intro Assignment',
                 'text': msg,
                 'to': [{
                   'email': email,
                   'name': name,
                   'type': 'to'
                 }]
               }
             }
           });
         sweet.show('Intro Save Success', 'Success, Your Intro is saved! And a notification has been sent to the cohort.', 'success');
          $scope.assignment = {};

    })
    .error(function(error){
      console.log(error);
    });
  };
});
