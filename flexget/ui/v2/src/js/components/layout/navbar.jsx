import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { withStyles, createStyleSheet } from 'material-ui/styles';
import Toolbar from 'material-ui/Toolbar';
import IconButton from 'material-ui/IconButton';
import Icon from 'material-ui/Icon';
import Menu, { MenuItem } from 'material-ui/Menu';
import 'font-awesome/css/font-awesome.css';

const styleSheet = createStyleSheet('Navbar', theme => ({
  spacer: {
    flex: 1,
  },
  toolbar: {
    backgroundColor: theme.palette.primary[800],
    position: 'relative',
    height: '100%',
  },
  icon: {
    color: theme.palette.background.default,
  },
  menuIcon: {
    paddingRight: 30,
  },
}));

class Navbar extends Component {
  static propTypes = {
    classes: PropTypes.object.isRequired,
  };

  state = {
    open: false,
  };

  handleRequestClose = () => this.setState({ open: false })

  handleClick = event => this.setState({
    open: true,
    anchorEl: event.currentTarget,
  })

  render() {
    const { classes } = this.props;
    const { anchorEl, open } = this.state;

    return (
      <Toolbar className={classes.toolbar}>
        <IconButton className={classes.icon}>
          <Icon className="fa fa-bars" />
        </IconButton>
        <div className={classes.spacer} />
        <Link to="/config">
          <IconButton
            className={classes.icon}

            aria-label="Config"
          >
            <Icon className="fa fa-pencil" />
          </IconButton>
        </Link>
        <Link to="/log">
          <IconButton
            className={classes.icon}
            aria-label="Log"
          >
            <Icon className="fa fa-file-text-o" />
          </IconButton>
        </Link>
        <IconButton
          className={classes.icon}
          aria-label="Manage"
          onClick={this.handleClick}
        >
          <Icon className="fa fa-cog" />
        </IconButton>
        <Menu
          id="nav-menu"
          anchorEl={anchorEl}
          open={open}
          onRequestClose={this.handleRequestClose}
        >
          <MenuItem>
            <Icon className={`${classes.menuIcon} fa fa-refresh`} />
            Reload
          </MenuItem>
          <MenuItem>
            <Icon className={`${classes.menuIcon} fa fa-power-off`} />
            Shutdown
          </MenuItem>
          <MenuItem>
            <Icon className={`${classes.menuIcon} fa fa-database`} />
            Database
          </MenuItem>
          <MenuItem>
            <Icon className={`${classes.menuIcon} fa fa-sign-out`} />
            Logout
          </MenuItem>
        </Menu>
      </Toolbar>
    );
  }
}

export default withStyles(styleSheet)(Navbar);
