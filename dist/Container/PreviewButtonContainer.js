import { connect } from 'react-redux';
import PreviewButton from '../Component/PreviewButton';
import TemplateBuilder from '../Util/TemplateBuilder';
import { exportTemplate } from '../Store/util';

var getTemplateHtml = function getTemplateHtml(state) {
  // Need to pass function since the template build depends on the DOM
  return function () {
    return TemplateBuilder.buildTemplate(state.layout, state.page, state.schema);
  };
};

var getTemplateData = function getTemplateData(state) {
  var data = {};

  state.schema.map(function (prop) {
    return data[prop.tag] = prop.example;
  });

  return data;
};

var mapStateToProps = function mapStateToProps(_ref) {
  var present = _ref.present;
  return {
    exportTemplate: exportTemplate(present),
    onPreview: present.onPreview,
    templateData: getTemplateData(present),
    templateHtml: getTemplateHtml(present)
  };
};

var PreviewButtonContainer = connect(mapStateToProps)(PreviewButton);

export default PreviewButtonContainer;