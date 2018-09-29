import { updateElement } from '../Store/actions';
import { connect } from 'react-redux';
import { getSelectedElementMeta } from '../Store/util';
import SettingTextFont from '../Component/SettingTextFont';

const mapStateToProps = ({present}) => ({
  element: getSelectedElementMeta(present)
});

const mapDispatchToProps = dispatch => ({
  onUpdateElement: element => dispatch(updateElement(element))
});

const SettingTextFontContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(SettingTextFont);

export default SettingTextFontContainer;
