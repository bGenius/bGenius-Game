(function (angular) {
    'use strict';

    var arkanoid = angular.module('arkanoid');
    arkanoid.controller('GameController', ['$scope', '$interval', 'bgMovement', 'bgUtils', 'EnterHighscoreService', 'moment', function (scope, interval, bgMovement, bgUtils, enterHighscoreService, moment) {
        scope.field = {size: [300, 500]};

        const reset = function () {
            scope.started = false;
            scope.bricks = bgUtils.createBrickField({
                texture: bgUtils.randomColor,
                top: 50,
                bottom: 300,
                left: 10,
                right: 10,
                width: scope.field.size[0],
                height: scope.field.size[1]
            }).reduce(function (hash, brick) {
                hash[brick.name] = brick;
                return hash;
            }, {});
            scope.ball = {
                size: [16, 16],
                position: [150, 300],
                movement: bgMovement.automatic(),
                texture: "url('/img/ball.png')"
            };
            scope.paddle = {
                size: [100, 20],
                position: [0, 480],
                movement: bgMovement.custom(),
                texture: "url('/img/paddle.png')"
            };
        };

        const enterHighscoreAndReset = function (score) {
            enterHighscoreService
                .openModal(score)
                .finally(reset);
        };

        scope.updateMouse = function (event) {
            scope.paddle.movement.position = [event.offsetX - 50, 480];
        };

        reset();

        // Insert your assignments code in here.
    }]);
})(window.angular);
