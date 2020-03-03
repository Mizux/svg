var SVG = function() {
  const size = {
    width: 1024,
    height: 1024,
  };

  const colors = {
    fg: '#f1f1f1',
    bg: '#101010'
  };

  const filters = {
    seed: 8,
    numOctaves: 4,
    baseFrequency: 0.064,
    blendMode: "multiply"
  };

  const pattern = "paper";

  function getPatternList() {
    return [
      "paper",
      "wood",
    ];
  }

  function getBlendModeList() {
    return [
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
    ];
  }

  function svgHeader(atlas) {
    return `
<svg
  viewBox="0 0 ${size.width} ${size.height}"
  width="${size.width}" height="${size.height}"
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
    seed="${filters.seed}" numOctaves="${filters.numOctaves}"
    baseFrequency="${filters.baseFrequency}"
    stitchTiles="stitch"
    result="noise"
  />
  <feDiffuseLighting
    surfaceScale="2"
    lighting-color=" ${colors.light} "
    in="noise"
    result="diffLight">
    <feDistantLight elevation="33" azimuth="45"/>
  </feDiffuseLighting>
  <feComposite
    operator="in"
    in2="SourceGraphic" result="mask"
  />
  <feBlend
    mode="${filters.blendMode}"
    in="mask" in2="SourceGraphic" result="result"
  />
</filter>
`;
  }

  function drawWalls() {
    return `
<rect
  x="0" y="0" width="100%" height="100%"
  fill=" ${colors.fg} "
  filter="url(#grain)"
/>
`;
  }

  function print() {
    let svg = svgHeader();
    svg += `<defs>`;
    svg += printGrainFilter();
    svg += `</defs>`;
    svg += drawWalls();
    svg += svgFooter();
    return svg;
  }

  // SVG Module
  return {
    // Public Members
    pattern: pattern,
    size: size,
    colors: colors,
    filters: filters,
    // Public Methods
    print: print,
    getBlendModeList: getBlendModeList,
    getPatternList: getPatternList,
  };
}
