#!/usr/bin/env python3
"""Generate SVG"""

import argparse

class ColorPalette(object):
    """Color codes palette."""
    def __init__(self):
        """Initialize ColorPalette."""
        self._colors = [
            ('fg', r'#4285F4'),  # blue
            ('bg', r'#EA4335'),  # red
            ('fg2', r'#FBBC05'),  # yellow
            ('fg3', r'#34A853'),  # green
            ('fg4', r'#101010'),  # black
            ('fg5', r'#FFFFFF'),  # white
        ]

        def __getitem__(self, key):
            """Gets color name from idx."""

        return self._colors[key][0]

    def __len__(self):
        """Gets the number of colors."""
        return len(self._colors)

    @property
    def colors(self):
        """Gets the colors list."""
        return self._colors

    def name(self, idx):
        """Return color name from idx."""
        return self._colors[idx][0]

    def value(self, idx):
        """Return color value from idx."""
        return self._colors[idx][1]

    def value_from_name(self, name):
        """Return color value from name."""
        return dict(self._colors)[name]


class SVG(object):
    """SVG draw primitives."""
    @staticmethod
    def header(size, margin):
        """Writes header."""
        print('<svg\n'
              'xmlns="http://www.w3.org/2000/svg" version="1.1"\n'
              'xmlns:xlink="http://www.w3.org/1999/xlink" '
              'width="{width}" height="{height}" '
              'viewBox="-{margin} -{margin} {width} {height}">'.format(
                  width=size[0] + 2 * margin,
                  height=size[1] + 2 * margin,
                  margin=margin))

    @staticmethod
    def definitions(colors):
        """Writes definitions."""
        print(r'<!-- Need this definition to make an arrow marker,'
              ' from https://www.w3.org/TR/svg-markers/ -->')
        print(r'<defs>')
        for color in colors:
            print(
                r'  <marker id="arrow_{colorname}" viewBox="0 0 16 16" '
                'refX="8" refY="8" markerUnits="strokeWidth" markerWidth="5" markerHeight="5" '
                'orient="auto">'.format(colorname=color[0]))
            print(
                r'    <path d="M 0 0 L 16 8 L 0 16 z" stroke="none" fill="{color}"/>'
                .format(color=color[1]))
            print(r'  </marker>')
        print(r'</defs>')

    @staticmethod
    def footer():
        """Writes svg footer."""
        print(r'</svg>')

    @staticmethod
    def draw_line(position_1, position_2, size, fg_color):
        """Draws a line."""
        line_style = (
            r'style="stroke-width:{sz};stroke:{fg};fill:none"').format(
                sz=size, fg=fg_color)
        print(
            r'<line x1="{x1}" y1="{y1}" x2="{x2}" y2="{y2}" {style}/>'.format(
                x1=position_1[0],
                y1=position_1[1],
                x2=position_2[0],
                y2=position_2[1],
                style=line_style))

    @staticmethod
    def draw_polyline(position_1, position_2, size, fg_color, colorname):
        """Draws a line with arrow maker in the middle."""
        polyline_style = (r'style="stroke-width:{sz};stroke:{fg};fill:none;'
                          'marker-mid:url(#arrow_{colorname})"').format(
                              sz=size, fg=fg_color, colorname=colorname)
        print(r'<polyline points="{x1},{y1} {x2},{y2} {x3},{y3}" {style}/>'.
              format(x1=position_1[0],
                     y1=position_1[1],
                     x2=(position_1[0] + position_2[0]) / 2,
                     y2=(position_1[1] + position_2[1]) / 2,
                     x3=position_2[0],
                     y3=position_2[1],
                     style=polyline_style))

    @staticmethod
    def draw_circle(position, radius, size, fg_color, bg_color='white'):
        """Print a circle."""
        circle_style = (
            r'style="stroke-width:{sz};stroke:{fg};fill:{bg}"').format(
                sz=size, fg=fg_color, bg=bg_color)
        print(r'<circle cx="{cx}" cy="{cy}" r="{r}" {style}/>'.format(
            cx=position[0], cy=position[1], r=radius, style=circle_style))

    @staticmethod
    def draw_text(text, position, size, fg_color='none', bg_color='black'):
        """Print a middle centred text."""
        text_style = (r'style="text-anchor:middle;font-weight:bold;'
                      'font-size:{sz};stroke:{fg};fill:{bg}"').format(
                          sz=size, fg=fg_color, bg=bg_color)
        print(r'<text x="{x}" y="{y}" dy="{dy}" {style}>{txt}</text>'.format(
            x=position[0],
            y=position[1],
            dy=size / 3,
            style=text_style,
            txt=text))


class SVGPrinter(object):
    """Generate texture as svg file to stdout."""

    # pylint: disable=too-many-arguments
    def __init__(self,
                 args,
                 size=[512, 512],
                 colors=ColorPalette()):
        """Initializes the printer."""
        self._args = args
        self._size = size
        self._radius = min(self._size[0], self._size[1]) / 2
        self._stroke_width = self._size / 64
        # Design variables
        self._color_palette = colors
        self._svg = SVG()

    @property
    def size(self):
        """Gets the size."""
        return self._size

    @property
    def color_palette(self):
        """Gets the color palette."""
        return self._color_palette

    @property
    def svg(self):
        """Gets the svg."""
        return self._svg

    def draw_grid(self):
        """Draws a grid."""
        print(r'<!-- Draw a grid -->')
        color = '#969696' # grey
        # Horizontal streets
        for i in range(9):
            p_1 = [0, i * self._size[1] / 8]
            p_2 = [self._size[0], p_1[1]]
            self._svg.draw_line(p_1, p_2, 2, color)
        # Vertical streets
        for i in range(9):
            p_1 = [i * self._size[0] / 8, 0]
            p_2 = [p_1[0], self._size[1]]
            self._svg.draw_line(p_1, p_2, 2, color)

    def draw_circle(self):
        """Draws a circle."""
        print(r'<!-- Draw a circle -->')
        color = self._color_palette.value_from_name('black')
        loc = self._size / 2
        self._svg.draw_circle(loc, self._radius, self._stroke_width, color,
                              'white')
        self._svg.draw_text(r'TNT', loc, self._radius, 'none', color)

    def print_to_console(self):
        """Prints a full svg document on stdout."""
        self._svg.header(self._size, self._stroke_width)
        self._svg.definitions(self._color_palette.colors)
        self.draw_grid()
        if self._args['circle']:
            self.draw_circle()
        self._svg.footer()


def main():  # pylint: disable=too-many-locals,too-many-branches
    """Entry point of the program."""
    parser = argparse.ArgumentParser(description='Output texture as svg image.')
    parser.add_argument('-c',
                        '--circle',
                        action='store_true',
                        help='draw 1 circle')
    args = vars(parser.parse_args())

    printer = SVGPrinter(args, data)
    printer.print_to_console()
    return 0

if __name__ == '__main__':
    main()
