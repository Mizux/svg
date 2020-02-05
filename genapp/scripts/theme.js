var Theme = function()  {
  const colorParams = {
    fg: "#ffffff", // white
    bg: "#000000", // black
    color0: "#ff0000", // red
    color1: "#00ff00", // green
    color2: "#0000ff", // blue
    color3: "#ffff00", // yellow
    light: "#ffffff" // white
  };

  const filterParams = {
    seed: 8, // CSS string
    numOctaves: 4,
    baseFrequency: 0.064,
    blendMode: "multiply"
  };

  function resetTheme() {
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
  };


  // Theme Module
  return {
    // Public Members
    name: "default", // CSS string
    colors: colorParams,
    filters: filterParams,
    // Public Methods
    resetTheme: resetTheme
  };
}
