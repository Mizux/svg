import { default as dat } from "./dat.gui.module.js";

// SVG struct
import { SVG } from "./svg.js";
const svg = new SVG(256, 256);
const param = { percent: 50 };

function redraw() {
  const node = document.getElementById("main-div")
  node.replaceChildren(svg.generate(param.percent));
  //console.log(svg.generate(param.percent))
}

// First define Dat.Gui instances
const svgGUI = new dat.GUI({ load: JSON });
// must be call before gui construction
svgGUI.remember(param);
svgGUI.remember(svg.size, "Size");
svgGUI.remember(svg.color, "Color Palette");

svgGUI.add(param, "percent", 0, 100, 1).onChange(redraw);

const sizeGUI = svgGUI.addFolder("Size");
{
  sizeGUI.add(svg.size, "width", 32, 512, 32).onChange(redraw);
  sizeGUI.add(svg.size, "height", 32, 512, 32).onChange(redraw);
  sizeGUI.open();
}

const colorPaletteGUI = svgGUI.addFolder("Color Palette");
{
  colorPaletteGUI.addColor(svg.color, "fg").onChange(redraw);
  colorPaletteGUI.addColor(svg.color, "bg").onChange(redraw);
  colorPaletteGUI.open();
}

// Download button stuff
function triggerDownload(imgURI, svg) {
  const mouse_evt = new MouseEvent("click", {
    view: window,
    bubbles: false,
    cancelable: true,
  });

  const a = document.createElement("a");
  a.setAttribute("download", `clock_${svg.size.width}x${svg.size.height}.png`);
  a.setAttribute("href", imgURI);
  a.setAttribute("target", "_blank");

  a.dispatchEvent(mouse_evt);
}

function save_to_png() {
  const canvas = document.getElementById("canvas");
  //const svg = evt.currentTarget.param;
  canvas.width = svg.size.width; // clears the canvas
  canvas.height = svg.size.height; // clears the canvas
  const ctx = canvas.getContext("2d");

  const svg_obj = document.querySelector("svg");
  const data = new XMLSerializer().serializeToString(svg_obj);
  const DOMURL = window.URL || window.webkitURL || window;

  const img = new Image();
  const svgBlob = new Blob([data], { type: "image/svg+xml;charset=utf-8" });
  const url = DOMURL.createObjectURL(svgBlob);

  img.onload = function () {
    ctx.drawImage(img, 0, 0);
    DOMURL.revokeObjectURL(url);

    const imgURI = canvas
      .toDataURL("image/png")
      .replace("image/png", "image/octet-stream");

    triggerDownload(imgURI, svg);
  };

  img.src = url;
}

document.getElementById("btn-png").addEventListener("click", save_to_png);

function save_to_svg() {
  const svg_obj = document.querySelector("svg");
  const data = new XMLSerializer().serializeToString(svg_obj);
  const DOMURL = window.URL || window.webkitURL || window;

  const svgBlob = new Blob([data], { type: "image/svg+xml;charset=utf-8" });
  const svgUrl = DOMURL.createObjectURL(svgBlob);

  const mouse_evt = new MouseEvent("click", {
    view: window,
    bubbles: false,
    cancelable: true,
  });

  const a = document.createElement("a");
  a.setAttribute("download", `clock_${svg.size.width}x${svg.size.height}.svg`);
  a.setAttribute("href", svgUrl);
  a.setAttribute("target", "_blank");

  a.dispatchEvent(mouse_evt);
}

document.getElementById("btn-svg").addEventListener("click", save_to_svg);

redraw();
