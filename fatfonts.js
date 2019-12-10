window.onload = function () {
    const data = [[1, 2, 3, 4, 5, 6, 7, 8, 9]];

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
                const coord = positionNums(j, i, size);
                drawFont(svg, numbers[data[i][j]-1], coord[0], coord[1], size);
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

function loadFont(font) {
    let fonts;
    if(font === "cubica") fonts = cubica;
    return files = [1, 2, 3, 4, 5, 6, 7, 8, 9].map(num => fonts(num));
}

function cubica(num) {
    const file = `cubica_${num}.svg`;
    const path = "./fonts/cubica/";
    return d3.text(path + file);
}

