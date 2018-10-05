import React, { Component } from 'react';
import Grid from '@material-ui/core/es/Grid/Grid';
import ToggleButton from '@material-ui/lab/ToggleButton';
import ToggleButtonGroup from '@material-ui/lab/ToggleButtonGroup';
import FormatAlignLeftIcon from '@material-ui/icons/FormatAlignLeft';
import FormatAlignCenterIcon from '@material-ui/icons/FormatAlignCenter';
import FormatAlignRightIcon from '@material-ui/icons/FormatAlignRight';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';

const styles = theme => ({
  root: {
    marginBottom: theme.spacing.unit * 2
  }
});

class ElementStyle extends Component {
  constructor(props) {
    super(props);

    this.handleChange = this.handleChange.bind(this);
  }

  handleChange = name => (event, value) => {
    const element = {
      ...this.props.element,
      [name]: event.target.value || value
    };

    this.props.onUpdateElement(element);
  };

  render() {
    const { element, classes } = this.props;

    if (!element) {
      return '';
    }

    return (
      <Grid container direction="row" className={classes.root}>
        <ToggleButtonGroup
          value={element.horizontalAlignment || 'left'}
          exclusive
          onChange={this.handleChange('horizontalAlignment')}
        >
          <ToggleButton value="left">
            <FormatAlignLeftIcon />
          </ToggleButton>
          <ToggleButton value="center">
            <FormatAlignCenterIcon />
          </ToggleButton>
          <ToggleButton value="right">
            <FormatAlignRightIcon />
          </ToggleButton>
        </ToggleButtonGroup>
      </Grid>
    );
  }
}

ElementStyle.propTypes = {
  element: PropTypes.object,
  onUpdateElement: PropTypes.func.isRequired
};

export default withStyles(styles)(ElementStyle);