import Keymaster from '../Component/Keymaster';
import { ActionCreators as UndoActionCreators } from "redux-undo";
import { connect } from 'react-redux';
import { getSelectedElementMeta } from '../Store/util';
import { removeElement, updateElement } from '../Store/actions';

var mapStateToProps = function mapStateToProps(_ref) {
  var present = _ref.present;
  return {
    meta: getSelectedElementMeta(present),
    selectedUuid: present.selectedUuid
  };
};

var mapDispatchToProps = function mapDispatchToProps(dispatch) {
  return {
    onDeleteElement: function onDeleteElement(uuid) {
      return dispatch(removeElement(uuid));
    },
    onRedo: function onRedo() {
      return dispatch(UndoActionCreators.redo());
    },
    onUndo: function onUndo() {
      return dispatch(UndoActionCreators.undo());
    },
    onUpdateElement: function onUpdateElement(element) {
      return dispatch(updateElement(element));
    }
  };
};

var KeymasterContainer = connect(mapStateToProps, mapDispatchToProps)(Keymaster);

export default KeymasterContainer;