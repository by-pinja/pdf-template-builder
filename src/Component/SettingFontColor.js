import ArrowDropDownIcon from '@material-ui/icons/ArrowDropDown';
import ClickAwayListener from '@material-ui/core/ClickAwayListener/ClickAwayListener';
import Fade from '@material-ui/core/Fade/Fade';
import FormatColorTextIcon from '@material-ui/icons/FormatColorText';
import Paper from '@material-ui/core/Paper/Paper';
import Popper from '@material-ui/core/Popper/Popper';
import PropTypes from 'prop-types';
import React, { Component } from 'react';
import ToggleButton from '@material-ui/lab/ToggleButton/ToggleButton';
import Tooltip from '@material-ui/core/Tooltip/Tooltip';
import { SketchPicker } from 'react-color';
import { withNamespaces } from 'react-i18next';

class SettingFontColor extends Component {
  constructor(props) {
    super(props);

    this.handleClickAway = this.handleClickAway.bind(this);
    this.handlePopper = this.handlePopper.bind(this);

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
    const { t, value, defaultValue, onChange } = this.props;
    const { ref, open } = this.state;

    const id = open ? 'color-popper' : null;

    return (
      <ClickAwayListener onClickAway={this.handleClickAway}>
        <div style={{ display: 'inline-block' }}>
          <ToggleButton value="color" onClick={this.handlePopper}>
            <Tooltip title={t('color')}>
              <FormatColorTextIcon />
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
                    color={value || defaultValue}
                    onChange={onChange}
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

SettingFontColor.propTypes = {
  value: PropTypes.string,
  defaultValue: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
};

export default withNamespaces()(SettingFontColor);