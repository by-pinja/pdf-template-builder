import FormatBoldIcon from '@material-ui/icons/FormatBold';
import FormatItalicIcon from '@material-ui/icons/FormatItalic';
import FormatUnderlinedIcon from '@material-ui/icons/FormatUnderlined';
import PropTypes from 'prop-types';
import React, { Component } from 'react';
import ToggleButton from '@material-ui/lab/ToggleButton/ToggleButton';
import ToggleButtonGroup from '@material-ui/lab/ToggleButtonGroup/ToggleButtonGroup';
import Tooltip from '@material-ui/core/Tooltip/Tooltip';
import { withNamespaces } from 'react-i18next';

class SettingFontStyle extends Component {
  render() {
    const { t, value, onChange } = this.props;

    return (
      <ToggleButtonGroup
        value={value}
        onChange={onChange}
      >
        <ToggleButton value="bold">
          <Tooltip title={t('bold')}>
            <FormatBoldIcon />
          </Tooltip>
        </ToggleButton>
        <ToggleButton value="italic">
          <Tooltip title={t('italic')}>
            <FormatItalicIcon />
          </Tooltip>
        </ToggleButton>
        <ToggleButton value="underline">
          <Tooltip title={t('underline')}>
            <FormatUnderlinedIcon />
          </Tooltip>
        </ToggleButton>
      </ToggleButtonGroup>
    );
  }
}

SettingFontStyle.propTypes = {
  value: PropTypes.array,
  onChange: PropTypes.func.isRequired
};

export default withNamespaces()(SettingFontStyle);