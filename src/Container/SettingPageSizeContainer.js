import {setEditorLoading, updateOptions} from '../Store/actions';
import { connect } from 'react-redux';
import SettingPageSize from '../Component/SettingPageSize';

const mapStateToProps = ({present}) => ({
  options: present.options
});

const mapDispatchToProps = dispatch => ({
  onUpdateOptions: options => {
    dispatch(updateOptions(options));
    dispatch(setEditorLoading(true));

    setTimeout(() => dispatch(setEditorLoading(false)), 1000);
  }
});

const SettingPageSizeContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(SettingPageSize);

export default SettingPageSizeContainer;