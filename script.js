"use strict";
const input = document.querySelector("input");
const selectColor = input.value;
const boxes = document.querySelectorAll(".box");
const box1 = document.querySelector(".box1");
const box2 = document.querySelector(".box2");
const box4 = document.querySelector(".box4");
const box5 = document.querySelector(".box5");
const option = document.querySelector("select");
const boxHsl = document.querySelectorAll(".box-hsl");

document.querySelectorAll("#colorPalette").forEach(option => {
  option.addEventListener("change", start);
});

input.addEventListener("input", start);

function start() {
  displayColorBox();
  displayHEX();
  displayRGB();
  displayHSL();
}

function displayColorBox() {
  document.querySelector(".main-box").style.backgroundColor = input.value;
}

function displayHEX() {
  document.querySelector(".hex").innerHTML = "HEX: " + inputField.value;
}

function displayRGB() {
  let r = hexToRgb(input.value).r;
  let g = hexToRgb(input.value).g;
  let b = hexToRgb(input.value).b;
  document.querySelector(".rgb").innerHTML = `RGB: (${r}, ${g}, ${b})`;
}

function displayHSL() {
  let r = hexToRgb(input.value).r;
  let g = hexToRgb(input.value).g;
  let b = hexToRgb(input.value).b;
  let h = rgbToHsl(r, g, b).h;
  let s = rgbToHsl(r, g, b).s;
  let l = rgbToHsl(r, g, b).l;
  document.querySelector(".hsl").innerHTML = `HSL: (${h}, ${s}%, ${l}%)`;
}

// let colorSelector;
// const defaultColor = "#ab2567";
// document.addEventListener("DOMContentLoaded", start);

// function start() {
//   colorSelector = document.querySelector("#colorSelector");
//   colorSelector.value = defaultColor;
//   colorSelector.addEventListener("input", displayColor);
//   colorSelector.select();
// }

// function displayColor(event) {
//   const box = document.querySelector(".main-box");
//   box.style.backgroundColor = event.target.value;
//   document.querySelector(".hex").textContent = "HEX: " + colorSelector.value;
//   document.querySelector(".rgb").textContent =
//     "RGB: " + hexToRgb(colorSelector.value);
// }

function hexToRgb(h) {
  let r = 0,
    g = 0,
    b = 0;

  r = "0x" + h[1] + h[2];
  g = "0x" + h[3] + h[4];
  b = "0x" + h[5] + h[6];

  return { r: +r, g: +g, b: +b };
}

function rgbToHsl(r, g, b) {
  r /= 255;
  g /= 255;
  b /= 255;

  let h, s, l;

  const min = Math.min(r, g, b);
  const max = Math.max(r, g, b);

  if (max === min) {
    h = 0;
  } else if (max === r) {
    h = 60 * (0 + (g - b) / (max - min));
  } else if (max === g) {
    h = 60 * (2 + (b - r) / (max - min));
  } else if (max === b) {
    h = 60 * (4 + (r - g) / (max - min));
  }

  if (h < 0) {
    h = h + 360;
  }

  l = (min + max) / 2;

  if (max === 0 || min === 1) {
    s = 0;
  } else {
    s = (max - l) / Math.min(l, 1 - l);
  }
  // multiply s and l by 100 to get the value in percent, rather than [0,1]
  s = +(s * 100).toFixed(0);
  l = +(l * 100).toFixed(0);

  changePalette();

  function changePalette() {
    let value = document.querySelector("#colorPalette").value;

    if (value === "analogus") {
      displayAnalogHSL(h, s, l);
    } else if (value === "monochromatic") {
      displayMonochromeHSL(h, s, l);
    } else if (value === "triad") {
      displayTriadHSL(h, s, l);
    } else if (value === "complementary") {
      displayComplementHSL(h, s, l);
    } else if (value === "compound") {
      displayCompoundHSL(h, s, l);
    } else if (value === "shades") {
      displayShadesHSL(h, s, l);
    } else {
      selectColor.forEach(color => {
        color.style.backgroundColor = "#27212c";
      });
    }
  }

  return { h, s, l };

  // console.log("hsl(%f,%f%,%f%)", h, s, l);
  // document.querySelector(".hsl").textContent =
  //   "HSL: " + h + ", " + s + "%, " + l + "%";
}

// ---------COLOR PALLETTE FUNCTIONS ---------------
function displayAnalogHSL(h, s, l) {
  colorPalette.forEach(color => {
    h = h + 20;
    color.style.backgroundColor = `hsl(${h},${s}%,${l}%)`;
  });
}

function displayShadesHSL(h, s, l) {
  colorPalette.forEach(color => {
    l = l + 7;
    color.style.backgroundColor = `hsl(${h},${s}%,${l}%)`;
  });
}

function displayMonochromeHSL(h, s, l) {
  colorPalette.forEach(color => {
    h = h - 20;
    color.style.backgroundColor = `hsl(${h},${s}%,${l}%)`;
  });
}

function displayComplementHSL(h, s, l) {
  box1.style.backgroundColor = `hsl(${h + 180},${s}%,${l}%)`;
  box2.style.backgroundColor = `hsl(${h + 180},${s}%,${l + 20}%)`;
  box4.style.backgroundColor = `hsl(${h},${s}%,${l + 10}%)`;
  box5.style.backgroundColor = `hsl(${h},${s}%,${l + 20}%)`;
}

function displayTriadHSL(h, s, l) {
  box1.style.backgroundColor = `hsl(${h + 60},${s}%,${l}%)`;
  box2.style.backgroundColor = `hsl(${h},${s}%,${l - 7}%)`;
  box4.style.backgroundColor = `hsl(${h},${s}%,${l + 17}%)`;
  box5.style.backgroundColor = `hsl(${h + 120},${s}%,${l}%)`;
}

function displayCompoundHSL(h, s, l) {
  box1.style.backgroundColor = `hsl(${h + 180},${s}%,${l}%)`;
  box2.style.backgroundColor = `hsl(${h + 180},${s - 50}%,${l}%)`;
  box4.style.backgroundColor = `hsl(${h + 20},${s}%,${l}%)`;
  box5.style.backgroundColor = `hsl(${h + 20},${s - 50}%,${l}%)`;
}
