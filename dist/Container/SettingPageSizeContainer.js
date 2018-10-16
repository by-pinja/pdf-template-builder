import { setEditorLoading, updateOptions } from '../Store/actions';
import { connect } from 'react-redux';
import SettingPageSize from '../Component/SettingPageSize';

var mapStateToProps = function mapStateToProps(_ref) {
  var present = _ref.present;
  return {
    options: present.options
  };
};

var mapDispatchToProps = function mapDispatchToProps(dispatch) {
  return {
    onUpdateOptions: function onUpdateOptions(options) {
      dispatch(updateOptions(options));
      dispatch(setEditorLoading(true));

      setTimeout(function () {
        return dispatch(setEditorLoading(false));
      }, 1000);
    }
  };
};

var SettingPageSizeContainer = connect(mapStateToProps, mapDispatchToProps)(SettingPageSize);

export default SettingPageSizeContainer;