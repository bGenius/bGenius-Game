(function (angular) {
    'use strict';

    var arkanoid = angular.module('arkanoid');

    arkanoid.config(['$stateProvider', '$compileProvider', '$urlRouterProvider', function ($stateProvider, $compileProvider, $urlRouterProvider) {
        $compileProvider.debugInfoEnabled(false);
        $urlRouterProvider.otherwise('/');

        $stateProvider.state('app', {
            abstract: true,
            views: {
                '': {
                    templateUrl: 'templates/main.html'
                },
                'header@app': {
                    templateUrl: 'templates/header.html'
                }
            }
        });
        $stateProvider.state('app.main-menu', {
            url: '/',
            views: {
                'content': {
                    templateUrl: 'templates/main-menu.html'
                }
            }
        });
        $stateProvider.state('app.main-menu.load-game', {
            url: '/load',
            views: {
                'content': {
                    templateUrl: 'templates/load-game.html'
                }
            }
        });

        $stateProvider.state('app.game', {
            url: '/game',
            views: {
                'content': {
                    controller: 'GameController',
                    templateUrl: 'templates/game.html'
                }
            },
            onEnter: ['$rootScope', function($rootScope) {
                $rootScope.animationDisabled = true;
            }],
            onExit: ['$rootScope', function($rootScope) {
                $rootScope.animationDisabled = false;
            }]
        });

        $stateProvider.state('app.highscores', {
            url: '/highscores',
            views: {
                'content': {
                    controller: 'HighscoresController',
                    templateUrl: 'templates/highscores.html',
                    resolve: {
                        highscores: ['Restangular', function (Restangular) {

                            /*
                              Assignment #7: fetch highscores using Restangular
                              Hints:
                              Restangular.all('highscores') gives a collection resource of highscores
                              The getList() method of the collection resource can be used to fetch them from the server
                              and return a promise of the results.

                              Promises are resolved by angular-ui-route, when the results are in they're injected into
                              the controller (HighscoresController)
                             */

                            return [];
                        }]
                    }
                }
            }
        });
    }]);
})(window.angular);