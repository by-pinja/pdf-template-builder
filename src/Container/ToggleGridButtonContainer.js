import { connect } from 'react-redux';
import ToggleGridButton from '../Component/ToggleGridButton';
import { setGridVisibility } from '../Store/actions';

const mapStateToProps = ({present}) => ({
  gridVisible: present.gridVisible
});

const mapDispatchToProps = dispatch => ({
  onChangeGridVisibility: visible => dispatch(setGridVisibility(visible))
});

const ToggleGridButtonContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(ToggleGridButton);

export default ToggleGridButtonContainer;
