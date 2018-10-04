import React, { Component } from 'react';
import Card from '@material-ui/core/Card/Card';
import Typography from '@material-ui/core/Typography/Typography';
import CardContent from '@material-ui/core/CardContent/CardContent';
import Button from '@material-ui/core/Button/Button';
import { withStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid/Grid';
import Tooltip from '@material-ui/core/Tooltip/Tooltip';
import NoteAdd from '@material-ui/icons/NoteAdd';
import PropTypes from 'prop-types'
import FormControlLabel from '@material-ui/core/FormControlLabel/FormControlLabel';
import Switch from '@material-ui/core/Switch/Switch';
import FormGroup from '@material-ui/core/FormGroup/FormGroup';
import SettingPageSizeContainer from '../Container/SettingPageSizeContainer';

const styles = theme => ({
  actionButton: {
    float: 'right'
  },
  card: {
    marginTop: theme.spacing.unit * 2
  }
});

class PageTools extends Component {
  constructor(props) {
    super(props);

    this.handleChange = this.handleChange.bind(this);
  }

  handleChange = name => event => {
    const page = {
      ...this.props.page,
      [name]: event.target.checked
    };

    this.props.onUpdatePage(page);
  };

  render() {
    const { classes } = this.props;

    return (
      <Card>
        <CardContent>
          <Grid container spacing={24}>
            <Grid item xs={12}>
              <Typography color="textSecondary" variant="headline">
                Page settings

                <Tooltip title="Add new element">
                  <Button
                    variant="fab"
                    color="primary"
                    aria-label="Add"
                    mini={true}
                    onClick={this.props.onAddElement}
                    className={classes.actionButton}
                  >
                    <NoteAdd/>
                  </Button>
                </Tooltip>
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
                  label="Use relative layout"
                />
              </FormGroup>
            </Grid>
          </Grid>

          <SettingPageSizeContainer />
        </CardContent>
      </Card>
    );
  }
}

PageTools.propTypes = {
  onAddElement: PropTypes.func.isRequired,
  onUpdatePage: PropTypes.func.isRequired,
  page: PropTypes.object.isRequired
};

export default withStyles(styles)(PageTools);