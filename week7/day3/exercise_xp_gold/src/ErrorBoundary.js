import React from "react";
import Modal from "./Modal";

class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false, errorInfo: null };
  }

  componentDidCatch(error, errorInfo) {
    this.setState({ hasError: true, errorInfo });
  }

  occurError = () => {
    this.setState({ hasError: true, errorInfo: { message: "Something went wrong!" } });
  };

  closeModal = () => {
    this.setState({ hasError: false, errorInfo: null });
  };

  render() {
    if (this.state.hasError) {
      return (
        <Modal
          message={this.state.errorInfo?.message || "An unknown error occurred."}
          onClose={this.closeModal}
        />
      );
    }

    return (
      <div>
        <button onClick={this.occurError}>Trigger Error</button>
      </div>
    );
  }
}

export default ErrorBoundary;
