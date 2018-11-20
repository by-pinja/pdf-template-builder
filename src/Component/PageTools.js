import React, { Component } from 'react';
import Card from '@material-ui/core/Card/Card';
import Typography from '@material-ui/core/Typography/Typography';
import CardContent from '@material-ui/core/CardContent/CardContent';
import Grid from '@material-ui/core/Grid/Grid';
import Tooltip from '@material-ui/core/Tooltip/Tooltip';
import SettingsIcon from '@material-ui/icons/Settings';
import { withStyles } from '@material-ui/core/styles';
import PropTypes from 'prop-types'
import FormControlLabel from '@material-ui/core/FormControlLabel/FormControlLabel';
import Switch from '@material-ui/core/Switch/Switch';
import FormGroup from '@material-ui/core/FormGroup/FormGroup';
import SettingPageSizeContainer from '../Container/SettingPageSizeContainer';
import Popper from '@material-ui/core/Popper/Popper';
import IconButton from '@material-ui/core/IconButton/IconButton';
import ClickAwayListener from '@material-ui/core/ClickAwayListener/ClickAwayListener';
import { withNamespaces } from 'react-i18next';

const styles = theme => ({
  popper: {
    zIndex: 2,
    minWidth: 350
  },
});

class PageTools extends Component {
  constructor(props) {
    super(props);

    this.state = { open: false, anchorEl: null };

    this.handleChange = this.handleChange.bind(this);
    this.handleToggleSettings = this.handleToggleSettings.bind(this);
    this.handleClickAway = this.handleClickAway.bind(this);
  }

  handleChange = name => event => {
    const page = {
      ...this.props.page,
      [name]: event.target.checked
    };

    this.props.onUpdatePage(page);
  };

  handleToggleSettings(e) {
    this.setState({
      open: !this.state.open,
      anchorEl: e.target
    });
  }

  handleClickAway() {
    this.setState({
      open: false,
      anchorEl: null
    });
  }

  render() {
    const { classes, t } = this.props;
    const { open, anchorEl } = this.state;

    const id = open ? 'page-settings-popper' : null;

    return (
      <ClickAwayListener onClickAway={this.handleClickAway}>
        <div style={{ zIndex: 100 }}>
          <Tooltip title={t('pageSettings')}>
            <IconButton
              color="inherit"
              aria-label={t('pageSettings')}
              onClick={this.handleToggleSettings}
            >
              <SettingsIcon/>
            </IconButton>
          </Tooltip>
          <Popper
            id={id}
            anchorEl={anchorEl}
            open={open}
            disablePortal={true}
            className={classes.popper}
          >
            <Card>
              <CardContent>
                <Grid container spacing={24}>
                  <Grid item xs={12}>
                    <Typography color="textSecondary" variant="headline">
                      {t('pageSettings')}
                    </Typography>
                  </Grid>

                  <Grid item xs={12}>
                    <FormGroup row>
                      <FormControlLabel
                        control={
                          <Switch
                            checked={this.props.page.layoutRelative}
                            onChange={this.handleChange('layoutRelative')}
                            value="layoutRelative"
                          />
                        }
                        label={t('layoutRelative')}
                      />
                    </FormGroup>
                  </Grid>
                </Grid>

                <SettingPageSizeContainer />
              </CardContent>
            </Card>
          </Popper>
        </div>
      </ClickAwayListener>
    );
  }
}

PageTools.propTypes = {
  onUpdatePage: PropTypes.func.isRequired,
  page: PropTypes.object.isRequired
};

export default withNamespaces()(withStyles(styles)(PageTools));
