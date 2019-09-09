"use strict";
let colorSelector;
const defaultColor = "#ab2567";
document.addEventListener("DOMContentLoaded", start);

function start() {
  colorSelector = document.querySelector("#colorSelector");
  colorSelector.value = defaultColor;
  colorSelector.addEventListener("input", displayColor);
  colorSelector.select();
}

function displayColor(event) {
  const box = document.querySelector(".box");
  box.style.backgroundColor = event.target.value;
  document.querySelector(".hex").textContent = "HEX: " + colorSelector.value;
  document.querySelector(".rgb").textContent =
    "RGB: " + hexToRgb(colorSelector.value);
}

function hexToRgb(color) {
  let r = 0,
    g = 0,
    b = 0;

  r = "0x" + color[1] + color[2];
  g = "0x" + color[3] + color[4];
  b = "0x" + color[5] + color[6];

  rgbToHsl(r, g, b);

  return +r + ", " + +g + ", " + +b;
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
  s *= 100;
  l *= 100;

  console.log("hsl(%f,%f%,%f%)", h, s, l);
  document.querySelector(".hsl").textContent =
    "HSL: " + h + ", " + s + "%, " + l + "%";
}
