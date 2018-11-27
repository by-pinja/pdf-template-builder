import WebFont from 'webfontloader';

export const defaults = {
  font: {
    family: 'Open Sans',
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
    'Open Sans',
    'Roboto',
    'Mali',
    'Roboto Mono',
    'Charmonman'
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
