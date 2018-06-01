let container = document.querySelector('.container');
let pixels = [];
createGrid(16);

function createTemplateRule(number) {
    let rule = ""
    for (let i = 0; i < number; i++) {
        if (i === number - 1) {
            rule += "auto";
        } else {
            rule += "auto ";
        }
    }
    return rule;
}

function createPixels(number) {
    if(pixels.length !== 0) {
        pixels = [];
    }
    for (let i = 0; i < Math.pow(number, 2); i++) {
        let pixel = document.createElement('div');
        pixel.style.border = '1px gray solid';
        pixel.addEventListener('mouseover', makeGray);
        pixels.push(pixel);
    }
}

function createGrid(number) {
    let rule = createTemplateRule(number);
    container.style.gridTemplateColumns = rule;
    container.style.gridTemplateRows = rule;
    createPixels(number);
    pixels.forEach(pixel=>container.appendChild(pixel));
}

function makeGray(event) {
    this.style.backgroundColor = "#929795";
}
