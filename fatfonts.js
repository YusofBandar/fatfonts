window.onload = function () {
    const data = [[11, 1, 11, 11, 1, 1, 111, 11]];

    fatfonts(data);
};


function fatfonts(data) {
    const width = 1000;
    const height = 1000;

    const xLength = data.length;

    let svg = d3.select("#fatfonts")
        .append("svg")
        .attr("width", width)
        .attr("height", height)
        .attr("viewBox", "0 0 1000 1000");

    let files = loadFont("cubica")
    Promise.all(files).then((numbers) => {
        for (let i = 0; i < xLength; i++) {
            let size = sizeNums(data[i].length, 1, width, height);
            size = Math.min(size[0], size[1]);

            for (let j = 0; j < data[i].length; j++) {
                let pos = cubicaFont(data[i][j], j, i, size);
                let group = svg.append("g");

                drawFont(group, numbers[0], pos)
            }
        }
    })

}



function drawFont(node, svg, number) {
    let next = number

    while (next) {
        let num = node.append("g").html(svg);
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

function cubicaFont(num, x, y, size) {
    let coord = positionNums(x, y, size);

    let obj = {
        x: coord[0],
        y: coord[1],
        size: size,
        next: {}
    }

    obj.next = _cubicaFont(1, num.toString(), coord[0], coord[1], size);
    return obj
}

function _cubicaFont(pos, num, x, y, size) {
    if (pos >= num.length || pos >= 5) return

    //TODO need to work out scalers for other numbers
    const xScaler = 0.4;
    const yScaler = 0.4;
    const sizeScaler = 0.35;

    let obj = {
        x: (x + size) - (size * xScaler),
        y: (y + size) - (size * yScaler),
        size: size * sizeScaler
    }

    let next = _cubicaFont(pos + 1, num, obj.x, obj.y, obj.size);
    if (next) {
        obj.next = next;
    }
    return obj;
}

function loadFont(font) {
    let fonts;
    if (font === "cubica") fonts = cubica;
    return files = [1, 2, 3, 4, 5, 6, 7, 8, 9].map(num => fonts(num));
}

function cubica(num) {
    const file = `cubica_${num}.svg`;
    const path = "./fonts/cubica/";
    return d3.text(path + file);
}

