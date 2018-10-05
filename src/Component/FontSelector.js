import React, { Component } from 'react';
import TextField from '@material-ui/core/TextField/TextField';
import WebFont from 'webfontloader';
import MenuItem from '@material-ui/core/MenuItem/MenuItem';

const defaultFont = 'Open Sans';

const availableFonts = [
  defaultFont,
  'Roboto',
  'Mali',
  'Roboto Mono',
  'Charmonman'
].sort();

WebFont.load({
  google: {
    families: availableFonts
  }
});

class FontSelector extends Component {
  render() {
    return (
      <TextField
        id="fontFamily"
        select
        SelectProps={{}}
        {...this.props}
      >
        {availableFonts.map(font => (
          <MenuItem
            key={font}
            value={font}
            style={{ fontFamily: font }}
          >
            {font}
          </MenuItem>
        ))}
      </TextField>
    );
  }
}

export default FontSelector;
