// taken from d3 https://d3js.org/
export function constantZero() {
    return 0;
}

export default function (x) {
    return function () {
        return x;
    };
}