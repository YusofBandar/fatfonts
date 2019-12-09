window.onload = function () {
    const data = [1, 2, 2, 6, 9, 9, 9, 9, 2, 1, 4, 4];

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

    let size = sizeNums(xLength, 1, width, height);
    size = Math.min(size[0],size[1]);
    
    for (let i = 0; i < xLength; i++) {
        cubica(data[i]).then((cubica) => {
            const coord = positionNums(i, 0, xLength, 1, width, height);

            let num = svg.append("g").html(cubica);
            num.select("svg")
                .attr("x", coord[0])
                .attr("y", coord[1])
                .attr("width", size)
                .attr("height", size);
        })
    }
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

