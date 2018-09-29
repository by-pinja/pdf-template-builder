import { removeElement, updateElement } from '../Store/actions';
import { connect } from 'react-redux';
import ElementTools from '../Component/ElementTools';
import { getSelectedElementMeta } from '../Store/util';

const mapStateToProps = ({present}) => ({
  element: getSelectedElementMeta(present),
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