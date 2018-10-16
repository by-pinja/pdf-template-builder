import { addElement, removeElement, resizeElement, updateElement } from '../Store/actions';
import { connect } from 'react-redux';
import ElementTools from '../Component/ElementTools';
import { getElement, getSelectedElementGroupId, getSelectedElementMeta } from '../Store/util';
import { t } from 'i18next';

const getAllowedSchemaObjects = (elementUuid, state) => {
  const parent = getElement(elementUuid, state);
  const current = getElement(state.selectedUuid, state);

  if (!current) {
    return [];
  }

  const typeFilter = s => s.type === current.meta.type;

  const allowed = [
    { label: t('commonProperties'), options: state.schema.slice().filter(typeFilter) }
  ];

  if (parent && parent.meta.tag) {
    const parentTagIndex = state.schema
      .findIndex(s => s.tag === parent.meta.tag.value);

    // Remove the parent tag from the tags list
    allowed[0].options.splice(parentTagIndex, 1);

    allowed.unshift({ 
      label: parent.meta.tag.label,
      options: state.schema
        .find(s => s.tag === parent.meta.tag.value).items.filter(typeFilter)
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
  onAddElement: (element, parentId) => dispatch(addElement(element, parentId)),
  onResizeElement: (i, width, height) => dispatch(resizeElement(i, width, height))
});

const ElementToolsContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(ElementTools);

export default ElementToolsContainer;