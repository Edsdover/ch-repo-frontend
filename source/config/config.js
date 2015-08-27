'use strict';

angular.module('chRepo')
.config(function($stateProvider, $urlRouterProvider){
  $urlRouterProvider.otherwise('/');

  $stateProvider
  .state('home', {url: '/', templateUrl: '/views/home/home.html', abstract: true})
  .state('home.dashboard', {url: 'dashboard', templateUrl: '/views/home/dashboard.html', controller: 'DashboardCtrl'})
  .state('user', {url: '', templateUrl: '/views/users/user.html', abstract: true})
  .state('home.show', {url: 'dashboard/{projectId}', templateUrl: '/views/home/showOneProject.html', controller: 'HomeAssignmentCtrl'})
  .state('home.showOneIntro', {url: '/dashboard/{introId}', templateUrl: '/views/home/showOneIntro.html', controller: 'HomeIntroCtrl'})

  .state('admins', {url: '/admins', templateUrl: '/views/admins/admins.html', abstract: true})
  .state('admins.userIndex', {url: '/admins/userIndex', templateUrl: '/views/admins/userIndex.html', controller: 'AdminCtrl'})

  .state('cohorts', {url: '/cohorts', templateUrl: '/views/cohorts/cohorts.html', abstract: true})
  .state('cohorts.new', {url: '/cohorts/new', templateUrl: '/views/cohorts/new.html', controller: 'NewCohortCtrl'})
  .state('cohorts.show', {url: '/cohorts/{cohortId}', templateUrl: '/views/cohorts/show.html', controller: 'ShowOneCohortCtrl'})

  .state('intros', {url: '/intros', templateUrl: '/views/intros/intros.html', abstract: true})
  .state('intros.new', {url: '/intros/new', templateUrl: '/views/intros/new.html', controller: 'NewIntroCtrl'})
  .state('intros.edit', {url: '/{introId}/edit', templateUrl: '/views/intros/edit.html', controller: 'EditIntroCtrl'})
  .state('intros.show', {url: '/intros/{introId}', templateUrl: '/views/intros/intros-showOne.html', controller: 'ShowOneIntroCtrl'})


  .state('projects', {url: '/projects', templateUrl: '/views/projects/projects.html', abstract: true})
  .state('projects.new', {url: '/new', templateUrl: '/views/projects/new.html', controller: 'NewProjectCtrl'})
  .state('projects.edit', {url: '/{projectId}/edit', templateUrl: '/views/projects/edit.html', controller: 'EditProjectCtrl'})
  .state('projects.show', {url: '/projects/{projectId}', templateUrl: '/views/projects/projects-showOne.html', controller: 'ShowOneProjectCtrl'})
  .state('projects.index', {url: '/index', templateUrl: '/views/projects/index.html', controller: 'IndexProjectCtrl'});
});
