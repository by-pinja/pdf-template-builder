import { updateOptions } from '../Store/actions';
import { connect } from 'react-redux';
import SettingPageSize from '../Component/SettingPageSize';

const mapStateToProps = ({present}) => ({
  options: present.options
});

const mapDispatchToProps = dispatch => ({
  onUpdateOptions: options => dispatch(updateOptions(options))
});

const SettingPageSizeContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(SettingPageSize);

export default SettingPageSizeContainer;