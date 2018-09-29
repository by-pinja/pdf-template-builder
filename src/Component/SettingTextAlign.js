import React, { Component } from 'react';
import FormControl from '@material-ui/core/es/FormControl/FormControl';
import FormLabel from '@material-ui/core/es/FormLabel/FormLabel';
import RadioGroup from '@material-ui/core/es/RadioGroup/RadioGroup';
import FormControlLabel from '@material-ui/core/es/FormControlLabel/FormControlLabel';
import Radio from '@material-ui/core/es/Radio/Radio';
import Grid from '@material-ui/core/es/Grid/Grid';
import ExpansionPanel from '@material-ui/core/es/ExpansionPanel/ExpansionPanel';
import ExpansionPanelSummary from '@material-ui/core/es/ExpansionPanelSummary/ExpansionPanelSummary';
import Typography from '@material-ui/core/es/Typography/Typography';
import ExpansionPanelDetails from '@material-ui/core/es/ExpansionPanelDetails/ExpansionPanelDetails';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import PropTypes from 'prop-types';

class SettingTextAlign extends Component {
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
    const current = (
      <Typography variant={'caption'}>
        {this.props.element.verticalAlignment}&nbsp;
        {this.props.element.horizontalAlignment}
        </Typography>
    );

    return (
      <ExpansionPanel>
        <ExpansionPanelSummary expandIcon={<ExpandMoreIcon />}>
          <Typography>Alignment {current}</Typography>
        </ExpansionPanelSummary>
        <ExpansionPanelDetails>
          <Grid container>
            <Grid item xs={6}>
              <FormControl component="fieldset">
                <FormLabel component="legend">Vertical</FormLabel>

                <RadioGroup
                  aria-label="Vertical alignment"
                  name="verticalAlignment"
                  value={this.props.element.verticalAlignment}
                  onChange={this.handleChange('verticalAlignment')}
                >
                  <FormControlLabel value="top" control={<Radio />} label="Top" />
                  <FormControlLabel value="middle" control={<Radio />} label="Middle" />
                  <FormControlLabel value="bottom" control={<Radio />} label="Bottom" />
                </RadioGroup>
              </FormControl>
            </Grid>

            <Grid item xs={6}>
              <FormControl component="fieldset">
                <FormLabel component="legend">Horizontal</FormLabel>

                <RadioGroup
                  aria-label="Horizontal alignment"
                  name="horizontalAlignment"
                  value={this.props.element.horizontalAlignment}
                  onChange={this.handleChange('horizontalAlignment')}
                >
                  <FormControlLabel value="left" control={<Radio />} label="Left" />
                  <FormControlLabel value="center" control={<Radio />} label="Center" />
                  <FormControlLabel value="right" control={<Radio />} label="Right" />
                </RadioGroup>
              </FormControl>
            </Grid>
          </Grid>
        </ExpansionPanelDetails>
      </ExpansionPanel>
    )
  }
}

SettingTextAlign.propTypes = {
  element: PropTypes.object.isRequired,
  onUpdateElement: PropTypes.func.isRequired
};

export default SettingTextAlign;
