window.onload = function () {
    const data = [[1, 1, 1, 1, 1, 1, 1, 1]];

    fatfonts(data);
};

//

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
                let pos = cubicaFont(100, j, i, size);
                let next = pos.next;

                let group = svg.append("g");
                drawFont(group, numbers[5], next.x, next.y, next.size)
                drawFont(group, numbers[data[i][j] - 1], pos.x, pos.y, pos.size);
            }
        }
    })

}



function drawFont(node, svg, x, y, size) {
    let num = node.append("g").html(svg);
    num.select("svg")
        .attr("x", x)
        .attr("y", y)
        .attr("width", size)
        .attr("height", size);
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
    if (pos >= num.length) return

    const xScaler = 0.4 * pos;
    const yScaler = 0.4 * pos;
    const sizeScaler = 0.35 * pos;

    return {
        x: (x + size) - (size * xScaler),
        y: (y + size) - (size * yScaler),
        size: size * sizeScaler
    }


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

