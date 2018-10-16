import { connect } from 'react-redux';
import { ActionCreators as UndoActionCreators } from 'redux-undo';
import UndoButton from '../Component/UndoButton';

const mapStateToProps = state => ({
  canUndo: state.past.length > 0
});

const mapDispatchToProps = dispatch => ({
  onUndo: () => dispatch(UndoActionCreators.undo())
});

const UndoButtonContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(UndoButton);

export default UndoButtonContainer;
