import { Component } from 'react';
import key from 'keymaster';
import PropTypes from 'prop-types';

class Keymaster extends Component {
  handlers = {
    'backspace': this.handleDelete,
    '⌘+z, ctrl+z': this.handleUndo,
    '⌘+shift+z, ctrl+shift+z': this.handleRedo,
    '⌘+b, ctrl+b': this.handleFontStyle('bold'),
    '⌘+u, ctrl+u': this.handleFontStyle('underline'),
    '⌘+i, ctrl+i': this.handleFontStyle('italic'),
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

  handleFontStyle(prop) {
    return () => {
      if (!this.isElementSelected()) {
        return;
      }

      const { meta, meta: { fontStyle }} = this.props;

      const style = (fontStyle || []).slice();

      if (style.includes(prop)) {
        style.splice(style.indexOf(prop), 1);
      } else {
        style.push(prop);
      }

      this.props.onUpdateElement({ ...meta, fontStyle: style });
    }
  }

  isElementSelected() {
    return !!this.props.selectedUuid;
  }

  render() {
    return '';
  }
}

Keymaster.propTypes = {
  meta: PropTypes.object,
  selectedUuid: PropTypes.string,
  onDeleteElement: PropTypes.func.isRequired,
  onUndo: PropTypes.func.isRequired,
  onRedo: PropTypes.func.isRequired,
  onUpdateElement: PropTypes.func.isRequired,
};

export default Keymaster;
