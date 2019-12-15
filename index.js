window.onload = function () {

    /*let img = document.getElementById('my-image');
    let canvas = document.createElement('canvas');
    canvas.width = img.width;
    canvas.height = img.height;
    canvas.getContext('2d').drawImage(img, 0, 0, img.width, img.height);

    const pixel = canvas.getContext('2d').getImageData(0, 0, img.width, img.height);
    
    var x = d3.scaleLinear()
        .domain([0, 255])
        .range([1, 99]);

    let data = [];
    let d = [];
    for (let i = 0; i < pixel.width * pixel.height * 4; i = i + 4) {
        d.push(x(pixel.data[i]));

        if (i !== 0 && i % (pixel.width * 4) === 0) {
            data.push(d);
            d = [];
            continue;
        }
    }*/

    const width = 800;
    const height = 800;

    let canvas1 = d3.select("#fatfonts")
        .append("canvas")
        .attr("width", width)
        .attr("height", height);

    let svg = d3.select("#fatfonts").append("svg")
        .attr("width", width)
        .attr("height", height)
        .attr("viewBox", `0 0 ${width} ${height}`);

    let cubica = font()
        .path(cubicaPath)
        .scaler(cubicaScalers);

    let cubFatfont = fatfonts()
        .size([width, height])
        .padding(0)
        .font(cubica);

    let el = draw()
        .font(cubica)
        .node(canvas1);

    let data = [];
    for (let i = 0; i < 20; i++) {
        let d = [];
        for (let j = 0; j < 20; j++)
            d.push(Math.floor(Math.random() * (99 - 1)) + 1)
        data.push(d);
    }

    el.canvas(cubFatfont(data));
    //el.svg(cubFatfont(data));
};


function cubicaPath(num) {
    const file = `cubica_${num}.svg`;
    const path = "./fonts/cubica/";
    return path + file;
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