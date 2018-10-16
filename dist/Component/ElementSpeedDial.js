var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

import AddPhotoAlternate from '@material-ui/icons/AddPhotoAlternate';
import GroupIcon from '@material-ui/icons/BrandingWatermark';
import PropTypes from 'prop-types';
import React, { Component } from 'react';
import SpeedDial from '@material-ui/lab/SpeedDial/SpeedDial';
import SpeedDialAction from '@material-ui/lab/SpeedDialAction/SpeedDialAction';
import SpeedDialIcon from '@material-ui/lab/SpeedDialIcon/SpeedDialIcon';
import TemplateUtil from '../Util/TemplateUtil';
import TextFields from '@material-ui/icons/TextFields';
import { withNamespaces } from 'react-i18next';
import { withStyles } from '@material-ui/core/styles';

var styles = function styles(theme) {
  return {
    speedDial: {
      position: 'fixed',
      bottom: theme.spacing.unit * 2,
      right: theme.spacing.unit * 2,
      zIndex: 100
    }
  };
};

var actions = [{ icon: React.createElement(AddPhotoAlternate, null), name: 'Image', title: 'image' }, { icon: React.createElement(TextFields, null), name: 'Text', title: 'text' }, { icon: React.createElement(GroupIcon, null), name: 'Group', title: 'group' }];

var ElementSpeedDial = function (_Component) {
  _inherits(ElementSpeedDial, _Component);

  function ElementSpeedDial(props) {
    _classCallCheck(this, ElementSpeedDial);

    var _this = _possibleConstructorReturn(this, (ElementSpeedDial.__proto__ || Object.getPrototypeOf(ElementSpeedDial)).call(this, props));

    _this.handleClick = function (action) {
      return function () {
        _this.setState(function (state) {
          return {
            open: !state.open
          };
        });

        var element = TemplateUtil.createComponent();
        element.meta.type = action.toLowerCase();

        _this.props.onAddElement(element, _this.props.selectedUuid);
      };
    };

    _this.handleClose = _this.handleClose.bind(_this);
    _this.handleOpen = _this.handleOpen.bind(_this);
    _this.handleClick = _this.handleClick.bind(_this);

    _this.state = {
      open: false
    };
    return _this;
  }

  _createClass(ElementSpeedDial, [{
    key: 'handleClose',
    value: function handleClose() {
      this.setState({ open: false });
    }
  }, {
    key: 'handleOpen',
    value: function handleOpen() {
      this.setState({ open: true });
    }
  }, {
    key: 'render',
    value: function render() {
      var _this2 = this;

      var _props = this.props,
          classes = _props.classes,
          t = _props.t;
      var open = this.state.open;


      return React.createElement(
        'div',
        { className: classes.speedDial },
        React.createElement(
          SpeedDial,
          {
            ariaLabel: 'Element speed dial',
            icon: React.createElement(SpeedDialIcon, { openIcon: React.createElement(TextFields, null) }),
            onBlur: this.handleClose,
            onClick: this.handleClick('Text'),
            onClose: this.handleClose,
            onFocus: this.handleOpen,
            onMouseEnter: this.handleOpen,
            onMouseLeave: this.handleClose,
            open: open
          },
          actions.map(function (action) {
            return React.createElement(SpeedDialAction, {
              key: action.name,
              icon: action.icon,
              tooltipTitle: t(action.title),
              tooltipPlacement: 'left',
              tooltipOpen: true,
              onClick: _this2.handleClick(action.name)
            });
          })
        )
      );
    }
  }]);

  return ElementSpeedDial;
}(Component);

ElementSpeedDial.propTypes = {
  onAddElement: PropTypes.func.isRequired,
  selectedUuid: PropTypes.string
};

export default withNamespaces()(withStyles(styles)(ElementSpeedDial));