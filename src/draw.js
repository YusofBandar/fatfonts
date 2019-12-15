import constant from "../util/constant.js";
import { required } from "../util/accessors.js";

export default function () {
    let font = null,
        node = null;

    function draw(data) {
        draw.svg(data);
    }

    function drawNum(node, svgs, num) {
        let next = num;
        while (next) {
            if (next.number !== 0) {
                let num = node.append("g").html(svgs[next.number - 1]);
                num.select("svg")
                    .attr("x", next.x)
                    .attr("y", next.y)
                    .attr("width", next.dx)
                    .attr("height", next.dx);
            }
            next = next.next;
        }
    }

    function drawCanvasNum(ctx, svgs, num) {
        let next = num;

        while (next) {
            if (next.number !== 0) {
                let img = new Image();
                const pos = next;
                img.onload = () => { ctx.drawImage(img, pos.x, pos.y, pos.dx, pos.dy); }
                img.src = svgs[next.number - 1];
            }
            next = next.next;
        }
    }

    draw.canvas = function (data) {
        font = font();
        node = node();

        let ctx = node.node().getContext("2d");

        const files = [1, 2, 3, 4, 5, 6, 7, 8, 9].map(num => font.path(num));
        for (let i = 0; i < data.length; i++) {
            for (let j = 0; j < data[i].length; j++) {
                setTimeout(() => {
                    drawCanvasNum(ctx, files, data[i][j]);
                }, 0)
            }
        }
    }

    draw.svg = function (data) {
        font = font();
        node = node();

        const files = [1, 2, 3, 4, 5, 6, 7, 8, 9].map(num => font.svg(num));
        Promise.all(files).then((svgs) => {
            for (let i = 0; i < data.length; i++) {
                for (let j = 0; j < data[i].length; j++) {
                    setTimeout(() => {
                        let group = node.append("g");
                        drawNum(group, svgs, data[i][j]);
                    }, 0)
                }
            }
        })
    }

    draw.font = function (x) {
        return arguments.length ? (font = required(x), draw) : font;
    };

    draw.node = function (x) {
        return arguments.length ? (node = typeof x === "function" ? x : constant(x), draw) : node;
    };

    return draw;
}

