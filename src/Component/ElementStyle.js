import BorderColorIcon from '@material-ui/icons/BorderColor';
import FontSelector from './FontSelector';
import FormatColorTextIcon from '@material-ui/icons/FormatColorText';
import Grid from '@material-ui/core/Grid/Grid';
import InputAdornment from '@material-ui/core/InputAdornment/InputAdornment';
import PropTypes from 'prop-types';
import React, { Component } from 'react';
import SettingBorder from './SettingBorder';
import SettingColor from './SettingColor';
import SettingFontStyle from './SettingFontStyle';
import SettingHorizontalAlign from './SettingHorizontalAlign';
import SettingVerticalAlign from './SettingVerticalAlign';
import TextField from '@material-ui/core/TextField/TextField';
import { defaults } from '../config';
import { withNamespaces } from 'react-i18next';
import { withStyles } from '@material-ui/core/styles';

const styles = theme => ({
  root: {
    marginBottom: theme.spacing.unit * 2
  },
  borderWidthInput: {
    width: '100%'
  }
});

class ElementStyle extends Component {
  constructor(props) {
    super(props);

    this.handleChange      = this.handleChange.bind(this);
    this.handleColorChange = this.handleColorChange.bind(this);
  }

  handleChange = name => (event, value) => {
    const element = {
      ...this.props.element,
      [name]: value
    };

    this.props.onUpdateElement(element);
  };

  handleEventChange = name => event => {
    this.handleChange(name)(event, event.target.value);
  };

  handleColorChange = (color, event) => {
    this.handleChange('color')(event, color.hex);
  };

  render() {
    const { classes, element, t } = this.props;

    if (!element) {
      return '';
    }

    return (
      <Grid container direction="row" spacing={8} item xs={12}>
        <Grid item container xs={7} spacing={8} justify="flex-start">
          <Grid item xs={12} container spacing={8}>
            <Grid item xs={8}>
              <FontSelector
                value={element.fontFamily}
                onChange={this.handleEventChange('fontFamily')}
                style={{ width: '100%' }}
              />
            </Grid>

            <Grid item xs={4}>
              <TextField
                id="fontSize"
                type="number"
                value={element.fontSize}
                onChange={this.handleEventChange('fontSize')}
                style={{ width: '100%' }}
                InputProps={{
                  endAdornment: (
                    <InputAdornment variant="filled" position="end">
                      px
                    </InputAdornment>
                  ),
                }}
              />
            </Grid>
          </Grid>

          <Grid item xs={12} container direction="row">
            <SettingFontStyle
              value={element.fontStyle}
              onChange={this.handleChange('fontStyle') }
            />

            <SettingColor
              title={t('color')}
              value={element.color}
              defaultValue={defaults.font.color}
              onChange={this.handleChange('color')}
              icon={<FormatColorTextIcon />}
            />
          </Grid>
        </Grid>

        <Grid item container direction="row" xs={5} spacing={8}>
          <Grid item>
            <SettingHorizontalAlign
              value={element.horizontalAlignment}
              onChange={this.handleChange('horizontalAlignment')}
            />
          </Grid>

          <Grid item>
            <SettingVerticalAlign
              value={element.verticalAlignment}
              onChange={this.handleChange('verticalAlignment')}
            />
          </Grid>
        </Grid>

        <Grid item container direction="row" xs={12}>
          <Grid item>
            <SettingBorder
              value={element.border || []}
              onChange={this.handleChange('border')}
            />
          </Grid>

          <Grid item>
            <SettingColor
              title={t('color')}
              value={element.borderColor}
              defaultValue={defaults.border.color}
              onChange={this.handleChange('borderColor')}
              icon={<BorderColorIcon />}
            />
          </Grid>

          <Grid item xs={2}>
            <TextField
              id="borderWidth"
              type="number"
              className={classes.borderWidthInput}
              value={element.borderWidth}
              onChange={this.handleEventChange('borderWidth')}
              InputProps={{
                endAdornment: (
                  <InputAdornment variant="filled" position="end">
                    px
                  </InputAdornment>
                ),
              }}
            />
          </Grid>
        </Grid>
      </Grid>
    );
  }
}

ElementStyle.propTypes = {
  element: PropTypes.object,
  onUpdateElement: PropTypes.func.isRequired
};

export default withNamespaces()(withStyles(styles)(ElementStyle));