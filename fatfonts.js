import constant, { constantZero } from "./util/constant.js";
import { required } from "./util/accessors.js";

export default function () {
    let padding = constantZero,
        dx = 1,
        dy = 1,
        font = null;
    function fatfonts(data) {
        let positions = [];
        const yLength = data.length;

        for (let i = 0; i < yLength; i++) {
            let size = numberSize(dx, dy, data[i].length, yLength);
            size = Math.min(size[0], size[1]);

            let xData = [];
            for (let j = 0; j < data[i].length; j++) {
                let num = positionNumbers(data[i][j], font(), { x: j, y: i, dx: size, dy: size, padding: padding });
                xData.push(num);
            }
            positions.push(xData);
        }
        return positions;
    }

    function positionNumbers(num, font, config) {
        let x = config.x,
            y = config.y,
            dx = config.dx,
            dy = config.dy,
            padding = config.padding;

        let coord = numberPosition(x, y, dx, dy);

        dx -= padding() >= 0 ? padding() : 0;
        dy -= padding() >= 0 ? padding() : 0;

        let node = {
            x: coord[0],
            y: coord[1],
            dx: dx,
            dy: dy,
            number: Number(numToString(num)[[0]]),
            next: {}
        }

        node.next = _positionNumbers(1, numToString(num), font, coord[0], coord[1], dx, dy, node);
        return node;
    }

    function _positionNumbers(pos, num, font, x, y, dx, dy, parent) {
        if (pos >= num.length || pos >= 5) return

        const scalers = font.scaler(num[pos - 1]);
        let node = {
            x: (x + dx) - (dx * scalers[0]),
            y: (y + dy) - (dy * scalers[1]),
            dx: dx * scalers[2],
            dy: dy * scalers[2],
            number: Number(num[pos]),
            parent: parent
        }

        let next = _positionNumbers(pos + 1, num, font, node.x, node.y, node.dx, node.dy, node);
        if (next) node.next = next;

        return node;
    }

    function numToString(num) {
        let str = num.toString();
        return str.length <= 1 ? "0" + str : str;
    }

    function numberPosition(x, y, numDx, numDy) {
        const numX = x * numDx;
        const numY = y * numDy;
        return [numX, numY];
    }

    function numberSize(dx, dy, xLen, yLen) {
        const numDx = dx / xLen;
        const numDy = dy / yLen;
        return [numDx, numDy];
    }

    fatfonts.padding = function (x) {
        return arguments.length ? (padding = typeof x === "function" ? x : constant(+x), fatfonts) : padding;
    };

    fatfonts.size = function (x) {
        return arguments.length ? (dx = +x[0], dy = +x[1], fatfonts) : [dx, dy];
    };

    fatfonts.font = function (x) {
        return arguments.length ? (font = required(x), fatfonts) : font;
    };


    return fatfonts;
}

