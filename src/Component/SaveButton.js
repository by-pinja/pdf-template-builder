import React, { Component } from 'react';
import Tooltip from '@material-ui/core/Tooltip/Tooltip';
import IconButton from '@material-ui/core/IconButton/IconButton';
import Save from '@material-ui/icons/Save';
import PropTypes from 'prop-types';
import { withNamespaces } from 'react-i18next';

class SaveButton extends Component {
  render() {
    if (!this.props.onSaveTemplate) {
      return '';
    }

    const { t } = this.props;

    return (
      <Tooltip title={t('doSave')}>
        <div>
          <IconButton
            color="inherit"
            aria-label={t('doSave')}
            onClick={this.props.onSaveTemplate}
          >
            <Save />
          </IconButton>
        </div>
      </Tooltip>
    );
  }
}

SaveButton.propTypes = {
  onSaveTemplate: PropTypes.func
};

export default withNamespaces()(SaveButton);
