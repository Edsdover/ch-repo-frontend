'use strict';

angular.module('chRepo')
.controller('IndexProjectCtrl', function($rootScope, $scope, Project, Intro, sweet, $state, User, Cohort, Assignment){

  $scope.tempProject = {};
  $scope.tempIntro = {};

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
  $scope.submit = function(obj){
    console.log('name', $scope.assignment.cohortName);
    obj.projectName = $scope.selectedProject.name;
    obj.projectId = $scope.selectedProject._id;
    obj.introName = $scope.selectedIntro.name;
    console.log($scope.selectedIntro.name);
    obj.introId = $scope.selectedIntro._id;
    Assignment.create(obj)
    .success(function(data){
      console.log('data', data);
      // var email = 'misankovich@gmail.com';
        // Cohort.findOne({cohortName: data.cohortName}, function(err, doc) {
        //   if (doc) {
        //     console.log(doc, 'doc');
        //     var email = doc.cohortEmail;
        //   }
        //   console.log(email, 'email');
        // })
        // .then(function(response){
        //   console.log(response, "Here ya go");
        //   $scope.assignment = response.data;
        // });
        var name = 'Some TA';
        var msg = 'New Assignment at ch-repo.herokuapp.com';
      //   $.ajax({
      //     type: "POST",
      //     url: "https://mandrillapp.com/api/1.0/messages/send.json",
      //     data: {
      //       'key': 'MDTpzgc6BNZ7carbIFxuYw',
      //       'message': {
      //         'from_email': email,
      //         'from_name': name,
      //         'headers': {
      //           'Reply-To': email
      //         },
      //         'subject': 'New Assignment',
      //         'text': msg,
      //         'to': [{
      //           'email': 'misankovich@gmail.com',
      //           'name': 'Michael Sankovich',
      //           'type': 'to'
      //         }]
      //       }
      //     }
      //   })
      //   .done(function(response) {
      //     alert('yaaaaay');
      //   })
      //   .fail(function(response) {
      //     alert('noooooo');
      //   });
      //   return false;
      //
      // sweet.show('Assignment Save Success', 'Success, Your project is saved!', 'success');
      $scope.assignment = {};
    })
    .error(function(error){
      console.log(error);
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
  $scope.deleteIntro = function(intro){
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
  $scope.toggleProjectOn = function(index){
    var project = this.project;
    var indx = $scope.projects.indexOf(this)+1;
    $scope.selectedProject = project;
    $scope.projects.splice(indx, 1);
  };
  $scope.toggleProjectOff = function(){
    var project = $scope.selectedProject;
    $scope.projects.push(project);
    $scope.selectedProject = null;
  };
  $scope.toggleIntroOn = function(index){
    var intro = this.intro;
    var indx = $scope.intros.indexOf(this)+1;
    $scope.selectedIntro = intro;
    $scope.intros.splice(indx, 1);
  };
  $scope.toggleIntroOff = function(){
    var intro = $scope.selectedIntro;
    $scope.intros.push(intro);
    $scope.selectedIntro = null;
  };
});
