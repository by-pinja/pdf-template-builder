import { connect } from 'react-redux';
import ToggleGridButton from '../Component/ToggleGridButton';
import { setGridVisibility } from '../Store/actions';

var mapStateToProps = function mapStateToProps(_ref) {
  var present = _ref.present;
  return {
    gridVisible: present.gridVisible
  };
};

var mapDispatchToProps = function mapDispatchToProps(dispatch) {
  return {
    onChangeGridVisibility: function onChangeGridVisibility(visible) {
      return dispatch(setGridVisibility(visible));
    }
  };
};

var ToggleGridButtonContainer = connect(mapStateToProps, mapDispatchToProps)(ToggleGridButton);

export default ToggleGridButtonContainer;