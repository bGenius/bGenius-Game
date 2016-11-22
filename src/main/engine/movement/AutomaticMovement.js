import Movement from './Movement'

const _velocity = Symbol('velocity');
export default class extends Movement {
    constructor() {
        super();
        this[_velocity] = [0, 0];
    }

    set velocity(value) {
        this[_velocity] = value;
    }

    get velocity() {
        return this[_velocity];
    }

    update(callback) {
        let old = callback();
        if (this[_velocity][0] !== 0 || this[_velocity][1] !== 0) {
            callback([old[0] + this[_velocity][0], old[1] + this[_velocity][1]]);
        }
    }
}