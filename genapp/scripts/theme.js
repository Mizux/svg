var Theme = function()  {
  var colorParams = {
    fg: "#ffffff", // white
    bg: "#000000", // black
    color0: "#ff0000", // red
    color1: "#00ff00", // green
    color2: "#0000ff", // blue
    color3: "#ffff00", // yellow
    light: "#ffffff" // white
  };

  var filterParams = {
    seed: 8, // CSS string
    numOctaves: 4,
    baseFrequency: 0.064,
    blendMode: "multiply"
  };

  // Model
  var theme = {
    name: "default", // CSS string
    colors: colorParams,
    filters: filterParams
  };

  return theme;
}
