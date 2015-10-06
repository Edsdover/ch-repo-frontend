'use strict';

angular.module('chRepo')
.config(function($stateProvider, $urlRouterProvider){
  $urlRouterProvider.otherwise('/');

  $stateProvider
  .state('home', {url: '', templateUrl: '/views/home/home.html', abstract: true})
  .state('home.dashboard', {url: '/', templateUrl: '/views/home/dashboard.html', controller: 'DashboardCtrl'})
  .state('user', {url: '', templateUrl: '/views/users/user.html', abstract: true})
  .state('home.show', {url: '/dashboard/{assignmentId}', templateUrl: '/views/home/showOneAssignment.html', controller: 'HomeAssignmentCtrl'})
  .state('home.edit', {url: '{assignmentId}/edit', templateUrl: '/views/home/edit.html', controller: 'EditAssignmentCtrl'})

  .state('admins', {url: '/admins', templateUrl: '/views/admins/admins.html', abstract: true})
  .state('admins.userIndex', {url: '/admins/userIndex', templateUrl: '/views/admins/userIndex.html', controller: 'AdminCtrl'})
  .state('admins.show', {url: '/admins/{studentIds}', templateUrl: '/views/admins/showUser.html', controller: 'userCtrl'})

<<<<<<< HEAD
  .state('cohorts', {url: '/cohorts', templateUrl: '/views/cohorts/cohorts.html', abstract: true})
  .state('cohorts.index', {url: '/cohorts/index', templateUrl: '/views/cohorts/index.html', controller: 'IndexCohortCtrl'})
  .state('cohorts.new', {url: '/cohorts/new', templateUrl: '/views/cohorts/new.html', controller: 'NewCohortCtrl'})
  .state('cohorts.show', {url: '/cohorts/{cohortId}', templateUrl: '/views/cohorts/show.html', controller: 'ShowOneCohortCtrl'})

  .state('intros', {url: '/intros', templateUrl: '/views/intros/intros.html', abstract: true})
  .state('intros.show', {url: '/intros/{introId}', templateUrl: '/views/intros/intros-showOne.html', controller: 'ShowOneIntroCtrl'})


=======
  .state('intros', {url: '/intros', templateUrl: '/views/intros/intros.html', abstract: true})
  .state('intros.show', {url: '/intros/{introId}', templateUrl: '/views/intros/intros-showOne.html', controller: 'ShowOneIntroCtrl'})

>>>>>>> 8e6c4a36480a2f4302c472568e314d10496db36e
  .state('projects', {url: '/projects', templateUrl: '/views/projects/projects.html', abstract: true})
  .state('projects.show', {url: '/projects/{projectId}', templateUrl: '/views/projects/projects-showOne.html', controller: 'ShowOneProjectCtrl'})
  .state('projects.index', {url: '/index', templateUrl: '/views/projects/index.html', controller: 'IndexProjectCtrl'});
});
