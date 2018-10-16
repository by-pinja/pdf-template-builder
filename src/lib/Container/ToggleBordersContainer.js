import ToggleBordersButton from '../Component/ToggleBordersButton';
import { connect } from 'react-redux';
import { setBorderVisibility } from '../Store/actions';

const mapStateToProps = ({present}) => ({
  bordersVisible: present.bordersVisible
});

const mapDispatchToProps = dispatch => ({
  onChangeBorderVisibility: visible => dispatch(setBorderVisibility(visible))
});

const ToggleBordersContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(ToggleBordersButton);

export default ToggleBordersContainer;
