import { connect } from 'react-redux';
import { ActionCreators as UndoActionCreators } from 'redux-undo';
import UndoButton from '../Component/UndoButton';

var mapStateToProps = function mapStateToProps(state) {
  return {
    canUndo: state.past.length > 0
  };
};

var mapDispatchToProps = function mapDispatchToProps(dispatch) {
  return {
    onUndo: function onUndo() {
      return dispatch(UndoActionCreators.undo());
    }
  };
};

var UndoButtonContainer = connect(mapStateToProps, mapDispatchToProps)(UndoButton);

export default UndoButtonContainer;