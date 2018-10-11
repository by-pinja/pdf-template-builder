import BorderBottomIcon from '@material-ui/icons/BorderBottom';
import BorderLeftIcon from '@material-ui/icons/BorderLeft';
import BorderRightIcon from '@material-ui/icons/BorderRight';
import BorderTopIcon from '@material-ui/icons/BorderTop';
import PropTypes from 'prop-types';
import React, { Component } from 'react';
import ToggleButton from '@material-ui/lab/ToggleButton/ToggleButton';
import ToggleButtonGroup from '@material-ui/lab/ToggleButtonGroup/ToggleButtonGroup';
import Tooltip from '@material-ui/core/Tooltip/Tooltip';
import { withNamespaces } from 'react-i18next';

const options = [
  { value: 'left', icon: <BorderLeftIcon /> },
  { value: 'right', icon: <BorderRightIcon /> },
  { value: 'top', icon: <BorderTopIcon /> },
  { value: 'bottom', icon: <BorderBottomIcon /> },
];

class SettingBorder extends Component {
  render() {
    const { t, onChange, value } = this.props;

    return(
      <ToggleButtonGroup
        value={value}
        onChange={onChange}
      >
        {options.map(({ value, icon }) => (
          <ToggleButton value={value} key={value}>
            <Tooltip title={t(value)}>
              {icon}
            </Tooltip>
          </ToggleButton>
        ))}
      </ToggleButtonGroup>
    );
  }
}

SettingBorder.propTypes = {
  onChange: PropTypes.func.isRequired,
  value: PropTypes.array.isRequired
};

export default withNamespaces()(SettingBorder);