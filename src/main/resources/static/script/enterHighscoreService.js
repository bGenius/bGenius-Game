(function (angular) {
    'use strict';

    const arkanoid = angular.module('arkanoid');

    arkanoid.service('EnterHighscoreService', ['$uibModal', function ($uibModal) {
        return {
            openModal: function(score) {
                var modal = $uibModal.open({
                    templateUrl: 'templates/enter-highscore-modal.html',
                    controller: 'EnterHighscoreController',
                    resolve: {
                        score: function () {
                            return score;
                        }
                    }
                });

                return modal.result;
            }
        };
    }]);

})(window.angular);