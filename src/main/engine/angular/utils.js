export default class BgUtils {
    /**
     * Converts a polar vector of length r and angle theta to a rectangular vector
     * @param r The size of the polar vector
     * @param theta The polar angle of the vector
     * @returns {*[]} a [x,y] vector
     */
    static polar2rectangular(r, theta) {
        return [r * Math.cos(theta), r * Math.sin(theta)];
    }

    static randomBallVelocity(minSpeed, maxSpeed) {
        return this.polar2rectangular(minSpeed + Math.random() * (maxSpeed - minSpeed), Math.random() * Math.PI);
    }

    static randomInt(min, max) {
        return Math.floor(Math.random() * (max - min + 1) + min);
    }

    static randomColor() {
        const colors = ['red', 'green', 'blue', 'yellow', 'orange'];
        return colors[BgUtils.randomInt(0, colors.length - 1)];
    }

    static createBrickField(options) {
        const opts = angular.extend({
            'texture': function (brickX, brickY, x, y, width, height) {
                return 'orange';
            },
            'top': 0,
            'left': 0,
            'bottom': 0,
            'right': 0,
            'marginX': 1,
            'marginY': 1,
            'bricksX': 10,
            'bricksY': 10
        }, options);

        let brickOuterWidth = (opts.width - (opts.left + opts.right)) / opts.bricksX;
        let brickOuterHeight = (opts.height - (opts.top + opts.bottom)) / opts.bricksY;
        let brickInnerWidth = brickOuterWidth - opts.marginX;
        let brickInnerHeight = brickOuterHeight - opts.marginY;

        return new Array(opts.bricksX * opts.bricksY)
            .fill(null)
            .map(function (brick, idx) {
                let x = idx % opts.bricksX;
                let y = Math.floor(idx / opts.bricksX);
                let position = [
                    opts.left + opts.marginX + x * brickOuterWidth,
                    opts.top + opts.marginY + y * brickOuterHeight
                ];
                return {
                    position: position,
                    size: [brickInnerWidth, brickInnerHeight],
                    texture: opts.texture(x, y, position[0], position[1], brickInnerWidth, brickInnerHeight),
                    name: 'brick' + idx,
                    alive: true
                }
            });
    }
};
