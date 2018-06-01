let container = document.querySelector('.container');
let resetBtn = document.querySelector('.reset');
resetBtn.addEventListener('click', resetGrid);
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
    if (pixels.length !== 0) {
        pixels.forEach(pixel => container.removeChild(pixel));
    }
    let rule = createTemplateRule(number);
    container.style.gridTemplateColumns = rule;
    container.style.gridTemplateRows = rule;
    createPixels(number);
    pixels.forEach(pixel=>container.appendChild(pixel));
}

function makeGray(event) {
    this.style.backgroundColor = "#929795";
}

function resetGrid() {
    if (pixels.length !== 0) {
        pixels.forEach(pixel=>pixel.style.backgroundColor = 'white');
    }
    let number = getDimensions();
    createGrid(number);
}

function getDimensions() {
    let valid = false;
    let number;
    while (!valid) {
        number = prompt('How many pixels per side?');
        console.log(number);
        if (!isNaN(number) && number > 0) {
            valid = true;
        } else {
            alert('Please enter a number larger than 0');
        }
    }
    return parseInt(number);
}
