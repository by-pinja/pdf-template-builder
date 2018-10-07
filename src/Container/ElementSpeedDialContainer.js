import {addElement} from '../Store/actions';
import { connect } from 'react-redux';
import ElementSpeedDial from '../Component/ElementSpeedDial';

const mapStateToProps = ({present}) => ({
  selectedUuid: present.selectedUuid
});

const mapDispatchToProps = dispatch => ({
  onAddElement: (selectedUuid, type) => dispatch(addElement(selectedUuid, type))
});

const ElementSpeedDialContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(ElementSpeedDial);

export default ElementSpeedDialContainer;