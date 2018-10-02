import { connect } from 'react-redux';
import PdfTemplateBuilder from '../Component/PdfTemplateBuilder';
import { configure, removeElement, selectElement, setLayout } from '../Store/actions';
import { ActionCreators as UndoActionCreators } from 'redux-undo'
import { getSelectedElementGroupId } from '../Store/util';

const mapStateToProps = ({present}) => ({
  layout: present.layout,
  selectedGroupId: getSelectedElementGroupId(present),
  schema: present.schema,
  selectedUuid: present.selectedUuid,
  pdfStorageUri: present.pdfStorageUri,
  page: present.page
});

const mapDispatchToProps = dispatch => ({
  onSelectElement: uuid => dispatch(selectElement(uuid)),
  onChangeLayout: (layout, parentId) => dispatch(setLayout(layout, parentId)),
  onDoConfigure: configurations => dispatch(configure(configurations)),
  onDeleteElement: uuid => dispatch(removeElement(uuid)),
  onUndo: () => dispatch(UndoActionCreators.undo()),
  onRedo: () => dispatch(UndoActionCreators.redo()),
  onClearHistory: () => dispatch(UndoActionCreators.clearHistory())
});

const PdfTemplateBuilderContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(PdfTemplateBuilder);

export default PdfTemplateBuilderContainer;