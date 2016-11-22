(function (angular) {
    'use strict';

    var module = angular.module('arkanoid');
    module.directive('bgScoreboard', [function() {
        return {
            restrict: 'E',
            scope: {
                totalScore: '=score'
            },
            templateUrl: 'templates/scoreboard.html',
            controller: 'ScoreboardController'
        };
    }]);

})(window.angular);
