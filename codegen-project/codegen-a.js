const canvas = document.getElementById('canvas');
const ctx = canvas.getContext('2d');

canvas.height = window.innerHeight;
canvas.width = window.innerWidth;

let letters = 'AB1CDEFGHIJKLMNOPQRS3TUVXYZABCDEFGHIJ4KLMNOPQRSTUV5XYZABCDEFGHIJK5LMNOPQRSTUVXYZABCDEF2GHIJKLMNOPQR7STUVXYZABCD42EFGHIJKLMNO2PQRSTUVXYZABCDEFG9HIJKLM9NOPQRSTUVXYZ';
letters = letters.split('');

let fontSize = 15;
let columns = canvas.width / fontSize;

let drops = [];
for (let i = 0; i < columns; i++) {
    drops[i] = 1;
}

function draw() {
    ctx.fillStyle = 'rgba(0, 0, 0, 0.1)';
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    ctx.fillStyle = '#0f0';
    ctx.font = `${fontSize}px monospace`; // Set the font size and type
    for (let i = 0; i < drops.length; i++) {
        let text = letters[Math.floor(Math.random() * letters.length)];
        ctx.fillText(text, i * fontSize, drops[i] * fontSize);
        drops[i]++;
        if (drops[i] * fontSize > canvas.height && Math.random() > 0.95) {
            drops[i] = 0;
        }
    }
}

setInterval(draw, 33);

const container = document.querySelectorAll(".slider-container");
let tooltipTimeout;

for (let i = 0; i < container.length; i++) {
    const slider = container[i].querySelector(".slider");
    const thumb = container[i].querySelector(".slider-thumb");
    const tooltip = container[i].querySelector(".tooltip");
    const progress = container[i].querySelector(".progress");

    function customSlider() {
        //gets percentage
        const maxVal = slider.getAttribute("max");
        const val = ((slider.value - 4)/ (maxVal - 4)) * 93 + "%";

        //display value in tooltip
        tooltip.innerHTML = slider.value;

        //set thumb and progress to the current value
        progress.style.width = val;
        thumb.style.left = val;

        tooltip.style.opacity = 1;

        clearTimeout(tooltipTimeout);

        tooltipTimeout = setTimeout(() => {
            tooltip.style.opacity = 0;
        }, 3000);
    }
    customSlider();

    //use function when slider moves
    slider.addEventListener("input", () => {
        customSlider();
    })
}

const buttonSwitch = document.getElementById("gen-button");

function changeGradient() {

    buttonSwitch.style.background = "linear-gradient(to bottom right, rgb(46, 206, 228, 0.5), rgb(36, 93, 177, 0.5))"
}

function resetGradient() {
    buttonSwitch.style.background = "linear-gradient(to bottom right, rgb(31, 34, 33, 0.5), rgb(61, 62, 63, 0.5), rgb(26, 27, 27, 0.5))"
}

buttonSwitch.addEventListener("mousedown", changeGradient);
buttonSwitch.addEventListener("mouseup", resetGradient);
buttonSwitch.addEventListener("mouseleave", resetGradient);


function generatePassword() {
    const slider = document.querySelector(".slider");
    const passwordLenght = parseInt(slider.value);

    const includeCamelCase = document.getElementById("check1").checked;
    const includeNumbers = document.getElementById("check2").checked;
    const includeSpecialSymbols = document.getElementById("check3").checked;

    const lowerCaseChars = "abcdefghijklmnopqrstuvwxyz";
    const upperCaseChars = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
    const numbers = "0123456789";
    const specialChars = "!@#$%^&*()_+{}[]?/";

    let availableChars = lowerCaseChars;

    if (includeCamelCase) {
        availableChars += upperCaseChars;
    }

    if (includeNumbers) {
        availableChars += numbers;
    }

    if (includeSpecialSymbols) {
        availableChars += specialChars;
    }

    let password = "";

    for (let i = 0; i < passwordLenght; i++) {
        const randomIndex = Math.floor(Math.random() * availableChars.length);
        password += availableChars[randomIndex];
    }
    return password;
}

function genAndDipslayPass() {
    const password = generatePassword();
    const resultEl = document.getElementById("result");
    resultEl.textContent = password;
}

const genButton = document.getElementById("gen-button");
genButton.addEventListener("click", genAndDipslayPass);