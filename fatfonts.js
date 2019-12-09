window.onload = fatfonts;


function fatfonts() {

    const width = 1000;
    const height = 1000;

    let svg = d3.select("#fatfonts")
        .append("svg")
        .attr("width", width)
        .attr("height", height)
        .attr("viewBox", "0 0 1000 1000");


    for (let i = 1; i < 10; i++) {
        cubica(i).then((cubica) => {
            let coord = positionNums(i-1,i-1,9,9,1000,1000);
            
            let num = svg.append("g").html(cubica);
            num.select("svg")
                .attr("x", coord[0])
                .attr("y", coord[1])
                .attr("width", 100)
                .attr("height", 100);
        })
    }
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

