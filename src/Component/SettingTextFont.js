import React, { Component } from 'react';
import Grid from '@material-ui/core/es/Grid/Grid';
import ExpansionPanel from '@material-ui/core/es/ExpansionPanel/ExpansionPanel';
import ExpansionPanelSummary from '@material-ui/core/es/ExpansionPanelSummary/ExpansionPanelSummary';
import Typography from '@material-ui/core/es/Typography/Typography';
import ExpansionPanelDetails from '@material-ui/core/es/ExpansionPanelDetails/ExpansionPanelDetails';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import PropTypes from 'prop-types';
import TextField from '@material-ui/core/es/TextField/TextField';
import MenuItem from '@material-ui/core/es/MenuItem/MenuItem';
import { withStyles } from '@material-ui/core/styles';
import WebFont from 'webfontloader';

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

  render() {
    const { classes } = this.props;

    const current = (
      <Typography variant="caption">
        {this.props.element.fontFamily}
      </Typography>
    );

    return (
      <ExpansionPanel>
        <ExpansionPanelSummary expandIcon={<ExpandMoreIcon />}>
          <Typography>Font {current}</Typography>
        </ExpansionPanelSummary>
        <ExpansionPanelDetails>
          <Grid container>
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
