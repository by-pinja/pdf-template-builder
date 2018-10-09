import React, { Component } from 'react';
import TextField from '@material-ui/core/TextField/TextField';
import WebFont from 'webfontloader';
import MenuItem from '@material-ui/core/MenuItem/MenuItem';
import { available } from '../config';

WebFont.load({
  google: {
    families: available.fonts
  }
});

class FontSelector extends Component {
  render() {
    const fonts = available.fonts.slice().sort();

    return (
      <TextField
        id="fontFamily"
        select
        SelectProps={{}}
        {...this.props}
      >
        {fonts.map(font => (
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
