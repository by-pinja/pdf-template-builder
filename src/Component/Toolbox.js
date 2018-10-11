import AppBar from '@material-ui/core/AppBar/AppBar';
import PageToolsContainer from '../Container/PageToolsContainer';
import PreviewButtonContainer from '../Container/PreviewButtonContainer';
import React, { Component } from 'react';
import RedoButtonContainer from '../Container/RedoButtonContainer';
import SaveButtonContainer from '../Container/SaveButtonContainer';
import ToggleBordersContainer from '../Container/ToggleBordersContainer';
import ToggleGridButtonContainer from '../Container/ToggleGridButtonContainer';
import Toolbar from '@material-ui/core/Toolbar/Toolbar';
import Typography from '@material-ui/core/Typography/Typography';
import UndoButtonContainer from '../Container/UndoButtonContainer';
import { withNamespaces } from 'react-i18next';
import { withStyles } from '@material-ui/core/styles';

const styles = theme => ({
  bar: {
    marginBottom: theme.spacing.unit * 2
  },
  grow: {
    flexGrow: 1
  }
});

class Toolbox extends Component {
  render() {
    const { classes, t } = this.props;

    return (
      <AppBar position="static" className={classes.bar}>
        <Toolbar>
          <Typography variant="title" color="inherit" className={classes.grow}>
            {t('pdfTemplateBuilder')}
          </Typography>

          <PageToolsContainer />
          <ToggleBordersContainer />
          <ToggleGridButtonContainer />
          <UndoButtonContainer />
          <RedoButtonContainer />
          <PreviewButtonContainer />
          <SaveButtonContainer />
        </Toolbar>
      </AppBar>
    );
  }
}

export default withNamespaces()(withStyles(styles)(Toolbox));