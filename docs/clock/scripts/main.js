import { default as dat } from "./dat.gui.module.js";

// SVG struct
import { SVG } from "./svg.js";
var svg = new SVG(256, 256);
var param = { percent: 50 };

function redraw() {
  document.getElementById("main-div").innerHTML = svg.print(param.percent);
}

// First define Dat.Gui instances
var svgGUI = new dat.GUI({ load: JSON });
// must be call before gui construction
svgGUI.remember(svg, "Svg");
svgGUI.remember(svg.size, "Size");
svgGUI.remember(svg.color, "Color Palette");

svgGUI.add(param, "percent", 0, 100, 1).onChange(redraw);

var sizeGUI = svgGUI.addFolder("Size");
{
  sizeGUI.add(svg.size, "width", 32, 512, 32).onChange(redraw);
  sizeGUI.add(svg.size, "height", 32, 512, 32).onChange(redraw);
  sizeGUI.open();
}

var colorPaletteGUI = svgGUI.addFolder("Color Palette");
{
  colorPaletteGUI.addColor(svg.color, "fg").onChange(redraw);
  colorPaletteGUI.addColor(svg.color, "bg").onChange(redraw);
  colorPaletteGUI.open();
}

// Download button stuff
function triggerDownload(imgURI, svg) {
  var mouse_evt = new MouseEvent("click", {
    view: window,
    bubbles: false,
    cancelable: true,
  });

  var a = document.createElement("a");
  a.setAttribute("download", `clock_${svg.size.width}x${svg.size.height}.png`);
  a.setAttribute("href", imgURI);
  a.setAttribute("target", "_blank");

  a.dispatchEvent(mouse_evt);
}

document.getElementById("btn-png").param = svg;
document.getElementById("btn-png").addEventListener("click", function (evt) {
  var canvas = document.getElementById("canvas");
  const svg = evt.currentTarget.param;
  canvas.width = svg.size.width; // clears the canvas
  canvas.height = svg.size.height; // clears the canvas
  var ctx = canvas.getContext("2d");

  var svg_obj = document.querySelector("svg");
  var data = new XMLSerializer().serializeToString(svg_obj);
  var DOMURL = window.URL || window.webkitURL || window;

  var img = new Image();
  var svgBlob = new Blob([data], { type: "image/svg+xml;charset=utf-8" });
  var url = DOMURL.createObjectURL(svgBlob);

  img.onload = function () {
    ctx.drawImage(img, 0, 0);
    DOMURL.revokeObjectURL(url);

    var imgURI = canvas
      .toDataURL("image/png")
      .replace("image/png", "image/octet-stream");

    triggerDownload(imgURI, svg);
  };

  img.src = url;
});

document.getElementById("btn-svg").param = svg;
document.getElementById("btn-svg").addEventListener("click", function (evt) {
  const svg = evt.currentTarget.param;
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
});

redraw();
