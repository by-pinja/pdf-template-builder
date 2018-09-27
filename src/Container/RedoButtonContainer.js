import { connect } from 'react-redux';
import { ActionCreators as UndoActionCreators } from 'redux-undo';
import RedoButton from '../Component/RedoButton';

const mapStateToProps = state => ({
  canRedo: state.future.length > 0
});

const mapDispatchToProps = dispatch => ({
  onRedo: () => dispatch(UndoActionCreators.redo())
});

const RedoButtonContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(RedoButton);

export default RedoButtonContainer;
