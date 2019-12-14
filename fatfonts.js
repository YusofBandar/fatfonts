
let cubica;

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

    cubica = font()
    .path(cubicaPath)
    .scaler(cubicaScalers)();

    let data = [];
    for (let i = 0; i < 20; i++) {
        let d = [];
        for (let j = 0; j < 40; j++)
            d.push(Math.floor(Math.random() * (50 - 10)) + 10)
        data.push(d);
    }
    fatfonts(data);
};


function fatfonts(data) {
    const width = 1000;
    const height = 1000;
    const xLength = data.length;

    let svg = attachSvg("fatfonts", width, height)

    let files =  [1, 2, 3, 4, 5, 6, 7, 8, 9].map(num => cubica.svg(num));
    Promise.all(files).then((svgs) => {
        for (let i = 0; i < xLength; i++) {
            let size = sizeNums(data[i].length, 1, 1000, 1000);
            size = Math.min(size[0], size[1]);

            for (let j = 0; j < data[i].length; j++) {
                setTimeout(() => {
                    let font = cubicaFont(data[i][j], { x: j, y: i, size: size, padding: 10 });
                    let group = svg.append("g");
                    drawFont(group, svgs, font)
                }, 0)
            }
        }
    })
}

function attachSvg(id, width, height) {
    let svg = d3.select("#" + id)
        .append("svg")
        .attr("width", width)
        .attr("height", height)
        .attr("viewBox", "0 0 1000 1000");
    return svg;
}

function attachCanvas(id, width, height) {
    let canvas = d3.select("#" + id)
        .append("canvas")
        .attr("width", width)
        .attr("height", height);

    return canvas;
}

function fatfontsCanvas(data) {
    const width = 5000;
    const height = 5000;
    const xLength = data.length;

    let canvas = attachCanvas("fatfonts", width, height);
    let ctx = canvas.node().getContext("2d");

    const files = [1, 2, 3, 4, 5, 6, 7, 8, 9].map(num => cubicaPath(num));
    for (let i = 0; i < xLength; i++) {
        let size = sizeNums(data[i].length, 1, width, height);
        size = Math.min(size[0], size[1]);

        for (let j = 0; j < data[i].length; j++) {
            setTimeout(() => {
                let font = cubicaFont(data[i][j], { x: j, y: i, size: size, padding: 0 });
                drawFontCanvas(ctx, files, font);
            }, 0)
        }
    }
}

function drawFont(node, svgs, font) {
    let next = font;

    while (next) {
        if (next.number !== 0) {
            let num = node.append("g").html(svgs[next.number - 1]);
            num.select("svg")
                .attr("x", next.x)
                .attr("y", next.y)
                .attr("width", next.size)
                .attr("height", next.size);
        }
        next = next.next;
    }
}

function drawFontCanvas(ctx, svgs, font) {
    let next = font;

    while (next) {
        if (next.number !== 0) {
            let img = new Image();
            const pos = next;
            img.onload = () => { ctx.drawImage(img, pos.x, pos.y, pos.size, pos.size); }
            img.src = svgs[next.number - 1];
        }
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

    if ("padding" in config) size = size - padding;
    let obj = {
        x: coord[0],
        y: coord[1],
        size: size,
        number: Number(numToString(num)[[0]]),
        next: {}
    }

    obj.next = _cubicaFont(1, numToString(num), coord[0], coord[1], size, obj);
    return obj
}

function _cubicaFont(pos, num, x, y, size, parent) {
    if (pos >= num.length || pos >= 5) return

    const scalers = cubica.scaler(num[pos - 1]);

    let obj = {
        x: (x + size) - (size * scalers[0]),
        y: (y + size) - (size * scalers[1]),
        size: size * scalers[2],
        number: Number(num[pos]),
        parent: parent
    }

    let next = _cubicaFont(pos + 1, num, obj.x, obj.y, obj.size, obj);
    if (next) obj.next = next;

    return obj;
}

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