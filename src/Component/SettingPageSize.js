import React, { Component } from 'react';
import Grid from '@material-ui/core/Grid/Grid';
import ExpansionPanel from '@material-ui/core/ExpansionPanel/ExpansionPanel';
import ExpansionPanelSummary from '@material-ui/core/ExpansionPanelSummary/ExpansionPanelSummary';
import Typography from '@material-ui/core/Typography/Typography';
import ExpansionPanelDetails from '@material-ui/core/ExpansionPanelDetails/ExpansionPanelDetails';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import PropTypes from 'prop-types';
import FormControl from '@material-ui/core/es/FormControl/FormControl';
import FormLabel from '@material-ui/core/es/FormLabel/FormLabel';
import RadioGroup from '@material-ui/core/es/RadioGroup/RadioGroup';
import FormControlLabel from '@material-ui/core/es/FormControlLabel/FormControlLabel';
import Radio from '@material-ui/core/es/Radio/Radio';
import PageSize from '../Resource/PageSize';

class SettingPageSize extends Component {
  constructor(props) {
    super(props);

    this.handleChange = this.handleChange.bind(this);
  }

  handleChange = name => event => {
    const options = {
      ...this.props.options,
      [name]: event.target.value
    };

    this.props.onUpdateOptions(options);
  };

  getFormatOptions = () => (
    Object.keys(PageSize.format)
      .map(key => ({
        label: PageSize.format[key],
        value: PageSize.format[key]
      }))
  );

  render() {
    const current = (
      <Typography variant="caption">
        {this.props.options.format}&nbsp;
        {this.props.options.orientation}
      </Typography>
    );

    return (
      <ExpansionPanel>
        <ExpansionPanelSummary expandIcon={<ExpandMoreIcon />}>
          <Typography>Size and orientation {current}</Typography>
        </ExpansionPanelSummary>
        <ExpansionPanelDetails>
          <Grid container spacing={16}>
            <Grid item xs={6}>
              <FormControl component="fieldset">
                <FormLabel component="legend">Format</FormLabel>

                <RadioGroup
                  aria-label="Format"
                  name="format"
                  value={this.props.options.format}
                  onChange={this.handleChange('format')}
                >
                  {this.getFormatOptions().map(format => (
                    <FormControlLabel
                      key={format.label}
                      value={format.value}
                      control={<Radio />}
                      label={format.label}
                    />
                  ))}
                </RadioGroup>
              </FormControl>
            </Grid>

            <Grid item xs={6}>
              <FormControl component="fieldset">
                <FormLabel component="legend">Orientation</FormLabel>

                <RadioGroup
                  aria-label="Format"
                  name="format"
                  value={this.props.options.orientation}
                  onChange={this.handleChange('orientation')}
                >
                  <FormControlLabel value="portrait" control={<Radio />} label="Portrait" />
                  <FormControlLabel value="landscape" control={<Radio />} label="Landscape" />
                </RadioGroup>
              </FormControl>
            </Grid>
          </Grid>
        </ExpansionPanelDetails>
      </ExpansionPanel>
    )
  }
}

SettingPageSize.propTypes = {
  options: PropTypes.object.isRequired,
  onUpdateOptions: PropTypes.func.isRequired
};

export default SettingPageSize;
