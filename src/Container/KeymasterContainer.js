import Keymaster from '../Component/Keymaster';
import { ActionCreators as UndoActionCreators } from "redux-undo";
import { connect } from 'react-redux';
import { removeElement } from '../Store/actions';

const mapStateToProps = ({present}) => ({
  selectedUuid: present.selectedUuid
});

const mapDispatchToProps = dispatch => ({
  onDeleteElement: uuid => dispatch(removeElement(uuid)),
  onUndo: () => dispatch(UndoActionCreators.undo()),
  onRedo: () => dispatch(UndoActionCreators.redo()),
});

const KeymasterContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(Keymaster);

export default KeymasterContainer;
