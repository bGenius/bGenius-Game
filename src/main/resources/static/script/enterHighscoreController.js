(function (angular) {
    'use strict';

    const arkanoid = angular.module('arkanoid');

    arkanoid.controller('EnterHighscoreController', ['$scope', '$uibModalInstance', 'score', 'Restangular', function ($scope, $uibModalInstance, score, Restangular) {
        $scope.score = score;

        $scope.save = function () {
            if ($scope.name && $scope.name.length > 0) {
                Restangular.all('highscores')
                /*
                     Ninth assignment:

                     save the score to the server using a http POST request

                     the post method expects one parameter: the data to send.
                     Since we need to send json we can just use a javascript object,
                     requiring only two fields: playerName and score
                     The information to save can be found in the $scope.

                     */
                    .post(/* something to post */)
                    .finally(function () {
                        $uibModalInstance.close()
                    });
            } else {
                $scope.cancel();
            }
        };

        $scope.cancel = function () {
            $uibModalInstance.dismiss('cancel');
        };
    }]);

})(window.angular);