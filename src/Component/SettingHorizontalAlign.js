import FormatAlignCenterIcon from '@material-ui/icons/FormatAlignCenter';
import FormatAlignLeftIcon from '@material-ui/icons/FormatAlignLeft';
import FormatAlignRightIcon from '@material-ui/icons/FormatAlignRight';
import PropTypes from 'prop-types';
import React, { Component } from 'react';
import ToggleButton from '@material-ui/lab/ToggleButton/ToggleButton';
import ToggleButtonGroup from '@material-ui/lab/ToggleButtonGroup/ToggleButtonGroup';
import Tooltip from '@material-ui/core/Tooltip/Tooltip';
import { withNamespaces } from 'react-i18next';

class SettingHorizontalAlign extends Component {
  render() {
    const { t, value, defaultValue, onChange } = this.props;

    return (
      <ToggleButtonGroup
        exclusive
        value={value || defaultValue}
        onChange={onChange}
      >
        <ToggleButton value="left">
          <Tooltip title={t('alignLeft')}>
            <FormatAlignLeftIcon />
          </Tooltip>
        </ToggleButton>
        <ToggleButton value="center">
          <Tooltip title={t('alignCenter')}>
            <FormatAlignCenterIcon />
          </Tooltip>
        </ToggleButton>
        <ToggleButton value="right">
          <Tooltip title={t('alignRight')}>
            <FormatAlignRightIcon />
          </Tooltip>
        </ToggleButton>
      </ToggleButtonGroup>
    );
  }
}

const allowedValues = ['left', 'center', 'right'];

SettingHorizontalAlign.propTypes = {
  value: PropTypes.oneOf(allowedValues),
  defaultValue: PropTypes.oneOf(allowedValues),
  onChange: PropTypes.func.isRequired,
};

export default withNamespaces()(SettingHorizontalAlign);
