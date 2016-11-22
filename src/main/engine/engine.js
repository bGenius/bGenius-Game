import entityDirective from './angular/entityDirective';
import sceneDirective from './angular/sceneDirective';
import movementFactory from './angular/movementFactory';
import BgUtils from './angular/utils';

(function (angular) {
    if (!angular) {
        throw new Error('angular not defined');
    }

    const module = angular.module('bg.engine', []);
    module.directive('bgEntity', entityDirective);
    module.directive('bgScene', sceneDirective);
    module.value('bgUtils', BgUtils);
    module.factory('bgMovement', movementFactory);

})(window.angular);
