import React, { Component } from 'react';
import Grid from '@material-ui/core/Grid/Grid';
import ExpansionPanel from '@material-ui/core/ExpansionPanel/ExpansionPanel';
import ExpansionPanelSummary from '@material-ui/core/ExpansionPanelSummary/ExpansionPanelSummary';
import Typography from '@material-ui/core/Typography/Typography';
import ExpansionPanelDetails from '@material-ui/core/ExpansionPanelDetails/ExpansionPanelDetails';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import PropTypes from 'prop-types';
import TextField from '@material-ui/core/TextField/TextField';
import MenuItem from '@material-ui/core/MenuItem/MenuItem';
import { withStyles } from '@material-ui/core/styles';
import WebFont from 'webfontloader';
import ColorPicker from 'material-ui-color-picker';

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

const styles = {
  select: {
    width: '100%'
  }
};

class SettingTextFont extends Component {
  constructor(props) {
    super(props);

    this.handleChange = this.handleChange.bind(this);
  }

  handleChange = name => event => {
    const element = {
      ...this.props.element,
      [name]: event.target.value
    };

    this.props.onUpdateElement(element);
  };

  handleColorChange = name => color => {
    const element = {
      ...this.props.element,
      [name]: color
    };

    this.props.onUpdateElement(element);
  };

  render() {
    const { classes } = this.props;

    const current = (
      <Typography variant="caption">
        {this.props.element.fontFamily}&nbsp;
        {this.props.element.fontSize + 'px'}
      </Typography>
    );

    return (
      <ExpansionPanel>
        <ExpansionPanelSummary expandIcon={<ExpandMoreIcon />}>
          <Typography>Font {current}</Typography>
        </ExpansionPanelSummary>
        <ExpansionPanelDetails>
          <Grid container spacing={16}>
            <Grid item xs={6}>
              <TextField
                id="fontFamily"
                label="Font family"
                select
                className={classes.select}
                value={this.props.element.fontFamily || defaultFont}
                onChange={this.handleChange('fontFamily')}
                margin="normal"
                SelectProps={{}}
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
            </Grid>

            <Grid item xs={6}>
              <TextField
                id="fontSize"
                type="number"
                label="Font size (px)"
                className={classes.select}
                value={this.props.element.fontSize || 16}
                onChange={this.handleChange('fontSize')}
                margin="normal"
              />
            </Grid>

            <Grid item xs={6}>
              <ColorPicker
                name="color"
                label="Color"
                defaultValue="#000"
                onChange={this.handleColorChange('color')}
                value={this.props.element.color}
              />
            </Grid>
          </Grid>
        </ExpansionPanelDetails>
      </ExpansionPanel>
    )
  }
}

SettingTextFont.propTypes = {
  element: PropTypes.object.isRequired,
  onUpdateElement: PropTypes.func.isRequired
};

export default withStyles(styles)(SettingTextFont);
