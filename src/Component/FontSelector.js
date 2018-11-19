import React, { Component } from 'react';
import TextField from '@material-ui/core/TextField/TextField';
import MenuItem from '@material-ui/core/MenuItem/MenuItem';
import { getFonts } from '../config';

class FontSelector extends Component {
  render() {
    const fonts = getFonts().slice().sort();

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
