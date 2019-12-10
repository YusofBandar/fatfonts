window.onload = function () {
    const data = [[1, 2, 2, 6, 9, 9, 9, 9, 2, 1, 4, 4],
    [1, 9, 2, 6, 9, 9, 9, 9, 2, 1, 4, 4],
    [1, 8, 2, 6, 9, 9, 9, 9, 2, 1, 4, 4],
    [1, 7, 2, 6, 9, 9, 9, 9, 2, 1, 4, 4],
    [1, 6, 2, 6, 9, 9, 9, 9, 2, 1, 4, 4],
    [1, 5, 2, 6, 2, 2, 2, 2, 2, 1, 4, 4],
    [1, 2, 2, 6, 1, 2, 7, 7, 7, 1, 4, 4],
    [1, 2, 2, 6, 9, 9, 9, 9, 2, 1, 4, 4]];

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

    for (let i = 0; i < xLength; i++) {
        let size = sizeNums(data[i].length, 1, width, height);
        size = Math.min(size[0], size[1]);

        for (let j = 0; j < data[i].length; j++) {
            cubica(data[i][j]).then((cubica) => {
                const coord = positionNums(j, i, data[i].length, xLength, width, height);
                drawFont(svg,cubica,coord[0],i*size,size);
            })
        }
    }
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

function positionNums(x, y, xLength, yLength, width, height) {
    const xPos = x * (width / xLength);
    const yPos = y * (height / yLength);
    return [xPos, yPos];
}


function cubica(num) {
    const file = `cubica_${num}.svg`;
    const path = "./fonts/cubica/";
    return d3.text(path + file);
}

