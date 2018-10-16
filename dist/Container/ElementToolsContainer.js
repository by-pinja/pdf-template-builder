import { addElement, removeElement, resizeElement, updateElement } from '../Store/actions';
import { connect } from 'react-redux';
import ElementTools from '../Component/ElementTools';
import { getElement, getSelectedElementGroupId, getSelectedElementMeta } from '../Store/util';
import { t } from 'i18next';

var getAllowedSchemaObjects = function getAllowedSchemaObjects(elementUuid, state) {
  var parent = getElement(elementUuid, state);
  var current = getElement(state.selectedUuid, state);

  if (!current) {
    return [];
  }

  var typeFilter = function typeFilter(s) {
    return s.type === current.meta.type;
  };

  var allowed = [{ label: t('commonProperties'), options: state.schema.slice().filter(typeFilter) }];

  if (parent && parent.meta.tag) {
    var parentTagIndex = state.schema.findIndex(function (s) {
      return s.tag === parent.meta.tag.value;
    });

    // Remove the parent tag from the tags list
    allowed[0].options.splice(parentTagIndex, 1);

    allowed.unshift({
      label: parent.meta.tag.label,
      options: state.schema.find(function (s) {
        return s.tag === parent.meta.tag.value;
      }).items.filter(typeFilter)
    });
  }

  return allowed;
};

var mapStateToProps = function mapStateToProps(_ref) {
  var present = _ref.present;
  return {
    element: getSelectedElementMeta(present),
    schema: getAllowedSchemaObjects(getSelectedElementGroupId(present), present)
  };
};

var mapDispatchToProps = function mapDispatchToProps(dispatch) {
  return {
    onRemoveElement: function onRemoveElement(uuid) {
      return dispatch(removeElement(uuid));
    },
    onUpdateElement: function onUpdateElement(element) {
      return dispatch(updateElement(element));
    },
    onAddElement: function onAddElement(element, parentId) {
      return dispatch(addElement(element, parentId));
    },
    onResizeElement: function onResizeElement(i, width, height) {
      return dispatch(resizeElement(i, width, height));
    }
  };
};

var ElementToolsContainer = connect(mapStateToProps, mapDispatchToProps)(ElementTools);

export default ElementToolsContainer;