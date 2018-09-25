import React, { Component } from 'react';
import Card from '@material-ui/core/Card/Card';
import Typography from '@material-ui/core/Typography/Typography';
import CardContent from '@material-ui/core/CardContent/CardContent';
import TextField from '@material-ui/core/TextField/TextField';
import Button from '@material-ui/core/Button/Button';
import { withStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid/Grid';
import Tooltip from '@material-ui/core/Tooltip/Tooltip';
import Delete from '@material-ui/icons/Delete';
import MenuItem from '@material-ui/core/es/MenuItem/MenuItem';

const styles = theme => ({
  actionButton: {
    float: 'right'
  },
  card: {
    marginTop: theme.spacing.unit * 2
  },
  select: {
    width: '100%'
  }
});

class ElementTools extends Component {
  constructor(props) {
    super(props);

    this.handleChange = this.handleChange.bind(this);

    this.state = {
      element: props.element
    };
  }

  componentWillReceiveProps(props) {
    if (!props.element) {
      return this.setState({ element: null });
    }

    if (props.element && props.element.i !== (this.state.element || {}).i) {
      this.setState({ element: props.element });
    }
  }

  handleChange = name => event => {
    const element = {
      ...this.props.element, 
      [name]: event.target.value
    };

    this.props.onChangeElement(element);

    this.setState({ element });
  };

  render() {
    const { classes } = this.props;

    if (!this.state.element) {
      return '';
    }

    return (
      <Card className={classes.card}>
        <CardContent>
          <Grid item xs={12}>
            <Grid container>
              <Grid item xs={12}>
                <Typography color="textSecondary" variant="headline">
                  Element settings

                  <Tooltip title="Delete this element">
                    <Button
                      variant="fab"
                      color="secondary"
                      aria-label="Remove"
                      mini={true}
                      className={classes.actionButton}
                      onClick={this.props.onDeleteElement}
                    >
                      <Delete/>
                    </Button>
                  </Tooltip>
                </Typography>
              </Grid>
            </Grid>

            <Grid container>
              <Grid item xs={6}>
                <TextField
                  id="tag"
                  label="Bind"
                  className={classes.select}
                  select
                  value={this.state.element.tag || ''}
                  onChange={this.handleChange('tag')}
                  margin="normal"
                  SelectProps={{}}
                >
                  {this.props.schema.map(row => (
                    <MenuItem
                      key={row.tag}
                      value={row.tag}
                    >
                      {row.text}
                    </MenuItem>
                  ))}
                </TextField>
              </Grid>
            </Grid>
          </Grid>
        </CardContent>
      </Card>
    );
  }
}

export default withStyles(styles)(ElementTools);