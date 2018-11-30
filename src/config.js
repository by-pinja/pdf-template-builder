import WebFont from 'webfontloader';

export const defaults = {
  font: {
    family: 'Arial',
    color: '#000',
    lineHeight: 1.4,
  },
  alignment: {
    vertical: 'top',
    horizontal: 'left'
  },
  border: {
    color: '#000',
    width: 1
  }
};

export const available = {
  fonts: [
    'Arial',
    'Calibri',
    'Courier New',
    'Helvetica',
    'Times New Roman',
    'Verdana',
  ]
};

export function getFonts() {
  return available.fonts;
}

export function loadFonts(fonts) {
  if (fonts) {
    available.fonts = fonts;
  }

  WebFont.load({
    google: {
      families: available.fonts
    }
  });
}
