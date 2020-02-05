// Theme struct
var theme = new Theme();
var svg = new SVG();

// First define Dat.Gui instances
var themeGUI = new dat.GUI({ load: JSON });
var atlasGUI = new dat.GUI({ load: JSON });

// must be call before gui construction
themeGUI.remember(theme, 'theme');
themeGUI.remember(theme.colors, 'colors');
themeGUI.remember(theme.filters, 'filters');

var themeGUI = themeGUI.addFolder("theme");
{
  themeGUI
    .add(theme, "name", ["Blade Runner", "Deus Ex", "Tron"])
    .onChange(setTheme);
  themeGUI.open();
}

function setTheme() {
  theme.resetTheme();
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

function redraw() {
  document.getElementById("main-div").innerHTML = svg.print(theme);
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

// Init
//theme.name = "Deus Ex";
//setTheme();
//var update = function() {
//  requestAnimationFrame(update);
//  redraw();
//};
//update();

