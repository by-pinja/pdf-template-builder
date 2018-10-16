var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

import React, { Component } from 'react';
import Card from '@material-ui/core/Card/Card';
import Typography from '@material-ui/core/Typography/Typography';
import CardContent from '@material-ui/core/CardContent/CardContent';
import Grid from '@material-ui/core/Grid/Grid';
import Tooltip from '@material-ui/core/Tooltip/Tooltip';
import SettingsIcon from '@material-ui/icons/Settings';
import PropTypes from 'prop-types';
import FormControlLabel from '@material-ui/core/FormControlLabel/FormControlLabel';
import Switch from '@material-ui/core/Switch/Switch';
import FormGroup from '@material-ui/core/FormGroup/FormGroup';
import SettingPageSizeContainer from '../Container/SettingPageSizeContainer';
import Popper from '@material-ui/core/Popper/Popper';
import IconButton from '@material-ui/core/IconButton/IconButton';
import ClickAwayListener from '@material-ui/core/ClickAwayListener/ClickAwayListener';
import { withNamespaces } from 'react-i18next';

var PageTools = function (_Component) {
  _inherits(PageTools, _Component);

  function PageTools(props) {
    _classCallCheck(this, PageTools);

    var _this = _possibleConstructorReturn(this, (PageTools.__proto__ || Object.getPrototypeOf(PageTools)).call(this, props));

    _this.handleChange = function (name) {
      return function (event) {
        var page = Object.assign({}, _this.props.page, _defineProperty({}, name, event.target.checked));

        _this.props.onUpdatePage(page);
      };
    };

    _this.state = { open: false, anchorEl: null };

    _this.handleChange = _this.handleChange.bind(_this);
    _this.handleToggleSettings = _this.handleToggleSettings.bind(_this);
    _this.handleClickAway = _this.handleClickAway.bind(_this);
    return _this;
  }

  _createClass(PageTools, [{
    key: 'handleToggleSettings',
    value: function handleToggleSettings(e) {
      this.setState({
        open: !this.state.open,
        anchorEl: e.target
      });
    }
  }, {
    key: 'handleClickAway',
    value: function handleClickAway() {
      this.setState({
        open: false,
        anchorEl: null
      });
    }
  }, {
    key: 'render',
    value: function render() {
      var t = this.props.t;
      var _state = this.state,
          open = _state.open,
          anchorEl = _state.anchorEl;


      var id = open ? 'page-settings-popper' : null;

      return React.createElement(
        ClickAwayListener,
        { onClickAway: this.handleClickAway },
        React.createElement(
          'div',
          { style: { zIndex: 100 } },
          React.createElement(
            Tooltip,
            { title: t('pageSettings') },
            React.createElement(
              IconButton,
              {
                color: 'inherit',
                'aria-label': t('pageSettings'),
                onClick: this.handleToggleSettings
              },
              React.createElement(SettingsIcon, null)
            )
          ),
          React.createElement(
            Popper,
            { id: id, anchorEl: anchorEl, open: open, disablePortal: true },
            React.createElement(
              Card,
              null,
              React.createElement(
                CardContent,
                null,
                React.createElement(
                  Grid,
                  { container: true, spacing: 24 },
                  React.createElement(
                    Grid,
                    { item: true, xs: 12 },
                    React.createElement(
                      Typography,
                      { color: 'textSecondary', variant: 'headline' },
                      t('pageSettings')
                    )
                  ),
                  React.createElement(
                    Grid,
                    { item: true, xs: 12 },
                    React.createElement(
                      FormGroup,
                      { row: true },
                      React.createElement(FormControlLabel, {
                        control: React.createElement(Switch, {
                          checked: this.props.page.layoutRelative,
                          onChange: this.handleChange('layoutRelative'),
                          value: 'layoutRelative'
                        }),
                        label: t('layoutRelative')
                      })
                    )
                  )
                ),
                React.createElement(SettingPageSizeContainer, null)
              )
            )
          )
        )
      );
    }
  }]);

  return PageTools;
}(Component);

PageTools.propTypes = {
  onUpdatePage: PropTypes.func.isRequired,
  page: PropTypes.object.isRequired
};

export default withNamespaces()(PageTools);