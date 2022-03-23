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
      `/>` + "\n"
    );
  }

  #drawRect() {
    return (
      `<rect` +
      ` x="10%" y="10%" width="80%" height="80%"` +
      ` fill="none" stroke="${this.color.fg}"` +
      `/>` + "\n"
    );
  }

  //315    0    45
  // +-----+-----+
  // |\    |    /|
  // | \   |   / |
  // |  \  |  /  |
  // |   \ | /   |
  // |-----x-----|
  // |   / | \   |
  // |  /  |  \  |
  // | /   |   \ |
  // |/    |    \|
  // +-----+-----+
  //225        135
  #drawPattern(percent) {
    const angle = (percent * 360) / 100;
    if (angle < 0) angle = 0;
    if (angle > 360) angle = 360;
    //console.log({angle});

    let res = "";
    if (angle <= 45) {
      // [0°,45°]
      res +=
        `<polygon` +
        ` points="` +
        ` ${this.size.width / 2},${this.size.height / 2}` +
        ` ${this.size.width / 2},${this.size.height * 0.1}` +
        ` ${this.size.width * (0.5 + (0.4 * angle) / 45)},${this.size.height * 0.1}` +
        `" fill="${this.color.fg}" stroke="none"` +
        `/>`;
    } else if (angle <= 135) {
      // [45°,135°]
      res +=
        `<polygon` +
        ` points="` +
        ` ${this.size.width / 2},${this.size.height / 2}` +
        ` ${this.size.width / 2},${this.size.height * 0.1}` +
        ` ${this.size.width * 0.9},${this.size.height * 0.1}` +
        ` ${this.size.width * 0.9},${this.size.height * (0.1 + (0.8 * (angle - 45)) / 90)}` +
        `" fill="${this.color.fg}" stroke="none"` +
        `/>`;
    } else if (angle <= 225) {
      // [135°,225°]
      res +=
        `<polygon` +
        ` points="` +
        ` ${this.size.width / 2},${this.size.height / 2}` +
        ` ${this.size.width / 2},${this.size.height * 0.1}` +
        ` ${this.size.width * 0.9},${this.size.height * 0.1}` +
        ` ${this.size.width * 0.9},${this.size.height / 2}` +
        ` ${this.size.width * 0.9},${this.size.height * 0.9}` +
        ` ${this.size.width * (0.9 - (0.8 * (angle - 135)) / 90)},${this.size.height * 0.9}` +
        `" fill="${this.color.fg}" stroke="none"` +
        `/>`;
    } else if (angle <= 315) {
      // [225°,315°]
      res +=
        `<polygon` +
        ` points="` +
        ` ${this.size.width / 2},${this.size.height / 2}` +
        ` ${this.size.width / 2},${this.size.height * 0.1}` +
        ` ${this.size.width * 0.9},${this.size.height * 0.1}` +
        ` ${this.size.width * 0.9},${this.size.height / 2}` +
        ` ${this.size.width * 0.9},${this.size.height * 0.9}` +
        ` ${this.size.width / 2},${this.size.height * 0.9}` +
        ` ${this.size.width * 0.1},${this.size.height * 0.9}` +
        ` ${this.size.width * 0.1},${this.size.height * (0.9 - (0.8 * (angle - 225)) / 90)}` +
        `" fill="${this.color.fg}" stroke="none"` +
        `/>`;
    } else {
      // [315°,360°]
      res +=
        `<polygon` +
        ` points="` +
        ` ${this.size.width / 2},${this.size.height / 2}` +
        ` ${this.size.width / 2},${this.size.height * 0.1}` +
        ` ${this.size.width * 0.9},${this.size.height * 0.1}` +
        ` ${this.size.width * 0.9},${this.size.height / 2}` +
        ` ${this.size.width * 0.9},${this.size.height * 0.9}` +
        ` ${this.size.width / 2},${this.size.height * 0.9}` +
        ` ${this.size.width * 0.1},${this.size.height * 0.9}` +
        ` ${this.size.width * 0.1},${this.size.height * 0.1}` +
        ` ${this.size.width * (0.1 + (0.4 * (angle - 315)) / 45)},${this.size.height * 0.1}` +
        `" fill="${this.color.fg}" stroke="none"` +
        `/>`;
    }
    return res + "\n";
  }

  #svgHeader() {
    return (
      `<svg` +
      ` viewBox="0 0 ${this.size.width} ${this.size.height}"` +
      ` width="${this.size.width}" height="${this.size.height}"` +
      ` xmlns="http://www.w3.org/2000/svg"` +
      ` xmlns:xlink="http://www.w3.org/1999/xlink"` +
      `>\n`
    );
  }

  #svgFooter() {
    return `</svg>`;
  }
}

export { SVG };
