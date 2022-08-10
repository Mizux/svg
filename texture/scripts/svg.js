class SVG {
  constructor() {
    // Public Members
    this.pattern = {
      name: 'paper'
    };
    this.size = {
      width: 512,
      height: 512,
    };
    this.colors = {
      fg: '#f1f1f1',
      bg: '#101010'
    };
    this.filters = {
      paper: {
        seed: 0,
        numOctaves: 4,
        baseFrequency: 0.064,
        blendMode: "multiply",
      },
      wood: {
        seed: 0,
        numOctaves: 4,
        baseFrequency: 0.064,
        blendMode: "multiply",
      },
      noise_one: {
        seed: 0,
        numOctaves: 1,
        baseFrequency: 0.3,
        blendMode: "normal",
        k1: 2.44,
        k2: 0.5,
        k3: 0.5,
        k4: -0.15,
      },
      noise_two: {
        seed: 0,
        numOctaves: 1,
        baseFrequency: 0.3,
        blendMode: "normal",
        k1: 8.0,
        k2: 0.0,
        k3: 2.0,
        k4: 0.0,
      },
    };
  }

  getPatternList() {
    return [
      "paper",
      "wood",
      "noise_one",
      "noise_two",
    ];
  }

  getBlendModeList() {
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

  print() {
    let res = this.#svgHeader();
    res += `<defs>\n`;
    switch(this.pattern.name) {
      case 'paper':
        res += this.#printPaperFilter();
        break;
      case 'wood':
        res += this.#printWoodFilter();
        break;
      case 'noise_one':
        res += this.#printNoise1Filter();
        break;
      case 'noise_two':
        res += this.#printNoise2Filter();
        break;
      default:
        console.log('Sorry, pattern \"' + this.pattern.name + '\" unknown.');
    }
    res += `</defs>\n`;
    res += this.#drawPattern();
    res += this.#svgFooter();
    return res;
  }

  #printPaperFilter() {
    return (
      `<filter id="paper" x="0%" y="0%" width="100%" height="100%">\n` +
      ` <feTurbulence` +
      ` type="fractalNoise"` +
      ` seed="${this.filters.paper.seed}"` +
      ` numOctaves="${this.filters.paper.numOctaves}"` +
      ` baseFrequency="${this.filters.paper.baseFrequency}"` +
      ` stitchTiles="stitch"` +
      ` result="noise"` +
      `/>\n` +
      ` <feDiffuseLighting` +
      ` surfaceScale="2"` +
      ` lighting-color="${this.colors.bg}"` +
      ` in="noise"` +
      ` result="diffLight">\n` +
      `  <feDistantLight elevation="33" azimuth="45"/>\n` +
      ` </feDiffuseLighting>\n` +
      ` <feComposite` +
      ` operator="in"` +
      ` in2="SourceGraphic" result="mask"` +
      `/>\n` +
      ` <feBlend` +
      ` mode="${this.filters.paper.blendMode}"` +
      ` in="mask" in2="SourceGraphic" result="result"` +
      `/>\n` +
      `</filter>\n`);
  }

  #printWoodFilter() {
    return (
      `<filter id="wood" x="0%" y="0%" width="100%" height="100%">\n` +
      ` <feTurbulence` +
      ` type="fractalNoise"` +
      ` seed="${this.filters.wood.seed}"` +
      ` numOctaves="${this.filters.wood.numOctaves}"` +
      ` baseFrequency="${this.filters.wood.baseFrequency}"` +
      ` stitchTiles="stitch"` +
      ` result="noise"` +
      `/>\n` +
      ` <feDiffuseLighting` +
      ` surfaceScale="2"` +
      ` lighting-color="${this.colors.bg}"` +
      ` in="noise"` +
      ` result="diffLight">\n` +
      `  <feDistantLight elevation="33" azimuth="45"/>\n` +
      ` </feDiffuseLighting>\n` +
      ` <feComposite` +
      ` operator="in"` +
      ` in2="SourceGraphic" result="mask"` +
      `/>\n` +
      ` <feBlend` +
      ` mode="${this.filters.wood.blendMode}"` +
      ` in="mask" in2="SourceGraphic" result="result"` +
      `/>\n` +
      `</filter>\n`);
  }

  #printNoise1Filter() {
    return (
      `<filter id="noise_one" x="0%" y="0%" width="100%" height="100%"` +
      ` style="color-interpolation-filters:sRGB;">\n` +
      ` <feTurbulence` +
      ` type="turbulence"` +
      ` seed="${this.filters.noise_one.seed}"` +
      ` numOctaves="${this.filters.noise_one.numOctaves}"` +
      ` baseFrequency="${this.filters.noise_one.baseFrequency}"` +
      ` stitchTiles="stitch"` +
      ` result="noise"` +
      `/>\n` +
      ` <feColorMatrix` +
      ` type="saturate"` +
      ` values="0"` +
      ` result="colorMatrix"` +
      `/>\n` +
      ` <feComposite` +
      ` operator="arithmetic"` +
      ` k1="${this.filters.noise_one.k1}"` +
      ` k2="${this.filters.noise_one.k2}"` +
      ` k3="${this.filters.noise_one.k3}"` +
      ` k4="${this.filters.noise_one.k4}"` +
      ` in="SourceGraphic" in2="ColorMatrix" result="mask"` +
      `/>\n` +
      ` <feBlend` +
      ` mode="${this.filters.noise_one.blendMode}"` +
      ` in="mask" in2="SourceGraphic" result="blend"` +
      `/>\n` +
      ` <feComposite` +
      ` operator="in"` +
      ` in="blend"` +
      ` in2="SourceGraphic"` +
      ` result="result"` +
      `/>\n` +
      `</filter>\n`);
  }

  #printNoise2Filter() {
    return (
      `<filter id="noise_two" x="0%" y="0%" width="100%" height="100%"` +
      ` style="color-interpolation-filters:sRGB;">\n` +
      ` <feTurbulence` +
      ` type="turbulence"` +
      ` seed="${this.filters.noise_two.seed}"` +
      ` numOctaves="${this.filters.noise_two.numOctaves}"` +
      ` baseFrequency="${this.filters.noise_two.baseFrequency}"` +
      ` stitchTiles="stitch"` +
      ` result="noise"` +
      `/>\n` +
      ` <feColorMatrix` +
      ` type="saturate"` +
      ` values="0"` +
      ` result="colorMatrix"` +
      `/>\n` +
      ` <feComposite` +
      ` operator="arithmetic"` +
      ` k1="${this.filters.noise_two.k1}"` +
      ` k2="${this.filters.noise_two.k2}"` +
      ` k3="${this.filters.noise_two.k3}"` +
      ` k4="${this.filters.noise_two.k4}"` +
      ` in="SourceGraphic" in2="ColorMatrix" result="mask"` +
      `/>\n` +
      ` <feBlend` +
      ` mode="${this.filters.noise_two.blendMode}"` +
      ` in="mask" in2="SourceGraphic" result="blend"` +
      `/>\n` +
      ` <feComposite` +
      ` operator="in"` +
      ` in="blend"` +
      ` in2="SourceGraphic"` +
      ` result="result"` +
      `/>\n` +
      `</filter>\n`);
  }

  #drawPattern() {
    return (
      `<rect` +
      ` x="0" y="0" width="100%" height="100%"` +
      ` fill="${this.colors.fg}"` +
      ` filter="url(#${this.pattern.name})"` +
      `/>\n`);
  }

  #svgHeader() {
    return (
      `<svg` +
      ` viewBox="0 0 ${this.size.width} ${this.size.height}"` +
      ` width="${this.size.width}" height="${this.size.height}"` +
      ` xmlns="http://www.w3.org/2000/svg"` +
      ` xmlns:xlink="http://www.w3.org/1999/xlink"` +
      `>\n`);
  }

  #svgFooter() {
    return `</svg>`;
  }
}

export { SVG };
