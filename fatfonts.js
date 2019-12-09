window.onload = fatfonts;


function fatfonts() {

    const width = 2000;
    const height = 2000;

    let svg = d3.select("#fatfonts")
        .append("svg")
        .attr("width", width)
        .attr("height", height)
        .attr("viewBox", "0 0 2000 2000");

    let sizes = sizeNums(9, 9, width, height)
    for (let i = 1; i < 10; i++) {
        cubica(i).then((cubica) => {
            let coord = positionNums(i - 1, i - 1, 9, 9, width, height);

            let num = svg.append("g").html(cubica);
            num.select("svg")
                .attr("x", coord[0])
                .attr("y", coord[1])
                .attr("width", sizes[0])
                .attr("height", sizes[1]);
        })
    }
}

function sizeNums(xLength, yLength, width, height) {
    let dx = width / xLength;
    let dy = height / yLength;
    return [dx, dy];
}

function positionNums(x, y, xLength, yLength, width, height) {
    let xPos = x * (width / xLength);
    let yPos = y * (height / yLength);
    return [xPos, yPos];
}


function cubica(num) {
    const file = `cubica_${num}.svg`;
    let path = "./fonts/cubica/";
    return d3.text(path + file);
}

