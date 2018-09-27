import { connect } from 'react-redux';
import SaveButton from '../Component/SaveButton';

const mapStateToProps = ({present}) => ({
  onSaveTemplate: present.onSaveTemplate
});

const SaveButtonContainer = connect(
  mapStateToProps
)(SaveButton);

export default SaveButtonContainer;
