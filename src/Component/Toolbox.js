import React, { Component } from 'react';
import AppBar from '@material-ui/core/AppBar/AppBar';
import Toolbar from '@material-ui/core/Toolbar/Toolbar';
import Typography from '@material-ui/core/Typography/Typography';
import { withStyles } from '@material-ui/core/styles';
import PreviewButtonContainer from '../Container/PreviewButtonContainer';
import UndoButtonContainer from '../Container/UndoButtonContainer';
import RedoButtonContainer from '../Container/RedoButtonContainer';
import SaveButtonContainer from '../Container/SaveButtonContainer';
import ToggleGridButtonContainer from '../Container/ToggleGridButtonContainer';

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
    const { classes } = this.props;

    return (
      <AppBar position="static" className={classes.bar}>
        <Toolbar>
          <Typography variant="title" color="inherit" className={classes.grow}>
            PDF template builder
          </Typography>

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

export default withStyles(styles)(Toolbox);