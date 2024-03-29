import { default as dat } from "./dat.gui.module.js";

// SVG struct
import { SVG } from "./svg.js";
const svg = new SVG();

function updateGUI() {
  for (let i = 0; i < arguments.length; i++) {
    for (let j in arguments[i].__controllers) {
      arguments[i].__controllers[j].updateDisplay();
    }
  }
}

function redraw() {
  document.getElementById("main-div").innerHTML = svg.print();
}

// First define Dat.Gui instances
const svgGUI = new dat.GUI({ load: JSON });
// must be call before gui construction
//svgGUI.remember(svg, 'Svg');
svgGUI.remember(svg.pattern, 'Pattern');
svgGUI.remember(svg.size, 'Size');
svgGUI.remember(svg.colors, 'Color Palette');
svgGUI.remember(svg.filters, 'Filters');

const patternGUI = svgGUI.addFolder("Pattern");
{
  patternGUI.add(svg.pattern, "name", svg.getPatternList()).onChange(setPattern);
  patternGUI.open();
}

function setPattern() {
  //svg.resetPattern(pattern);
  updateGUI(sizeGUI, colorPaletteGUI, filterGUI);
  redraw();
}

const sizeGUI = svgGUI.addFolder("Size");
{
  sizeGUI.add(svg.size, "width", 64, 1024, 64).onChange(redraw);
  sizeGUI.add(svg.size, "height", 64, 1024, 64).onChange(redraw);
  sizeGUI.open();
}

const colorPaletteGUI = svgGUI.addFolder("Color Palette");
{
  colorPaletteGUI.addColor(svg.colors, "fg").onChange(redraw);
  colorPaletteGUI.addColor(svg.colors, "bg").onChange(redraw);
  colorPaletteGUI.open();
}

const filterGUI = svgGUI.addFolder("Filters");
{
  const paperGUI = filterGUI.addFolder("Paper");
  paperGUI.add(svg.filters.paper, "seed", 0, 8).onChange(redraw);
  paperGUI.add(svg.filters.paper, "numOctaves", 2, 8, 1).onChange(redraw);
  paperGUI.add(svg.filters.paper, "baseFrequency", 0.00001, 0.7).onChange(redraw);
  paperGUI.add(svg.filters.paper, "blendMode", svg.getBlendModeList()).onChange(redraw);
  //paperGUI.open();
}
{
  const woodGUI = filterGUI.addFolder("Wood");
  woodGUI.add(svg.filters.wood, "seed", 0, 8).onChange(redraw);
  woodGUI.add(svg.filters.wood, "numOctaves", 2, 8, 1).onChange(redraw);
  woodGUI.add(svg.filters.wood, "baseFrequency", 0.00001, 0.7).onChange(redraw);
  woodGUI.add(svg.filters.wood, "blendMode", svg.getBlendModeList()).onChange(redraw);
  //woodGUI.open();
}
{
  const noise_oneGUI = filterGUI.addFolder("Noise1");
  noise_oneGUI.add(svg.filters.noise_one, "seed", 0, 8).onChange(redraw);
  noise_oneGUI.add(svg.filters.noise_one, "numOctaves", 1, 8, 1).onChange(redraw);
  noise_oneGUI.add(svg.filters.noise_one, "baseFrequency", 0.00001, 0.7).onChange(redraw);
  noise_oneGUI.add(svg.filters.noise_one, "blendMode", svg.getBlendModeList()).onChange(redraw);
  noise_oneGUI.add(svg.filters.noise_one, "k1", -2.5, 2.5, 0.05).onChange(redraw);
  noise_oneGUI.add(svg.filters.noise_one, "k2", -2.5, 2.5, 0.05).onChange(redraw);
  noise_oneGUI.add(svg.filters.noise_one, "k3", -2.5, 2.5, 0.05).onChange(redraw);
  noise_oneGUI.add(svg.filters.noise_one, "k4", -2.5, 2.5, 0.05).onChange(redraw);
  //noise_oneGUI.open();
}
{
  const noise_twoGUI = filterGUI.addFolder("Noise2");
  noise_twoGUI.add(svg.filters.noise_two, "seed", 0, 8).onChange(redraw);
  noise_twoGUI.add(svg.filters.noise_two, "numOctaves", 1, 8, 1).onChange(redraw);
  noise_twoGUI.add(svg.filters.noise_two, "baseFrequency", 0.00001, 0.7).onChange(redraw);
  noise_twoGUI.add(svg.filters.noise_two, "blendMode", svg.getBlendModeList()).onChange(redraw);
  noise_twoGUI.add(svg.filters.noise_two, "k1", -2.5, 2.5, 0.05).onChange(redraw);
  noise_twoGUI.add(svg.filters.noise_two, "k2", -2.5, 2.5, 0.05).onChange(redraw);
  noise_twoGUI.add(svg.filters.noise_two, "k3", -2.5, 2.5, 0.05).onChange(redraw);
  noise_twoGUI.add(svg.filters.noise_two, "k4", -2.5, 2.5, 0.05).onChange(redraw);
  //noise_twoGUI.open();
}

// Download button stuff
function triggerDownload (imgURI) {
  const evt = new MouseEvent('click', {
    view: window,
    bubbles: false,
    cancelable: true
  });

  const a = document.createElement('a');
  a.setAttribute('download', `${svg.pattern.name}_${svg.size.width}x${svg.size.height}.png`);
  a.setAttribute('href', imgURI);
  a.setAttribute('target', '_blank');

  a.dispatchEvent(evt);
}

function save_to_png() {
  const canvas = document.getElementById('canvas');
  canvas.setAttribute('width', `${svg.size.width}`); // clears the canvas
  canvas.setAttribute('height', `${svg.size.height}`); // clears the canvas
  const ctx = canvas.getContext('2d');

  const svg_obj = document.querySelector('svg');
  const data = (new XMLSerializer()).serializeToString(svg_obj);
  const DOMURL = window.URL || window.webkitURL || window;

  const img = new Image();
  const svgBlob = new Blob([data], {type: 'image/svg+xml;charset=utf-8'});
  const url = DOMURL.createObjectURL(svgBlob);

  img.onload = function () {
    ctx.drawImage(img, 0, 0);
    DOMURL.revokeObjectURL(url);

    const imgURI = canvas
        .toDataURL('image/png')
        .replace('image/png', 'image/octet-stream');

    triggerDownload(imgURI);
  };

  img.src = url;
}

document.getElementById("btn-png").addEventListener('click', save_to_png);

function save_to_svg() {
  const svg_obj = document.querySelector('svg');
  const data = (new XMLSerializer()).serializeToString(svg_obj);
  const DOMURL = window.URL || window.webkitURL || window;

  const svgBlob = new Blob([data], {type:"image/svg+xml;charset=utf-8"});
  const svgUrl = DOMURL.createObjectURL(svgBlob);

  const evt = new MouseEvent('click', {
    view: window,
    bubbles: false,
    cancelable: true
  });

  const a = document.createElement('a');
  a.setAttribute('download', `${svg.pattern.name}_${svg.size.width}x${svg.size.height}.svg`);
  a.setAttribute('href', svgUrl);
  a.setAttribute('target', '_blank');

  a.dispatchEvent(evt);
}

document.getElementById("btn-svg").addEventListener('click', save_to_svg);

redraw();
