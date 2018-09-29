import { updateElement } from '../Store/actions';
import { connect } from 'react-redux';
import SettingTextAlign from '../Component/SettingTextAlign';
import { getSelectedElementMeta } from '../Store/util';

const mapStateToProps = ({present}) => ({
  element: getSelectedElementMeta(present)
});

const mapDispatchToProps = dispatch => ({
  onUpdateElement: element => dispatch(updateElement(element))
});

const SettingTextAlignContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(SettingTextAlign);

export default SettingTextAlignContainer;