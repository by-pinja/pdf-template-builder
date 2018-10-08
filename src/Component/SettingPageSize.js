import React, { Component } from 'react';
import Grid from '@material-ui/core/Grid/Grid';
import ExpansionPanel from '@material-ui/core/ExpansionPanel/ExpansionPanel';
import ExpansionPanelSummary from '@material-ui/core/ExpansionPanelSummary/ExpansionPanelSummary';
import Typography from '@material-ui/core/Typography/Typography';
import ExpansionPanelDetails from '@material-ui/core/ExpansionPanelDetails/ExpansionPanelDetails';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import PropTypes from 'prop-types';
import FormControl from '@material-ui/core/FormControl/FormControl';
import FormLabel from '@material-ui/core/FormLabel/FormLabel';
import RadioGroup from '@material-ui/core/RadioGroup/RadioGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel/FormControlLabel';
import Radio from '@material-ui/core/Radio/Radio';
import PageSize from '../Resource/PageSize';
import { withNamespaces } from 'react-i18next';

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
    const { t, options } = this.props;

    const current = (
      <Typography variant="caption">
        {options.format}&nbsp;
        {t(options.orientation)}
      </Typography>
    );

    return (
      <ExpansionPanel>
        <ExpansionPanelSummary expandIcon={<ExpandMoreIcon />}>
          <Typography>{t('sizeAndOrientation')} {current}</Typography>
        </ExpansionPanelSummary>
        <ExpansionPanelDetails>
          <Grid container spacing={16}>
            <Grid item xs={6}>
              <FormControl component="fieldset">
                <FormLabel component="legend">{t('paperSize')}</FormLabel>

                <RadioGroup
                  aria-label={t('paperSize')}
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
                <FormLabel component="legend">{t('paperOrientation')}</FormLabel>

                <RadioGroup
                  aria-label={t('paperOrientation')}
                  name="format"
                  value={this.props.options.orientation}
                  onChange={this.handleChange('orientation')}
                >
                  <FormControlLabel value="portrait" control={<Radio />} label={t('portrait')} />
                  <FormControlLabel value="landscape" control={<Radio />} label={t('landscape')} />
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

export default withNamespaces()(SettingPageSize);
