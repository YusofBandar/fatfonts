window.onload = fatfonts;


function fatfonts() {

    const width = 1000;
    const height = 1000;

    let svg = d3.select("#fatfonts")
        .append("svg")
        .attr("width", width)
        .attr("height", height)
        .attr("viewBox", "0 0 1000 100");


    for (let i = 1; i < 10; i++) {
        cubica(i).then((cubica) => {
            let num = svg.append("g").html(cubica);
            num.select("svg")
                .attr("x",100*i)
                .attr("y",-10)
                .attr("width",100)
                .attr("height",100);
        })
    }
}


function cubica(num) {
    const file = `cubica_${num}.svg`;
    let path = "./fonts/cubica/";
    return d3.text(path + file);
}

