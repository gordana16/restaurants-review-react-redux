import React, { Component } from "react";
import { Redirect } from "react-router-dom";
import Modal from "react-responsive-modal";

class ErrorModal extends Component {
  state = {
    open: false,
    redirect: false
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
    this.setState({ open: false, redirect: true });
  };

  render() {
    const { open, redirect } = this.state;
    const { error, redirectTo } = this.props;

    if (redirect && redirectTo) {
      return <Redirect to={redirectTo} />;
    }
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
