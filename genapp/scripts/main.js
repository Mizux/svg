// Theme struct
var theme = new Theme();

// First define Dat.Gui instances
var themeGUI = new dat.GUI({ load: JSON });

// must be call before gui construction
themeGUI.remember(theme);
themeGUI.remember(theme.colors);
themeGUI.remember(theme.filters);

var themeGUI = themeGUI.addFolder("theme");
{
  themeGUI
    .add(theme, "name", ["Blade Runner", "Deus Ex", "Tron"])
    .onChange(setTheme);
  themeGUI.open();
}

function setTheme() {
  if (theme.name === "Blade Runner") {
    theme.colors.fg = "#c0c0c0";
    theme.colors.color3 = "#E08119"; // dark Cheddar
    theme.colors.light = "#805c1f";
    theme.filters.baseFrequency = 0.012;
    theme.filters.blendMode = "multiply";
  } else if (theme.name === "Deus Ex") {
    theme.colors.fg = "#202020";
    theme.colors.light = "#a0a0a0";
    theme.filters.baseFrequency = 0.5;
    theme.filters.blendMode = "multiply";
  } else if (theme.name === "Tron") {
    theme.colors.fg = "#000";
    theme.colors.light = "#f0f0f0";
    theme.filters.baseFrequency = 0.064;
  }
  theme.filters.seed = Math.floor(Math.random() * 9);
  updateGUI(themeGUI, colorPaletteGUI, filterGUI);
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
  colorPaletteGUI.addColor(theme.colors, "fg").onChange(redraw);
  colorPaletteGUI.addColor(theme.colors, "bg").onChange(redraw);
  colorPaletteGUI.addColor(theme.colors, "color0").onChange(redraw);
  colorPaletteGUI.addColor(theme.colors, "color1").onChange(redraw);
  colorPaletteGUI.addColor(theme.colors, "color2").onChange(redraw);
  colorPaletteGUI.addColor(theme.colors, "color3").onChange(redraw);
  colorPaletteGUI.addColor(theme.colors, "light").onChange(redraw);
  colorPaletteGUI.open();
}

var filterGUI = themeGUI.addFolder("Filters");
{
  filterGUI.add(theme.filters, "seed", 0, 8).onChange(redraw);
  filterGUI.add(theme.filters, "numOctaves", 2, 8, 1).onChange(redraw);
  filterGUI.add(theme.filters, "baseFrequency", 0.00001, 0.7).onChange(redraw);
  filterGUI
    .add(theme.filters, "blendMode", [
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
  filterGUI.open();
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
    seed="${theme.filters.seed}" numOctaves="${theme.filters.numOctaves}"
    baseFrequency="${theme.filters.baseFrequency}"
    stitchTiles="stitch"
    result="noise"
  />
  <feDiffuseLighting
    surfaceScale="2"
    lighting-color=" ${theme.colors.light} "
    in="noise"
    result="diffLight">
    <feDistantLight elevation="33" azimuth="45"/>
  </feDiffuseLighting>
  <feComposite
    operator="in"
    in2="SourceGraphic" result="mask"
  />
  <feBlend
    mode="${theme.filters.blendMode}"
    in="mask" in2="SourceGraphic" result="result"
  />
</filter>
`;
}

function drawWalls() {
  return `
<rect
  x="0" y="0" width="100%" height="100%"
  fill=" ${theme.colors.fg} "
  filter="url(#grain)"
/>
`;
}

//function saveSVG() {}

// Init
//theme.name = "Deus Ex";
//setTheme();
//var update = function() {
//  requestAnimationFrame(update);
//  redraw();
//};
//update();

