import { addElement, removeElement, updateElement } from '../Store/actions';
import { connect } from 'react-redux';
import ElementTools from '../Component/ElementTools';
import { getParentElement, getSelectedElementGroupId, getSelectedElementMeta } from '../Store/util';

const getAllowedSchemaObjects = (elementUuid, state) => {
  const parent = getParentElement(elementUuid, state);

  const allowed = [
    { label: 'Root', options: state.schema.slice() }
  ];

  if (parent && parent.meta.tag) {
    const parentTagIndex = state.schema
      .findIndex(s => s.tag === parent.meta.tag.value);

    // Remove the parent tag from the tags list
    allowed[0].options.splice(parentTagIndex, 1);

    allowed.unshift({ 
      label: parent.meta.tag.label,
      options: state.schema
        .find(s => s.tag === parent.meta.tag.value).items
    });
  }

  return allowed;
};

const mapStateToProps = ({present}) => ({
  element: getSelectedElementMeta(present),
  schema: getAllowedSchemaObjects(getSelectedElementGroupId(present), present)
});

const mapDispatchToProps = dispatch => ({
  onRemoveElement: uuid => dispatch(removeElement(uuid)),
  onUpdateElement: element => dispatch(updateElement(element)),
  onAddElement: (element, parentId) => dispatch(addElement(element, parentId))
});

const ElementToolsContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(ElementTools);

export default ElementToolsContainer;