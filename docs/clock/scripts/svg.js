class SVG {
  static ns = 'http://www.w3.org/2000/svg'

  constructor(width, height) {
    this.size = {};
    this.size.width = width;
    this.size.height = height;
    this.color = {};
    this.color.bg = "#111";
    this.color.fg = "#C00";
  }

  print(percent) {
    const svg = document.createElementNS(SVG.ns, 'svg');

    svg.setAttributeNS(null, 'viewBox', `0 0 ${this.size.width} ${this.size.height}`);
    svg.setAttributeNS(null, 'width', this.size.width);
    svg.setAttributeNS(null, 'height', this.size.height);
    //svg.setAttributeNS(null, 'width', '100%');
    //svg.setAttributeNS(null, 'height', '100%');

    this.#drawBG(svg);
    this.#drawRect(svg);
    this.#drawPattern(svg, percent);
    return svg;
  }

  #drawBG(svg) {
    const rect = document.createElementNS(SVG.ns, 'rect');
    rect.setAttributeNS(null, 'x', 0);
    rect.setAttributeNS(null, 'y', 0);
    rect.setAttributeNS(null, 'width', '100%');
    rect.setAttributeNS(null, 'height', '100%');
    rect.setAttributeNS(null, 'fill', `${this.color.bg}`);
    svg.appendChild(rect);
  }

  #drawRect(svg) {
    const rect = document.createElementNS(SVG.ns, 'rect');
    rect.setAttributeNS(null, 'x', '10%');
    rect.setAttributeNS(null, 'y', '10%');
    rect.setAttributeNS(null, 'width', '80%');
    rect.setAttributeNS(null, 'height', '80%');
    rect.setAttributeNS(null, 'fill', 'none');
    rect.setAttributeNS(null, 'stroke', `${this.color.fg}`);
    svg.appendChild(rect);
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
  #drawPattern(svg, percent) {
    const angle = (percent * 360) / 100;
    if (angle < 0) angle = 0;
    if (angle > 360) angle = 360;
    //console.log({angle});

    const poly = document.createElementNS(SVG.ns, 'polygon');
    poly.setAttributeNS(null, 'fill', `${this.color.fg}`);
    poly.setAttributeNS(null, 'stroke', 'none');

    if (angle <= 45) {
      // [0°,45°]
      poly.setAttributeNS(null,
        'points',
        ` ${this.size.width / 2},${this.size.height / 2}` +
        ` ${this.size.width / 2},${this.size.height * 0.1}` +
        ` ${this.size.width * (0.5 + (0.4 * angle) / 45)},${this.size.height * 0.1}`);
    } else if (angle <= 135) {
      // [45°,135°]
      poly.setAttributeNS(null,
        'points',
        ` ${this.size.width / 2},${this.size.height / 2}` +
        ` ${this.size.width / 2},${this.size.height * 0.1}` +
        ` ${this.size.width * 0.9},${this.size.height * 0.1}` +
        ` ${this.size.width * 0.9},${this.size.height * (0.1 + (0.8 * (angle - 45)) / 90)}`);
      } else if (angle <= 225) {
        // [135°,225°]
        poly.setAttributeNS(null,
          'points',
          ` ${this.size.width / 2},${this.size.height / 2}` +
          ` ${this.size.width / 2},${this.size.height * 0.1}` +
          ` ${this.size.width * 0.9},${this.size.height * 0.1}` +
          ` ${this.size.width * 0.9},${this.size.height / 2}` +
          ` ${this.size.width * 0.9},${this.size.height * 0.9}` +
          ` ${this.size.width * (0.9 - (0.8 * (angle - 135)) / 90)},${this.size.height * 0.9}`);
        } else if (angle <= 315) {
          // [225°,315°]
          poly.setAttributeNS(null,
            'points',
            ` ${this.size.width / 2},${this.size.height / 2}` +
            ` ${this.size.width / 2},${this.size.height * 0.1}` +
            ` ${this.size.width * 0.9},${this.size.height * 0.1}` +
            ` ${this.size.width * 0.9},${this.size.height / 2}` +
            ` ${this.size.width * 0.9},${this.size.height * 0.9}` +
            ` ${this.size.width / 2},${this.size.height * 0.9}` +
            ` ${this.size.width * 0.1},${this.size.height * 0.9}` +
            ` ${this.size.width * 0.1},${this.size.height * (0.9 - (0.8 * (angle - 225)) / 90)}`);
        } else {
          // [315°,360°]
          poly.setAttributeNS(null,
            'points',
            ` ${this.size.width / 2},${this.size.height / 2}` +
            ` ${this.size.width / 2},${this.size.height * 0.1}` +
            ` ${this.size.width * 0.9},${this.size.height * 0.1}` +
            ` ${this.size.width * 0.9},${this.size.height / 2}` +
            ` ${this.size.width * 0.9},${this.size.height * 0.9}` +
            ` ${this.size.width / 2},${this.size.height * 0.9}` +
            ` ${this.size.width * 0.1},${this.size.height * 0.9}` +
            ` ${this.size.width * 0.1},${this.size.height * 0.1}` +
            ` ${this.size.width * (0.1 + (0.4 * (angle - 315)) / 45)},${this.size.height * 0.1}`);
        }
    svg.appendChild(poly);
  }
}

export { SVG };
