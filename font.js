import { required } from "./util/accessors.js";

export default function () {

    let path = "",
        scaler = [0, 0, 0, 0];

    function font() {
        return {
            svg : svg,
            scaler : scaler
        };
    }

    function svg(num) {
        return d3.text(path(num));
    }

    font.path = function (x) {
        return arguments.length ? (path = required(x), font) : path;
    };

    font.scaler = function (x) {
        return arguments.length ? (scaler = required(x), font) : scaler;
    }

    return font;
}

