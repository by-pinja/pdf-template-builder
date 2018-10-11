import FontSelector from './FontSelector';
import Grid from '@material-ui/core/Grid/Grid';
import PropTypes from 'prop-types';
import React, { Component } from 'react';
import SettingFontColor from './SettingFontColor';
import SettingFontStyle from './SettingFontStyle';
import SettingHorizontalAlign from './SettingHorizontalAlign';
import SettingVerticalAlign from './SettingVerticalAlign';
import TextField from '@material-ui/core/TextField/TextField';
import { defaults } from '../config';
import { withStyles } from '@material-ui/core/styles';
import SettingBorder from './SettingBorder';

const styles = theme => ({
  root: {
    marginBottom: theme.spacing.unit * 2
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
    const { element } = this.props;

    if (!element) {
      return '';
    }

    return (
      <Grid container direction="row" spacing={8} item xs={12}>
        <Grid item container xs={7} spacing={8} justify="flex-start">
          <Grid item xs={12} container spacing={8}>
            <Grid item style={{ width: '150px' }}>
              <FontSelector
                value={element.fontFamily}
                onChange={this.handleEventChange('fontFamily')}
                style={{ width: '100%' }}
              />
            </Grid>

            <Grid item style={{ width: '50px' }}>
              <TextField
                id="fontSize"
                type="number"
                value={element.fontSize || 12}
                onChange={this.handleEventChange('fontSize')}
                style={{ width: '100%' }}
              />
            </Grid>
          </Grid>

          <Grid item xs={12} container direction="row">
            <SettingFontStyle
              value={element.fontStyle}
              onChange={this.handleChange('fontStyle') }
            />

            <SettingFontColor
              value={element.color}
              defaultValue={defaults.font.color}
              onChange={this.handleColorChange}
            />
          </Grid>
        </Grid>

        <Grid item container direction="row" xs={5} spacing={8}>
          <Grid item>
            <SettingHorizontalAlign
              value={element.horizontalAlignment}
              defaultValue={defaults.alignment.horizontal}
              onChange={this.handleChange('horizontalAlignment')}
            />
          </Grid>

          <Grid item>
            <SettingVerticalAlign
              value={element.verticalAlignment}
              defaultValue={defaults.alignment.vertical}
              onChange={this.handleChange('verticalAlignment')}
            />
          </Grid>
        </Grid>

        <Grid item container direction="row" xs={12}>
          <SettingBorder
            value={element.border || []}
            onChange={this.handleChange('border')}
          />
        </Grid>
      </Grid>
    );
  }
}

ElementStyle.propTypes = {
  element: PropTypes.object,
  onUpdateElement: PropTypes.func.isRequired
};

export default withStyles(styles)(ElementStyle);