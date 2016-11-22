export default function () {
    return {
        restrict: 'E',
        scope: {
            size: '<',
            position: '=',
            texture: '<',
            movement: '<',
            name: '@',
            collision: '&'
        },
        require: '^^bgScene',
        link: function (scope, elem, attr, scene) {
            let entity = {
                updateMovement: function (movements) {
                    if (scope.movement) {
                        var performed = null;
                        let callback = function (value) {
                            if (typeof value !== 'undefined') {
                                performed = {entity: entity, oldPosition: scope.position, newPosition: value};
                            } else {
                                return scope.position;
                            }
                        };
                        scope.movement.update(callback);
                        if (performed) {
                            movements.push(performed);
                        }
                    }
                },
                setPosition: function (position) {
                    scope.position = position;
                },
                fireCollision: function (event, actions) {
                    scope.collision({'$event': event, '$actions': actions});
                }
            };
            scene.addEntity(entity);
            scope.$watchCollection('size', function (size) {
                entity.size = size;
                elem.css('width', size[0] + 'px');
                elem.css('height', size[1] + 'px');
            });
            scope.$watchCollection('position', function (position) {
                entity.position = position;
                elem.css('left', position[0] + 'px');
                elem.css('top', position[1] + 'px');
            });
            scope.$watch('texture', function (texture) {
                entity.texture = texture;
                elem.css('background', texture);
            });
            scope.$watch('name', function (name) {
                entity.name = name;
            });
            scope.$watch('movement', function (movement) {
                entity.movement = movement;
            });
            scope.$on('$destroy', function () {
                scene.removeEntity(entity);
            });
        }
    };
}
