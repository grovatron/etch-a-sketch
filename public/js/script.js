let container = document.querySelector('.container');
let resetBtn = document.querySelector('.reset');
let blackBtn = document.querySelector('.black');
let colorBtn = document.querySelector('.color');
let shadeBtn = document.querySelector('.shade');
let randColor = getRandomColor();

let blackMode = true;
let shadeMode = false;
let randMode = false;

colorBtn.style.backgroundColor = randColor;
colorBtn.style.border = `1px ${randColor} solid`;

let pixels = [];
createGrid(16);

resetBtn.addEventListener('click', resetGrid);
blackBtn.addEventListener('click', setMode);
colorBtn.addEventListener('mouseover', btnHover);
colorBtn.addEventListener('mouseout', btnUnhover);
colorBtn.addEventListener('click', setMode);
colorBtn.addEventListener('click', changeColors);
shadeBtn.addEventListener('click', setMode);

function btnHover(event) {
    this.style.backgroundColor = '#FFF';
    this.style.color = randColor;
}

function btnUnhover(event) {
    this.style.backgroundColor = randColor;
    this.style.color = '#FFF';
}

function changeColors() {
    randColor = getRandomColor();
    colorBtn.style.color = randColor;
    colorBtn.style.border = `1px ${randColor} solid`;
}

function removeBlack() {
    pixels.forEach(pixel => pixel.removeEventListener('mouseover', makeBlack));
}

function removeShade() {
    pixels.forEach(pixel => pixel.removeEventListener('mouseover', shadePixel));
}

function removeRand() {
    pixels.forEach(pixel => pixel.removeEventListener('mouseover', makeRandomColor));
}

function addBlack() {
    pixels.forEach(pixel => pixel.addEventListener('mouseover', makeBlack));
}

function addShade() {
    pixels.forEach(pixel => pixel.addEventListener('mouseover', shadePixel));
}

function addRand() {
    pixels.forEach(pixel => pixel.addEventListener('mouseover', makeRandomColor));
}

function setMode(event) {
    removeBlack();
    removeShade();
    removeRand();
    blackMode = false;
    shadeMode = false;
    randMode = false;
    if (this.className.includes('black')) {
        addBlack();
        blackMode = true;
    } else if (this.className.includes('shade')) {
        addShade();
        shadeMode = true;
    } else {
        addRand();
        randMode = true;
    }
}

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
        if (blackMode) {
            pixel.addEventListener('mouseover', makeBlack);
        } else if (shadeMode) {
            pixel.addEventListener('mouseover', shadePixel);
        } else {
            pixel.addEventListener('mouseover', makeRandomColor);
        }
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

function makeBlack(event) {
    this.style.backgroundColor = "rgb(0,0,0)";
}

function shadePixel(event) {
    if (this.style.backgroundColor === "") {
        this.style.backgroundColor = 'rgba(0,0,0,.1)';
        console.log('pixel shaded');
        return;
    }
    increaseShade(this);
}

function increaseShade(pixel) {
    if (!pixel.style.backgroundColor.includes('rgba')) {
        return;
    }
    let bgColor = pixel.style.backgroundColor;
    let currentShade = parseFloat(bgColor.substring(bgColor.length - 4, bgColor.length - 1));
    pixel.style.backgroundColor = `rgba(0,0,0,${currentShade + .1})`;
}

function makeRandomColor(event) {
    this.style.backgroundColor = getRandomColor();
}

function getRandomColor() {
    let r = getRandomRGBValue();
    let g = getRandomRGBValue();
    let b = getRandomRGBValue();
    return `rgb(${r},${g},${b})`;
}

function getRandomRGBValue() {
    return Math.floor(Math.random() * 256);
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
