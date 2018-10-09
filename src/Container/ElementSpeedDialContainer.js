import { addElement } from '../Store/actions';
import { connect } from 'react-redux';
import ElementSpeedDial from '../Component/ElementSpeedDial';

const mapStateToProps = ({present}) => ({
  selectedUuid: present.selectedUuid
});

const mapDispatchToProps = dispatch => ({
  onAddElement: (element, selectedUuid) => dispatch(addElement(element, selectedUuid))
});

const ElementSpeedDialContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(ElementSpeedDial);

export default ElementSpeedDialContainer;