import React, { Component } from 'react';
import Tooltip from '@material-ui/core/Tooltip/Tooltip';
import IconButton from '@material-ui/core/IconButton/IconButton';
import Redo from '@material-ui/icons/Redo';
import PropTypes from 'prop-types';
import { withNamespaces } from 'react-i18next';

class RedoButton extends Component {
  render() {
    const { t } = this.props;

    return (
      <Tooltip title={t('doRedo')}>
        <div>
          <IconButton
            color="inherit"
            aria-label={t('doRedo')}
            onClick={this.props.canRedo ? this.props.onRedo : undefined}
            disabled={!this.props.canRedo}
          >
            <Redo />
          </IconButton>
        </div>
      </Tooltip>
    );
  }
}

RedoButton.propTypes = {
  canRedo: PropTypes.bool.isRequired,
  onRedo: PropTypes.func.isRequired
};

export default withNamespaces()(RedoButton);
