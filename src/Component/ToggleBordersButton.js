import FormatShapesIcon from '@material-ui/icons/FormatShapes';
import IconButton from '@material-ui/core/IconButton/IconButton';
import PropTypes from 'prop-types';
import React, { Component } from 'react';
import Tooltip from '@material-ui/core/Tooltip/Tooltip';
import { withNamespaces } from 'react-i18next';
import { withStyles } from '@material-ui/core/styles';

const styles = theme => ({
  disabled: {
    color: theme.palette.action.disabled
  }
});

class ToggleBordersButton extends Component {
  constructor(props) {
    super(props);

    this.handleToggle = this.handleToggle.bind(this);
  }

  handleToggle() {
    this.props.onChangeBorderVisibility(!this.props.bordersVisible);
  }

  render() {
    const { bordersVisible, t } = this.props;

    let { classes } = bordersVisible ? {classes: {}} : this.props;

    const title = bordersVisible ? t('hideBorders') : t('showBorders');

    return (
      <Tooltip title={title}>
        <div>
          <IconButton
            className={classes.disabled}
            color="inherit"
            aria-label={title}
            onClick={this.handleToggle}
          >
            <FormatShapesIcon/>
          </IconButton>
        </div>
      </Tooltip>
    );
  }
}

ToggleBordersButton.propTypes = {
  bordersVisible: PropTypes.bool.isRequired,
  onChangeBorderVisibility: PropTypes.func.isRequired
};

export default withNamespaces()(withStyles(styles)(ToggleBordersButton));
