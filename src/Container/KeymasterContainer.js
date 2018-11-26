import Keymaster from '../Component/Keymaster';
import { ActionCreators as UndoActionCreators } from "redux-undo";
import { connect } from 'react-redux';
import { getSelectedElementMeta } from '../Store/util';
import { duplicateElement, removeElement, updateElement } from '../Store/actions';

const mapStateToProps = ({present}) => ({
  meta: getSelectedElementMeta(present),
  selectedUuid: present.selectedUuid,
});

const mapDispatchToProps = dispatch => ({
  onDeleteElement: uuid => dispatch(removeElement(uuid)),
  onDuplicateElement: element => dispatch(duplicateElement(element)),
  onRedo: () => dispatch(UndoActionCreators.redo()),
  onUndo: () => dispatch(UndoActionCreators.undo()),
  onUpdateElement: element => dispatch(updateElement(element)),
});

const KeymasterContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(Keymaster);

export default KeymasterContainer;
