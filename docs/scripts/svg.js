var SVG = function() {
  const size = {
    width: 512,
    height: 512,
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
    noise_1: {
      seed = 0,
      numOctaves = 1,
      baseFrequency: 1,
      blendMode: "normal",
      k1: "2.44",
      k2: "0.5",
      k3: "0.5",
      k4: "-0.15",
    },
  };

  const pattern = "paper";

  function getPatternList() {
    return [
      "paper",
      "wood",
      "noise_1",
      "noise_2",
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

  function svgHeader() {
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
    seed="${filters.seed}"
    numOctaves="${filters.numOctaves}"
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

  function printPaperFilter() {
    return `
<filter id="paper" x="0%" y="0%" width="100%" height="100%">
  <feTurbulence
    type="fractalNoise"
    seed="${filters.seed}"
    numOctaves="${filters.numOctaves}"
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

  function printWoodFilter() {
    return `
<filter id="wood" x="0%" y="0%" width="100%" height="100%">
  <feTurbulence
    type="fractalNoise"
    seed="${filters.seed}"
    numOctaves="${filters.numOctaves}"
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

  function printNoise1Filter() {
    return `
<filter id="noise_1" x="0%" y="0%" width="100%" height="100%"
  style="color-interpolation-filters:sRGB;">
  <feTurbulence
     type="turbulence"
     seed="${filter.noise_1.seed}"
     numOctaves="${filters.noise_1.numOctaves}"
     baseFrequency="${filters.noise_1.baseFrequency}"
     stitchTiles="stitch"
     result="noise"
  />
  <feColorMatrix
     type="saturate"
     values="0"
     result="colorMatrix"
  />
  <feComposite
     operator="arithmetic"
     k1="${filter.noise_1.k1}"
     k2="${filter.noise_1.k2}"
     k3="${filter.noise_1.k3}"
     k4="${filter.noise_1.k4}"
     in="SourceGraphic" in2="ColorMatrix" result="mask"
  />
  <feBlend
     mode="${filters.noise_1.blendMode}"
     in="mask" in2="SourceGraphic" result="blend"
  />
  <feComposite
     operator="in"
     in="blend"
     in2="SourceGraphic"
     result="result"
  />
</filter>
`;
  }

  function printNoise2Filter() {
    return `
<filter id="noise_2" x="0%" y="0%" width="100%" height="100%"
  style="color-interpolation-filters:sRGB;">
  <feTurbulence
     type="turbulence"
     seed="${filter.noise_2.seed}"
     numOctaves="${filters.noise_2.numOctaves}"
     baseFrequency="${filters.noise_2.baseFrequency}"
     stitchTiles="stitch"
     result="noise"
  />
  <feColorMatrix
     type="saturate"
     values="0"
     result="colorMatrix"
  />
  <feComposite
     operator="arithmetic"
     k1="${filter.noise_2.k1}"
     k2="${filter.noise_2.k2}"
     k3="${filter.noise_2.k3}"
     k4="${filter.noise_2.k4}"
     in="SourceGraphic" in2="ColorMatrix" result="mask"
  />
  <feBlend
     mode="${filters.noise_2.blendMode}"
     in="mask" in2="SourceGraphic" result="blend"
  />
  <feComposite
     operator="in"
     in="blend"
     in2="SourceGraphic"
     result="result"
  />
</filter>
`;
  }


  function drawPattern() {
    return `
<rect
  x="0" y="0" width="100%" height="100%"
  fill=" ${colors.fg} "
  filter="url(#${pattern})"
/>
`;
  }

  function print() {
    let svg = svgHeader();
    svg += `<defs>`;
    switch(pattern) {
      case 'paper':
        svg += printPaperFilter();
        break;
      case 'wood':
        svg += printWoodFilter();
        break;
      case 'noise_1':
        svg += printNoise1Filter();
        break;
      case 'noise_2':
        svg += printNoise2Filter();
        break;
      default:
        console.log('Sorry, pattern \"' + pattern + '\" unknown.');
    }
    svg += `</defs>`;
    svg += drawPattern();
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
