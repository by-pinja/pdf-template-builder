import { connect } from 'react-redux';
import SaveButton from '../Component/SaveButton';
import { exportTemplate } from '../Store/util';
import TemplateBuilder from '../Util/TemplateBuilder';

const mapStateToProps = ({present}) => ({
  onSaveTemplate: present.onSaveTemplate,
  exportTemplate: exportTemplate(present),
  getTemplateHtml: () => TemplateBuilder.buildTemplate(present.layout, present.page, present.schema)
});

const SaveButtonContainer = connect(
  mapStateToProps
)(SaveButton);

export default SaveButtonContainer;
