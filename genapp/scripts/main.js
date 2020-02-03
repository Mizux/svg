// Model
var theme = {
  name: "Deus Ex" // CSS string
};
var colorPalette = {
  fg: "#c0c0c0", // CSS string
  bg: "#202020", // RGB with alpha
  color0: "#c0c0c0", // CSS string
  color1: "#1f5c80", // CSS string
  color2: "#1f805c", // CSS string
  color3: "#805c1f", // CSS string
  light: "#d0d0d0" // CSS string
};
var grain = {
  seed: 8, // CSS string
  numOctaves: 4,
  baseFrequency: 0.064,
  blendMode: "multiply"
};



// First define Dat.Gui instances
var themeGUI = new dat.GUI({ load: JSON });

// must be call before gui construction
themeGUI.remember(theme);
themeGUI.remember(grain);
themeGUI.remember(colorPalette);

var themeGUI = themeGUI.addFolder("theme");
{
  themeGUI
    .add(theme, "name", ["Blade Runner", "Deus Ex", "Tron"])
    .onChange(setTheme);
  themeGUI.open();
}

function setTheme() {
  if (theme.name === "Blade Runner") {
    colorPalette.fg = "#c0c0c0";
    colorPalette.color3 = "#E08119"; // dark Cheddar
    colorPalette.light = "#805c1f";
    grain.baseFrequency = 0.012;
    grain.blendMode = "multiply";
  } else if (theme.name === "Deus Ex") {
    colorPalette.fg = "#202020";
    colorPalette.light = "#a0a0a0";
    grain.baseFrequency = 0.5;
    grain.blendMode = "multiply";
  } else if (theme.name === "Tron") {
    colorPalette.fg = "#000";
    colorPalette.light = "#f0f0f0";
    grain.baseFrequency = 0.064;
  }
  grain.seed = Math.floor(Math.random() * 9);
  updateGUI(colorPaletteGUI, grainGUI);
  redraw();
}

function updateGUI() {
  for (i = 0; i < arguments.length; i++) {
    for (var j in arguments[i].__controllers) {
      arguments[i].__controllers[j].updateDisplay();
    }
  }
}

var colorPaletteGUI = themeGUI.addFolder("Color Palette");
{
  colorPaletteGUI.addColor(colorPalette, "fg").onChange(redraw);
  colorPaletteGUI.addColor(colorPalette, "bg").onChange(redraw);
  colorPaletteGUI.addColor(colorPalette, "color0").onChange(redraw);
  colorPaletteGUI.addColor(colorPalette, "color1").onChange(redraw);
  colorPaletteGUI.addColor(colorPalette, "color2").onChange(redraw);
  colorPaletteGUI.addColor(colorPalette, "color3").onChange(redraw);
  colorPaletteGUI.addColor(colorPalette, "light").onChange(redraw);
  colorPaletteGUI.open();
}

var grainGUI = themeGUI.addFolder("Grain");
{
  grainGUI.add(grain, "seed", 0, 8).onChange(redraw);
  grainGUI.add(grain, "numOctaves", 2, 8, 1).onChange(redraw);
  grainGUI.add(grain, "baseFrequency", 0.00001, 0.7).onChange(redraw);
  grainGUI
    .add(grain, "blendMode", [
      "color",
      "color-burn",
      "color-doge",
      "darken",
      "difference",
      "exclusion",
      "hard-light",
      "hue",
      "lighten",
      "luminosity",
      "multiply",
      "normal",
      "overlay",
      "saturation",
      "screen",
      "soft-light"
    ])
    .onChange(redraw);
  grainGUI.open();
}

// SVG functions
function redraw() {
  document.getElementById("main-div").innerHTML = `${svgHeader()}
<defs>
  ${printGrainFilter()}
</defs>
${drawWalls()}
${svgFooter()}
`;
}

function svgHeader() {
  return `
<svg
  viewBox="0 0 512 512"
  width="512" height="512"
  xmlns="http://www.w3.org/2000/svg"
  xmlns:xlink="http://www.w3.org/1999/xlink">`;
}

function svgFooter() {
  return `</svg>`;
}

function printGrainFilter() {
  return `
<filter id="grain" x="0%" y="0%" width="100%" height="100%">
  <feTurbulence
    type="fractalNoise"
    seed="${grain.seed}" numOctaves="${grain.numOctaves}"
    baseFrequency="${grain.baseFrequency}"
    stitchTiles="stitch"
    result="noise"
  />
  <feDiffuseLighting
    surfaceScale="2"
    lighting-color=" ${colorPalette.light} "
    in="noise"
    result="diffLight">
    <feDistantLight elevation="33" azimuth="45"/>
  </feDiffuseLighting>
  <feComposite
    operator="in"
    in2="SourceGraphic" result="mask"
  />
  <feBlend
    mode="${grain.blendMode}"
    in="mask" in2="SourceGraphic" result="result"
  />
</filter>
`;
}

function drawWalls() {
  return `
<rect
  x="0" y="0" width="100%" height="100%"
  fill=" ${colorPalette.fg} "
  filter="url(#grain)"
/>
`;
}

//function saveSVG() {}

// Init
theme.name = "Deus Ex";
setTheme();
//var update = function() {
//  requestAnimationFrame(update);
//  redraw();
//};
//update();

