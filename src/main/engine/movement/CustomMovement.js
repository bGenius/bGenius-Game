import Movement from './Movement'

const _position = Symbol('position');
export default class extends Movement {
    set position(value) {
        this[_position] = value;
    }

    update(callback) {
        if (!angular.equals(callback(), this[_position])) {
            callback(this[_position]);
        }
    }
}