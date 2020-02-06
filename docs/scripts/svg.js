var SVG = function() {

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

  function printGrainFilter(theme) {
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

  function drawWalls(theme) {
    return `
<rect
  x="0" y="0" width="100%" height="100%"
  fill=" ${theme.colors.fg} "
  filter="url(#grain)"
/>
`;
  }

  function print(theme) {
    return `${svgHeader(theme)}
<defs>
  ${printGrainFilter(theme)}
</defs>
      ${drawWalls(theme)}
    ${svgFooter(theme)}
`;
  }

  // SVG Module
  return {
    // Public Members
    // Public Methods
    print: print
  };
}
