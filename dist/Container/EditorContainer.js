import { connect } from 'react-redux';
import Editor from '../Component/Editor';
import { configure, importTemplate, selectElement, setLayout } from '../Store/actions';
import { ActionCreators as UndoActionCreators } from 'redux-undo';
import { getSelectedElementGroupId } from '../Store/util';
import PageSize from '../Resource/PageSize';

var getPaperSize = function getPaperSize(state) {
  var _state$options = state.options,
      format = _state$options.format,
      orientation = _state$options.orientation;


  var pageSize = Object.assign({}, PageSize.size[format.toLowerCase()]);

  if (orientation === PageSize.orientation.landscape) {
    pageSize.width = [pageSize.height, pageSize.height = pageSize.width][0];
  }

  return pageSize;
};

var mapStateToProps = function mapStateToProps(_ref) {
  var present = _ref.present;
  return {
    bordersVisible: present.bordersVisible,
    layout: present.layout,
    page: present.page,
    options: present.options,
    editorLoading: present.editorLoading,
    selectedGroupId: getSelectedElementGroupId(present),
    schema: present.schema,
    selectedUuid: present.selectedUuid,
    pdfStorageUri: present.pdfStorageUri,
    gridVisible: present.gridVisible,
    paperSize: getPaperSize(present)
  };
};

var mapDispatchToProps = function mapDispatchToProps(dispatch) {
  return {
    onSelectElement: function onSelectElement(uuid) {
      return dispatch(selectElement(uuid));
    },
    onChangeLayout: function onChangeLayout(layout, parentId) {
      return dispatch(setLayout(layout, parentId));
    },
    onImportTemplate: function onImportTemplate(layout) {
      return dispatch(importTemplate(layout));
    },
    onDoConfigure: function onDoConfigure(configurations) {
      return dispatch(configure(configurations));
    },
    onClearHistory: function onClearHistory() {
      return dispatch(UndoActionCreators.clearHistory());
    }
  };
};

var EditorContainer = connect(mapStateToProps, mapDispatchToProps)(Editor);

export default EditorContainer;