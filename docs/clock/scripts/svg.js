class SVG {
  constructor(width, height) {
    this.size = {};
    this.size.width = width;
    this.size.height = height;
    this.color = {};
    this.color.bg = "#111";
    this.color.fg = "#C00";
  }
  
  print(percent) {
    let res = this.#svgHeader();
    //res += `<defs>`;
    //res += `</defs>`;
    res += this.#drawBG();
    res += this.#drawRect();
    res += this.#drawPattern(percent);
    res += this.#svgFooter();
    return res;
  }
  
  #drawBG() {
    return (
      `<rect` +
      ` x="0" y="0" width="100%" height="100%"` +
      ` fill="${this.color.bg}"` +
      `/>`
    );
  }
  
  #drawRect() {
    return (
      `<rect` +
      ` x="10%" y="10%" width="80%" height="80%"` +
      ` fill="none" stroke="${this.color.fg}"` +
      `/>`
    );
  }
  
  #drawPattern(percent) {
    const angle = percent * 360 / 100;
    console.log({angle});
    let res = "";
    return res;
  }
  
  #svgHeader() {
    return (
      `<svg` +
      ` viewBox="0 0 ${this.size.width} ${this.size.height}"` +
      ` width="${this.size.width}" height="${this.size.height}"` +
      ` xmlns="http://www.w3.org/2000/svg"` +
      ` xmlns:xlink="http://www.w3.org/1999/xlink"` +
      `>`
    );
  }
  
  #svgFooter() {
    return `</svg>`;
  }
}

export {SVG};