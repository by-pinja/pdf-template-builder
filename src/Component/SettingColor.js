import ArrowDropDownIcon from '@material-ui/icons/ArrowDropDown';
import ClickAwayListener from '@material-ui/core/ClickAwayListener/ClickAwayListener';
import Fade from '@material-ui/core/Fade/Fade';
import Paper from '@material-ui/core/Paper/Paper';
import Popper from '@material-ui/core/Popper/Popper';
import { withStyles } from '@material-ui/core/styles';
import PropTypes from 'prop-types';
import React, { Component } from 'react';
import ToggleButton from '@material-ui/lab/ToggleButton/ToggleButton';
import Tooltip from '@material-ui/core/Tooltip/Tooltip';
import { SketchPicker } from 'react-color';
import { withNamespaces } from 'react-i18next';

const styles = theme => ({
  colorPicker: {
    fontFamily: 'Roboto'
  },
});

class SettingColor extends Component {
  constructor(props) {
    super(props);

    this.handleClickAway = this.handleClickAway.bind(this);
    this.handlePopper    = this.handlePopper.bind(this);

    this.state = { ref: null, open: false };
  }

  handleClickAway() {
    this.setState({
      open: false
    });
  }

  handlePopper(event) {
    event.persist();

    this.setState({
      open: !this.state.open,
      ref: event.target
    });
  }

  render() {
    const { classes, title, value, defaultValue, onChange, icon } = this.props;
    const { ref, open } = this.state;

    const id = open ? 'popper' : null;

    return (
      <ClickAwayListener onClickAway={this.handleClickAway}>
        <div style={{ display: 'inline-block' }}>
          <ToggleButton value="" onClick={this.handlePopper}>
            <Tooltip title={title}>
              {icon}
            </Tooltip>
            <ArrowDropDownIcon />
          </ToggleButton>

          <Popper
            id={id}
            style={{ zIndex: 100 }}
            open={open}
            disablePortal={true}
            anchorEl={ref}
            transition
          >
            {({ TransitionProps }) => (
              <Fade {...TransitionProps} timeout={150}>
                <Paper>
                  <SketchPicker
                    className={classes.colorPicker}
                    color={value || defaultValue}
                    onChange={(color, event) => onChange(event, color.hex)}
                  />
                </Paper>
              </Fade>
            )}
          </Popper>
        </div>
      </ClickAwayListener>
    );
  }
}

SettingColor.propTypes = {
  title: PropTypes.string,
  value: PropTypes.string,
  defaultValue: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
};

export default withNamespaces()(withStyles(styles)(SettingColor));