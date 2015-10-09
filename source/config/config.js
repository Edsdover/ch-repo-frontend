'use strict';

angular.module('chRepo')
.config(function($stateProvider, $urlRouterProvider){
  $urlRouterProvider.otherwise('/');

  $stateProvider
  .state('dashboard', {url: '/dashboard', templateUrl: '/views/dashboard/dashboard.html', abstract: true})
  .state('dashboard.home', {url: '/home', templateUrl: '/views/dashboard/homepage.html', controller: 'DashboardCtrl'})

  .state('admins', {url: '/admins', templateUrl: '/views/admins/admins.html', abstract: true})
  .state('admins.userIndex', {url: '/userIndex', templateUrl: '/views/admins/userIndex.html', controller: 'AdminCtrl'})
  .state('admins.show', {url: '/{studentId}', templateUrl: '/views/admins/showUser.html', controller: 'userCtrl'})

  .state('assignments', {url: '/assignments', templateUrl: '/views/assignments/assignments.html', abstract: true})
  .state('assignments.index', {url: '/index', templateUrl: '/views/assignments/index.html', controller: 'IndexProjectCtrl'})
  .state('assignments.show', {url: '/{assignmentId}', templateUrl: '/views/assignments/showOneAssignment.html', controller: 'AssignmentCtrl'})
  .state('assignments.showIntro', {url: '/showIntro/{introId}', templateUrl: '/views/assignments/intros-showOne.html', controller: 'ShowOneIntroCtrl'})
  .state('assignments.showProject', {url: '/showProject/{projectId}', templateUrl: '/views/assignments/projects-showOne.html', controller: 'ShowOneProjectCtrl'});
});
