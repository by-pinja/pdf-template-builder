import { connect } from 'react-redux';
import PdfTemplateBuilder from '../Component/PdfTemplateBuilder';
import {configure, removeElement, selectElement, setLayout} from '../actions';
import { ActionCreators as UndoActionCreators } from 'redux-undo'

const mapStateToProps = ({present}) => ({
  layout: present.layout,
  elements: present.elements,
  schema: present.schema,
  pdfStorageUri: present.pdfStorageUri,
  selectedUuid: present.selectedUuid
});

const mapDispatchToProps = dispatch => ({
  onSelectElement: uuid => dispatch(selectElement(uuid)),
  onChangeLayout: layout => dispatch(setLayout(layout)),
  onDoConfigure: configurations => dispatch(configure(configurations)),
  onDeleteElement: uuid => dispatch(removeElement(uuid)),
  onUndo: () => dispatch(UndoActionCreators.undo()),
  onRedo: () => dispatch(UndoActionCreators.redo())
});

const PdfTemplateBuilderContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(PdfTemplateBuilder);

export default PdfTemplateBuilderContainer;