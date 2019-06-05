import { connect } from 'react-redux';
import SaveButton from '../Component/SaveButton';
import { exportTemplate } from '../Store/util';
import TemplateBuilder from '../Util/TemplateBuilder';

const getTemplateHtml = state => {
  // Need to pass function since the template build depends on the DOM
  return () => TemplateBuilder.buildTemplate(state.layout, state.page, state.schema);
};

const mapStateToProps = ({present}) => ({
  onSaveTemplate: present.onSaveTemplate,
  exportTemplate: exportTemplate(present),
  templateHtml: getTemplateHtml(present),
});

const SaveButtonContainer = connect(
  mapStateToProps
)(SaveButton);

export default SaveButtonContainer;
