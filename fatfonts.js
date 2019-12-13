window.onload = function () {
    const data = [];

    for (let i = 0; i < 10; i++) {
        let d = [];
        for (let j = 0; j < 20; j++)
            d.push(Math.floor(Math.random() * (50 - 10)) + 10)
        data.push(d);
    }

    fatfonts(data);
};


function fatfonts(data) {
    const width = 2000;
    const height = 2000;

    const xLength = data.length;

    let svg = d3.select("#fatfonts")
        .append("svg")
        .attr("width", width)
        .attr("height", height)
        .attr("viewBox", "0 0 1000 1000");

    let files = loadFont("cubica")
    Promise.all(files).then((svgs) => {
        for (let i = 0; i < xLength; i++) {
            let size = sizeNums(data[i].length, 1, 1000, 1000);
            size = Math.min(size[0], size[1]);

            for (let j = 0; j < data[i].length; j++) {
                let font = cubicaFont(data[i][j], { x: j, y: i, size: size, padding:10 });

                let group = svg.append("g");
                drawFont(group, svgs, font)
            }
        }
    })

}



function drawFont(node, svgs, font) {
    let next = font;

    while (next) {
        if (node.number === 0) continue;

        let num = node.append("g").html(svgs[next.number - 1]);
        num.select("svg")
            .attr("x", next.x)
            .attr("y", next.y)
            .attr("width", next.size)
            .attr("height", next.size);
        next = next.next;
    }

}

function sizeNums(xLength, yLength, width, height) {
    const dx = width / xLength;
    const dy = height / yLength;
    return [dx, dy];
}

function positionNums(x, y, size) {
    const xPos = x * size;
    const yPos = y * size;
    return [xPos, yPos];
}

function numToString(num) {
    let str = num.toString();
    return str.length <= 1 ? "0" + str : str;
}

function cubicaFont(num, config) {
    ({ x, y, size, padding } = config);

    let coord = positionNums(x, y, size);

    if("padding" in config) size = size - padding;
    let obj = {
        x: coord[0],
        y: coord[1],
        size: size,
        number: Number(numToString(num)[[0]]),
        next: {}
    }

    obj.next = _cubicaFont(1, numToString(num), coord[0], coord[1], size , obj);
    return obj
}

function _cubicaFont(pos, num, x, y, size, parent) {
    if (pos >= num.length || pos >= 5) return

    //TODO need to work out scalers for other numbers
    const scalers = cubicaScalers(num[pos - 1]);

    let obj = {
        x: (x + size) - (size * scalers[0]),
        y: (y + size) - (size * scalers[1]),
        size: size * scalers[2],
        number: Number(num[pos]),
        parent: parent
    }

    let next = _cubicaFont(pos + 1, num, obj.x, obj.y, obj.size, obj);
    if (next) {
        obj.next = next;
    }
    return obj;
}

function cubicaScalers(num) {
    num = Number(num);

    let xScaler;
    let yScaler;
    let sizeScaler;

    switch (num) {
        case 0:
            xScaler = 0.7;
            yScaler = 0.7;
            sizeScaler = 0.35;
            break;
        case 1:
            xScaler = 0.4;
            yScaler = 0.4;
            sizeScaler = 0.35;
            break;
        case 2:
            xScaler = 0.65;
            yScaler = 0.45;
            sizeScaler = 0.35;
            break;
        case 3:
            xScaler = 0.9;
            yScaler = 0.45;
            sizeScaler = 0.35;
            break;
        case 4:
            xScaler = 0.75;
            yScaler = 0.78;
            sizeScaler = 0.3;
            break;
        case 5:
            xScaler = 0.70;
            yScaler = 0.45;
            sizeScaler = 0.3;
            break;
        case 6:
            xScaler = 0.65;
            yScaler = 0.45;
            sizeScaler = 0.3;
            break;
        case 7:
            xScaler = 0.3;
            yScaler = 0.3;
            sizeScaler = 0.3;
            break;
        case 8:
            xScaler = 0.65;
            yScaler = 0.41;
            sizeScaler = 0.3;
            break;
        case 9:
            xScaler = 0.65;
            yScaler = 0.8;
            sizeScaler = 0.3;
            break;

    }

    return [xScaler, yScaler, sizeScaler];
}

function loadFont(fontType) {
    let svgFunc;
    if (fontType === "cubica") svgFunc = cubica;
    return files = [1, 2, 3, 4, 5, 6, 7, 8, 9].map(num => svgFunc(num));
}

function cubica(num) {
    const file = `cubica_${num}.svg`;
    const path = "./fonts/cubica/";
    return d3.text(path + file);
}

