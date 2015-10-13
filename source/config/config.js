'use strict';

angular.module('chRepo')
.config(function($stateProvider, $urlRouterProvider){
  $urlRouterProvider.otherwise('/dashboard');

  $stateProvider
  .state('dashboard', {url: '/dashboard', templateUrl: '/views/dashboard/dashboard.html', controller: 'DashboardCtrl'})

  .state('users', {url: '/users', templateUrl: '/views/users/users.html', abstract: true})
  .state('users.userIndex', {url: '/userIndex', templateUrl: '/views/users/userIndex.html', controller: 'UserCtrl'})
  .state('users.show', {url: '/{studentId}', templateUrl: '/views/users/showUser.html', controller: 'ShowUserCtrl'})

  .state('assignments', {url: '/assignments', templateUrl: '/views/assignments/assignments.html', abstract: true})
  .state('assignments.index', {url: '/index', templateUrl: '/views/assignments/index.html', controller: 'IndexProjectCtrl'})
  .state('assignments.show', {url: '/{assignmentId}', templateUrl: '/views/assignments/showOneAssignment.html', controller: 'AssignmentCtrl'})
  .state('assignments.showIntro', {url: '/showIntro/{introId}', templateUrl: '/views/assignments/intros-showOne.html', controller: 'ShowOneIntroCtrl'})
  .state('assignments.showProject', {url: '/showProject/{projectId}', templateUrl: '/views/assignments/projects-showOne.html', controller: 'ShowOneProjectCtrl'});
});
