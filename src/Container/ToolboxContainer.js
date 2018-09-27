import { connect } from 'react-redux';
import Toolbox from '../Component/Toolbox';
import { ActionCreators as UndoActionCreators } from 'redux-undo';

const mapStateToProps = state => ({
  canUndo: state.past.length > 0,
  canRedo: state.future.length > 0
});

const mapDispatchToProps = dispatch => ({
  onUndo: () => dispatch(UndoActionCreators.undo()),
  onRedo: () => dispatch(UndoActionCreators.redo())
});

const ToolboxContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(Toolbox);

export default ToolboxContainer;
