import {removeElement, updateElement} from '../actions';
import { connect } from 'react-redux';
import ElementTools from '../Component/ElementTools';

const getSelectedElement = state => {
  if (!state.selectedUuid) {
    return null;
  }

  return {...state.elements[state.selectedUuid], i: state.selectedUuid};
};

const mapStateToProps = state => ({
  element: getSelectedElement(state),
  schema: state.schema
});

const mapDispatchToProps = dispatch => ({
  onRemoveElement: uuid => dispatch(removeElement(uuid)),
  onUpdateElement: element => dispatch(updateElement(element))
});

const ElementToolsContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(ElementTools);

export default ElementToolsContainer;