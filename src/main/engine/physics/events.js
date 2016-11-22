export class CollisionTarget {

}

const _entity = Symbol['entity'];
export class EntityTarget extends CollisionTarget {
    constructor(entity) {
        super();
        this[_entity] = entity;
    }

    get name() {
        return this[_entity].name;
    }

    get type() {
        return 'entity';
    }
}

const _name = Symbol('name');
export class WallTarget extends CollisionTarget {
    constructor(name) {
        super();
        this[_name] = name;
    }

    get type() {
        return 'wall';
    }

    get name() {
        return this[_name];
    }
}

const _source = Symbol('source');
const _target = Symbol('target');
export class CollisionEvent {
    constructor(source, target) {
        this[_source] = source;
        this[_target] = target;
    }

    get source() {
        return this[_source];
    }

    get target() {
        return this[_target];
    }

}