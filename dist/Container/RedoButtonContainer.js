import { connect } from 'react-redux';
import { ActionCreators as UndoActionCreators } from 'redux-undo';
import RedoButton from '../Component/RedoButton';

var mapStateToProps = function mapStateToProps(state) {
  return {
    canRedo: state.future.length > 0
  };
};

var mapDispatchToProps = function mapDispatchToProps(dispatch) {
  return {
    onRedo: function onRedo() {
      return dispatch(UndoActionCreators.redo());
    }
  };
};

var RedoButtonContainer = connect(mapStateToProps, mapDispatchToProps)(RedoButton);

export default RedoButtonContainer;