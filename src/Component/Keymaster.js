import { Component } from 'react';
import key from 'keymaster';
import PropTypes from 'prop-types';

class Keymaster extends Component {
  handlers = {
    'backspace': this.handleDelete,
    '⌘+z, ctrl+z': this.handleUndo,
    '⌘+shift+z, ctrl+shift+z': this.handleRedo,
  };

  constructor(props) {
    super(props);

    this.isElementSelected = this.isElementSelected.bind(this);
    this.bindAll = this.bindAll.bind(this);
    this.unbindAll = this.unbindAll.bind(this);
  }

  componentDidMount() {
    this.bindAll();
  }

  componentWillUnmount() {
    this.unbindAll();
  }

  bindAll() {
    Object.keys(this.handlers).forEach(
      keyCode => {
        let handler = this.handlers[keyCode];
        handler = handler.bind(this);

        key(keyCode, handler);
      }
    );
  }

  unbindAll() {
    Object.keys(this.handlers).forEach(keyCode => key.unbind(keyCode));
  }

  handleDelete() {
    if (!this.isElementSelected()) {
      return;
    }

    this.props.onDeleteElement(this.props.selectedUuid);
  }

  handleUndo() {
    this.props.onUndo();
  }

  handleRedo() {
    this.props.onRedo();
  }

  isElementSelected() {
    return !!this.props.selectedUuid;
  }

  render() {
    return '';
  }
}

Keymaster.propTypes = {
  selectedUuid: PropTypes.string,
  onDeleteElement: PropTypes.func.isRequired,
  onUndo: PropTypes.func.isRequired,
  onRedo: PropTypes.func.isRequired,
};

export default Keymaster;
