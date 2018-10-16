import { connect } from 'react-redux';
import Editor from '../Component/Editor';
import { configure, importTemplate, selectElement, setLayout } from '../Store/actions';
import { ActionCreators as UndoActionCreators } from 'redux-undo'
import { getSelectedElementGroupId } from '../Store/util';
import PageSize from '../Resource/PageSize';

const getPaperSize = state => {
  const { format, orientation } = state.options;

  const pageSize = Object.assign({}, PageSize.size[format.toLowerCase()]);

  if (orientation === PageSize.orientation.landscape) {
    pageSize.width = [pageSize.height, pageSize.height = pageSize.width][0];
  }

  return pageSize;
};

const mapStateToProps = ({present}) => ({
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
});

const mapDispatchToProps = dispatch => ({
  onSelectElement: uuid => dispatch(selectElement(uuid)),
  onChangeLayout: (layout, parentId) => dispatch(setLayout(layout, parentId)),
  onImportTemplate: layout => dispatch(importTemplate(layout)),
  onDoConfigure: configurations => dispatch(configure(configurations)),
  onClearHistory: () => dispatch(UndoActionCreators.clearHistory())
});

const EditorContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(Editor);

export default EditorContainer;