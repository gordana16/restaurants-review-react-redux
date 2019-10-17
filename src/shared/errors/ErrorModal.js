import React, { Component } from "react";
import Modal from "react-responsive-modal";

class ErrorModal extends Component {
  state = {
    open: false
  };

  componentDidMount() {
    const { error } = this.props;
    if (error) {
      this.setState({ open: true });
    }
  }

  componentDidUpdate(prevProps) {
    const { error } = this.props;
    const { open } = this.state;
    if (error && !open && !prevProps.error) {
      this.setState({ open: true });
    }
  }

  onCloseModal = () => {
    const { redirect } = this.props;
    this.setState({ open: false });
    if (redirect) {
      this.props.redirect();
    }
  };

  render() {
    const { open } = this.state;
    const { error } = this.props;

    return (
      <React.Fragment>
        <Modal
          open={open}
          onClose={this.onCloseModal}
          center
          closeIconSize={20}
        >
          <div className="error-modal-content">
            <h2>Error!!!</h2>
            <p>{error}</p>
          </div>
        </Modal>
      </React.Fragment>
    );
  }
}
export default ErrorModal;
