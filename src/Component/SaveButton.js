import React, { Component } from 'react';
import Tooltip from '@material-ui/core/Tooltip/Tooltip';
import Snackbar from '@material-ui/core/Snackbar';
import IconButton from '@material-ui/core/IconButton/IconButton';
import Save from '@material-ui/icons/Save';
import { withStyles } from '@material-ui/core/styles';
import PropTypes from 'prop-types';
import { withNamespaces } from 'react-i18next';

const styles = {
  '@media (min-width: 960px)': {
    snackbar: {
      top: 84
    }
  },
};

class SaveButton extends Component {
  state = {
    snackbarOpen: false
  };

  handleSave = () => {
    const { t, onSaveTemplate} = this.props;

    Promise.resolve(onSaveTemplate())
    .then((success) => {
      this.setState({
        snackbarOpen: true,
        snackbarText: t('saveSuccess')
      });
    })
    .catch(() => {
      this.setState({
        snackbarOpen: true,
        snackbarText: t('saveFail')
      });
    })
  }

  handleClose = () => {
    this.setState({
      snackbarOpen: false
    });
  }
  
  render() {
    if (!this.props.onSaveTemplate) {
      return '';
    }

    const { classes, t } = this.props;

    return (
      <Tooltip title={t('doSave')}>
        <div>
          <Snackbar
            open={this.state.snackbarOpen}
            onClose={this.handleClose}
            message={this.state.snackbarText}
            autoHideDuration={3000}
            anchorOrigin={{horizontal: 'right', vertical: 'top'}}
            classes={{root: classes.snackbar}}
          />

          <IconButton
            color="inherit"
            aria-label={t('doSave')}
            onClick={this.handleSave}
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

export default withNamespaces()(withStyles(styles)(SaveButton));
