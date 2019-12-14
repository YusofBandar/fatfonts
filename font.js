import { required } from "./util/accessors.js";

export default function () {

    let svg = "",
        scaler = [0, 0, 0, 0];

    function font() {
        return {
            svgs: font.svgs,
            scaler: font.scaler
        };
    }

    font.svg = function (x) {
        return arguments.length ? (svg = required(x), font) : svg;
    };

    font.scaler = function (x) {
        return arguments.length ? (scaler = required(x), font) : scaler;
    }

    return font;
}

