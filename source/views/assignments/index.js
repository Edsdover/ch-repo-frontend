'use strict';

angular.module('chRepo')
.controller('IndexProjectCtrl', function($scope, Project, Intro, sweet, $state, Cohort, Assignment){
  $(document).ready(function() { // jshint ignore:line
    $(function() {// jshint ignore:line
      $( "#datepicker" ).datepicker();// jshint ignore:line
    });
    $scope.tempProject = {};
    $scope.tempIntro = {};
    $scope.selectedProject = null;
    $scope.projectShow = false;
    $scope.introShow = false;

    introsFindAll();
    projectsFindAll();
    cohortsFindAll();

    function projectsFindAll(){
      Project.index()
      .success(function(projects){
        $scope.projects = projects;
      });
    }
    function cohortsFindAll(){
      Cohort.findAll()
      .success(function(cohorts){
        $scope.cohorts = cohorts;
      });
    }
    function introsFindAll(){
      Intro.index()
      .success(function(intros){
        $scope.intros = intros;
      });
    }
    $scope.submitAssignment = function(obj){
      $scope.cohorts.forEach(function(cohort){
        if(cohort.cohortName === obj.cohortName){
          obj.cohortEmail = cohort.cohortEmail;
        }
      });
      if($scope.project){
        obj.projectName = "Project: " + $scope.selectedProject.name;
      }else if($scope.intro){
        obj.projectName = "Intro: " + $scope.selectedProject.name;
      }
      obj.dueDate = Date.parse(obj.dueDate);
      obj.projectId = $scope.selectedProject._id;
      Assignment.create(obj)
      .success(function(data){
        sweet.show('Check', 'Your Assignment is saved!', 'success');
        var email = obj.cohortEmail,
            name = 'Coding House Assignment App',
            msg = obj.projectName + ' assigned to you at ch-repo.herokuapp.com.';
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
        sweet.show(obj.projectName + ' Save Success', 'Success, Your Assignment is saved! And a notification has been sent to the cohort.', 'success');
        $scope.assignment = {};
      })
      .error(function(error){
        console.log(error);
      });
    };
    $scope.create = function(obj){
      if($scope.project){
        Project.create(obj)
        .success(function(data){
          sweet.show('Check', 'Your Project is saved!', 'success');
          $scope.project = {};
          saveCB();
        })
        .error(function(error){
          console.log(error);
        });
      }else{
        Intro.create(obj)
        .success(function(data){
          sweet.show('Check', 'Your Intro is saved!', 'success');
          $scope.project = {};
          saveCB();
        })
        .error(function(error){
          console.log(error);
        });
      }
      function saveCB(data){
        projectsFindAll();
        introsFindAll();
      }
    };
    $scope.editModal = function(){
      if (this.project){
        $scope.selectedProject = this.project;
        Project.findById(this.project._id)
        .then(function(response){
          $scope.project = response.data;
        });
      }else if(this.intro){
        $scope.selectedProject = this.intro;
        Intro.findById(this.intro._id)
        .then(function(response){
          $scope.intro = response.data;
        });
      }
    };
    $scope.updateIntro = function(obj){
      Intro.update(obj)
      .then(function(){
        introsFindAll();
        sweet.show('Check', 'Your Intro is saved!', 'success');
        $('#editIntroModal').modal('hide'); // jshint ignore:line
      })
      .catch(function(err){
        sweet.show('Bugger', 'Your Intro did not save.', 'error');
        console.log(err);
      });
    };
    $scope.updateProject = function(obj){
      Project.update(obj)
      .then(function(){
        projectsFindAll();
        sweet.show('Check', 'Your Project is saved!', 'success');
        $('#editProjectModal').modal('hide'); // jshint ignore:line
      })
      .catch(function(){
        sweet.show('Bugger', 'Your Project did not save.', 'error');
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
          projectsFindAll();
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
          introsFindAll();
        });
      });
    };
    $scope.viewOneProject = function(projectId){
      $state.go('assignments.showProject', {projectId:projectId});
    };
    $scope.viewOneIntro = function(introId){
      $state.go('assignments.showIntro', {introId:introId});
    };
    $scope.toggleIntros = function() {
      $scope.introShow = $scope.introShow === false ? true : false;
    };
    $scope.toggleProjects = function() {
      $scope.projectShow = $scope.projectShow === false ? true : false;
    };
    $('.modal').on('hide.bs.modal', function(){ // jshint ignore:line
      $scope.$apply(function () {
        $scope.message = "Timeout called!";
        $scope.intro = null;
        $scope.project = null;
        $scope.selectedProject = null;
      });
    });
    $('#sel').change(function() { // jshint ignore:line
      var currentVal = $('#projectTech').val(); // jshint ignore:line
      $('#projectTech').val(currentVal + $(this).val() + ",   "); // jshint ignore:line
    });
  });
});
