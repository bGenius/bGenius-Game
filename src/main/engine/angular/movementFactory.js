import AutomaticMovement from '../movement/AutomaticMovement'
import CustomMovement from '../movement/CustomMovement'

export default function () {

    return {
        custom: function () {
            return new CustomMovement();
        },
        automatic: function () {
            return new AutomaticMovement();
        }
    }
}