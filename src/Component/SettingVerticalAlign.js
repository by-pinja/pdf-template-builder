import PropTypes from 'prop-types';
import React, { Component } from 'react';
import ToggleButton from '@material-ui/lab/ToggleButton/ToggleButton';
import ToggleButtonGroup from '@material-ui/lab/ToggleButtonGroup/ToggleButtonGroup';
import Tooltip from '@material-ui/core/Tooltip/Tooltip';
import VerticalAlignBottomIcon from '@material-ui/icons/VerticalAlignBottom';
import VerticalAlignMiddleIcon from '@material-ui/icons/VerticalAlignCenter';
import VerticalAlignTopIcon from '@material-ui/icons/VerticalAlignTop';
import { withNamespaces } from 'react-i18next';

class SettingVerticalAlign extends Component {
  render() {
    const { t, value, onChange } = this.props;

    return (
      <ToggleButtonGroup
        exclusive
        value={value}
        onChange={onChange}
      >
        <ToggleButton value="top">
          <Tooltip title={t('alignTop')}>
            <VerticalAlignTopIcon />
          </Tooltip>
        </ToggleButton>
        <ToggleButton value="middle">
          <Tooltip title={t('alignMiddle')}>
            <VerticalAlignMiddleIcon />
          </Tooltip>
        </ToggleButton>
        <ToggleButton value="bottom">
          <Tooltip title={t('alignBottom')}>
            <VerticalAlignBottomIcon />
          </Tooltip>
        </ToggleButton>
      </ToggleButtonGroup>
    );
  }
}

const allowedValues = ['top', 'middle', 'bottom'];

SettingVerticalAlign.propTypes = {
  value: PropTypes.oneOf(allowedValues),
  onChange: PropTypes.func.isRequired,
};

export default withNamespaces()(SettingVerticalAlign);
