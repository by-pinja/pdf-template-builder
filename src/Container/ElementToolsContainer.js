import {removeElement, updateElement} from '../actions';
import { connect } from 'react-redux';
import ElementTools from '../Component/ElementTools';

const getSelectedElement = state => {
  if (!state.selectedUuid) {
    return null;
  }

  const element = state.layout.find(e => e.i === state.selectedUuid);

  return {...element.meta, i: state.selectedUuid};
};

const mapStateToProps = ({present}) => ({
  element: getSelectedElement(present),
  schema: present.schema
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