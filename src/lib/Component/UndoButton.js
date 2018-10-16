import React, { Component } from 'react';
import Tooltip from '@material-ui/core/Tooltip/Tooltip';
import IconButton from '@material-ui/core/IconButton/IconButton';
import Undo from '@material-ui/icons/Undo';
import PropTypes from 'prop-types';
import { withNamespaces } from 'react-i18next';

class UndoButton extends Component {
  render() {
    const { t } = this.props;

    return (
      <Tooltip title={t('doUndo')}>
        <div>
          <IconButton
            color="inherit"
            aria-label={t('doUndo')}
            onClick={this.props.canUndo ? this.props.onUndo : undefined}
            disabled={!this.props.canUndo}
          >
            <Undo />
          </IconButton>
        </div>
      </Tooltip>
    );
  }
}

UndoButton.propTypes = {
  canUndo: PropTypes.bool.isRequired,
  onUndo: PropTypes.func.isRequired
};

export default withNamespaces()(UndoButton);
