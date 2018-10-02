import { connect } from 'react-redux';
import PreviewButton from '../Component/PreviewButton';
import TemplateBuilder from '../Util/TemplateBuilder';

const getTemplateHtml = state => {
  // Need to pass function since the template build depends on the DOM
  return () => TemplateBuilder.buildTemplate(state.layout.root, state.page);
};

const getTemplateData = state => {
  const data = {};

  state.schema.map(prop => data[prop.tag] = prop.example);

  return data;
};

const mapStateToProps = ({present}) => ({
  templateHtml: getTemplateHtml(present),
  templateData: getTemplateData(present),
  pdfStorageUri: present.pdfStorageUri
});

const PreviewButtonContainer = connect(
  mapStateToProps
)(PreviewButton);

export default PreviewButtonContainer;