import {EntityTarget,WallTarget,CollisionEvent} from '../physics/events'

export default ['$rootScope', '$window', function ($rootScope, $window) {
    return {
        restrict: 'E',
        scope: true,
        controller: [function () {
            let scene = this;
            scene.entities = {};
            this.tick = function () {
                let movements = [];
                for (let id in scene.entities) {
                    scene.entities[id].updateMovement(movements);
                }

                while (movements.length) {
                    var newMovements = [];
                    movements.forEach(function (movement) {
                        let source = movement.entity;
                        movement.entity.setPosition(movement.newPosition);
                        //Check against other entities
                        for (let id in scene.entities) {
                            let target = scene.entities[id];
                            if (source === target) {
                                // Do not check against self
                                continue;
                            }

                            //collision detection taken from https://hamaluik.com/posts/simple-aabb-collision-using-minkowski-difference/

                            //minkowski addition
                            let md = {
                                position: [
                                    target.position[0] - (movement.newPosition[0] + source.size[0]),
                                    target.position[1] - (movement.newPosition[1] + source.size[1])
                                ],
                                size: [
                                    source.size[0] + target.size[0],
                                    source.size[1] + target.size[1]
                                ]
                            };

                            if (md.position[0] <= 0 &&
                                md.position[0] + md.size[0] >= 0 &&
                                md.position[1] <= 0 &&
                                md.position[1] + md.size[1] >= 0) {

                                var minDist = Math.abs(md.position[0]);
                                var penetration = [md.position[0], 0];
                                if (Math.abs(md.position[0] + md.size[0]) < minDist) {
                                    minDist = Math.abs(md.position[0] + md.size[0]);
                                    penetration = [md.position[0] + md.size[0], 0];
                                }
                                if (Math.abs(md.position[1] + md.size[1]) < minDist) {
                                    minDist = Math.abs(md.position[1] + md.size[1]);
                                    penetration = [0, md.position[1] + md.size[1]];
                                }
                                if (Math.abs(md.position[1]) < minDist) {
                                    minDist = Math.abs(md.position[1]);
                                    penetration = [0, md.position[1]];
                                }
                                //Fix position
                                let endPosition = [movement.newPosition[0] + penetration[0], movement.newPosition[1] + penetration[1]];
                                let delta = [movement.newPosition[0] - movement.oldPosition[0], movement.newPosition[1] - movement.oldPosition[1]];
                                let actual = [endPosition[0] - movement.oldPosition[0], endPosition[1] - movement.oldPosition[1]];
                                let restMotion = [delta[0] - actual[0], delta[1] - actual[1]];
                                let friction = (Math.abs(md.position[0]) < Math.abs(md.position[1])) ? [-1, 1] : [1, -1];

                                var handled = false;
                                var actions = {
                                    bounce: function () {
                                        //need to move rest * friction
                                        let bouncedPosition = [
                                            endPosition[0] + (restMotion[0] * friction[0]),
                                            endPosition[1] + (restMotion[1] * friction[1])
                                        ];
                                        //adjust velocity when needed
                                        if (source.movement) {
                                            var v = source.movement.velocity;
                                            if (v) {
                                                //source.movement.velocity = [0,0];
                                                source.movement.velocity = [
                                                    v[0] * friction[0],
                                                    v[1] * friction[1]
                                                ];
                                            }
                                        }
                                        source.setPosition(endPosition);
                                        // newMovements.push({entity : source, oldPosition : endPosition, newPosition: bouncedPosition});
                                        handled = true;
                                    }
                                };

                                var evt = new CollisionEvent(new EntityTarget(source), new EntityTarget(target));
                                source.fireCollision(evt, actions);
                            }
                        }

                        let doWallCollision = function (name, source, endPosition, restMotion, friction) {
                            let evt = new CollisionEvent(new EntityTarget(source), new WallTarget(name));
                            let actions = {
                                bounce: function () {
                                    //need to move rest * friction
                                    let bouncedPosition = [
                                        endPosition[0] + (restMotion[0] * friction[0]),
                                        endPosition[1] + (restMotion[1] * friction[1])
                                    ];
                                    //adjust velocity when needed
                                    if (source.movement) {
                                        var v = source.movement.velocity;
                                        if (v) {
                                            //source.movement.velocity = [0,0];
                                            source.movement.velocity = [
                                                v[0] * friction[0],
                                                v[1] * friction[1]
                                            ];
                                        }
                                    }
                                    source.setPosition(endPosition);
                                    //newMovements.push({entity : source, oldPosition : endPosition, newPosition: bouncedPosition});
                                    handled = true;
                                }
                            };
                            source.fireCollision(evt, actions);
                        };

                        // check against walls

                        if (movement.newPosition[0] < 0) {
                            let endPosition = [0, movement.newPosition[1]];
                            let delta = [movement.newPosition[0] - movement.oldPosition[0], movement.newPosition[1] - movement.oldPosition[1]];
                            let actual = [endPosition[0] - movement.oldPosition[0], endPosition[1] - movement.oldPosition[1]]
                            let restMotion = [delta[0] - actual[0], delta[1] - actual[1]];
                            doWallCollision('left', source, endPosition, restMotion, [-1, 1]);
                        } else if (movement.newPosition[0] + source.size[0] > scene.size[0]) {
                            let endPosition = [scene.size[0] - source.size[0], movement.newPosition[1]];
                            let delta = [movement.newPosition[0] - movement.oldPosition[0], movement.newPosition[1] - movement.oldPosition[1]];
                            let actual = [endPosition[0] - movement.oldPosition[0], endPosition[1] - movement.oldPosition[1]]
                            let restMotion = [delta[0] - actual[0], delta[1] - actual[1]];
                            doWallCollision('right', source, endPosition, restMotion, [-1, 1]);
                        } else if (movement.newPosition[1] < 0) {
                            let endPosition = [movement.newPosition[0], 0];
                            let delta = [movement.newPosition[0] - movement.oldPosition[0], movement.newPosition[1] - movement.oldPosition[1]];
                            let actual = [endPosition[0] - movement.oldPosition[0], endPosition[1] - movement.oldPosition[1]]
                            let restMotion = [delta[0] - actual[0], delta[1] - actual[1]];
                            doWallCollision('top', source, endPosition, restMotion, [1, -1]);
                        } else if (movement.newPosition[1] + source.size[1] > scene.size[1]) {
                            let endPosition = [movement.newPosition[0], scene.size[1] - source.size[1]];
                            let delta = [movement.newPosition[0] - movement.oldPosition[0], movement.newPosition[1] - movement.oldPosition[1]];
                            let actual = [endPosition[0] - movement.oldPosition[0], endPosition[1] - movement.oldPosition[1]]
                            let restMotion = [delta[0] - actual[0], delta[1] - actual[1]];
                            doWallCollision('bottom', source, endPosition, restMotion, [1, -1]);
                        }
                    });
                    movements = newMovements;
                }
            };
            var nextId = 0;
            let entityId = function (entity) {
                if (!('entityId' in entity)) {
                    entity.entityId = nextId++;
                }
                return entity.entityId;
            };
            this.addEntity = function (entity) {
                scene.entities[entityId(entity)] = entity;
            };
            this.removeEntity = function (entity) {
                delete scene.entities[entity.entityId];
            };
        }],
        link: function (scope, elem, attr, scene) {
            scope.$watch(attr.size, function (size) {
                scene.size = size;
                elem.css('width', size[0] + 'px');
                elem.css('height', size[1] + 'px');
            });
            let animCallback = function () {
                scene.tick();
                $rootScope.$digest();
                scene.animRequest = $window.requestAnimationFrame(animCallback);
            };
            scene.animRequest = $window.requestAnimationFrame(animCallback);
            scope.$on('$destroy', function () {
                $window.cancelAnimationFrame(scene.animRequest);
            });
        }
    };
}]