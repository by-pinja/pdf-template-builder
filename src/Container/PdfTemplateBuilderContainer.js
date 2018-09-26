import { connect } from 'react-redux';
import PdfTemplateBuilder from '../Component/PdfTemplateBuilder';
import {configure, selectElement, setLayout} from '../actions';

const mapStateToProps = state => ({
  layout: state.layout,
  elements: state.elements,
  schema: state.schema,
  pdfStorageUri: state.pdfStorageUri
});

const mapDispatchToProps = dispatch => ({
  onSelectElement: uuid => dispatch(selectElement(uuid)),
  onChangeLayout: layout => dispatch(setLayout(layout)),
  onDoConfigure: configurations => dispatch(configure(configurations))
});

const PdfTemplateBuilderContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(PdfTemplateBuilder);

export default PdfTemplateBuilderContainer;