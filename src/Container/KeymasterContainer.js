import Keymaster from '../Component/Keymaster';
import { ActionCreators as UndoActionCreators } from "redux-undo";
import { connect } from 'react-redux';
import { getSelectedElementMeta } from '../Store/util';
import { duplicateElement, removeElement, updateElement } from '../Store/actions';

const mapStateToProps = ({present}) => ({
  meta: getSelectedElementMeta(present),
  selectedUuids: present.selectedUuids,
});

const mapDispatchToProps = dispatch => ({
  onDeleteElement: uuids => dispatch(removeElement(uuids)),
  onDuplicateElement: element => dispatch(duplicateElement(element)),
  onRedo: () => dispatch(UndoActionCreators.redo()),
  onUndo: () => dispatch(UndoActionCreators.undo()),
  onUpdateElement: uuids => dispatch(updateElement(uuids)),
});

const KeymasterContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(Keymaster);

export default KeymasterContainer;
