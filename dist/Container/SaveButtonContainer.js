import { connect } from 'react-redux';
import SaveButton from '../Component/SaveButton';
import { exportTemplate } from '../Store/util';
import TemplateBuilder from '../Util/TemplateBuilder';

var mapStateToProps = function mapStateToProps(_ref) {
  var present = _ref.present;
  return {
    onSaveTemplate: present.onSaveTemplate,
    exportTemplate: exportTemplate(present),
    getTemplateHtml: function getTemplateHtml() {
      return TemplateBuilder.buildTemplate(present.layout, present.page, present.schema);
    }
  };
};

var SaveButtonContainer = connect(mapStateToProps)(SaveButton);

export default SaveButtonContainer;