(function (angular) {
    'use strict';

    var module = angular.module('arkanoid');
    module.controller('ScoreboardController', ['$scope', '$interval', function($scope, $interval) {
        $scope.bricksScore = 0;
        $scope.alive = 0;
        $scope.bonusScore = 3000;

        var runningInterval;

        $scope.$on('ARKANOID_START', function() {
            $scope.bricksScore = 0;
            $scope.alive = 1;
            $scope.bonusScore -= $scope.alive;

            runningInterval = $interval(function() {
                $scope.alive++;
                $scope.bonusScore--;
            }, 1000);
        });

        $scope.$on('ARKANOID_DONE', function() {
            if (runningInterval) {
                $interval.cancel(runningInterval);
                runningInterval = false;
            }
        });

        $scope.$on('ARKANOID_UPDATE_SCORE', function(event, brick) {
            $scope.bricksScore += brick.texture.length * 10;
        });

        $scope.$watch(function() {
            $scope.totalScore = $scope.bricksScore > 0 ? $scope.bricksScore + $scope.bonusScore : 0;
        });

        $scope.$on('$destroy', function() {
            if (runningInterval) {
                $interval.cancel(runningInterval);
            }
        });
    }]);

})(window.angular);
