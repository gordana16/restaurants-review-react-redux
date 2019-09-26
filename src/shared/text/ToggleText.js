import React, { Component } from "react";
import Truncate from "react-truncate";

class ToggleText extends Component {
  constructor(props) {
    super(props);

    this.state = {
      expanded: false,
      truncated: false
    };
  }
  handleTruncate = truncated => {
    if (this.state.truncated !== truncated) {
      this.setState({
        truncated
      });
    }
  };
  toggleLines = event => {
    event.preventDefault();
    this.setState({
      expanded: !this.state.expanded
    });
  };

  render() {
    const { children, lines, more, less } = this.props;
    const { expanded, truncated } = this.state;

    return (
      <div>
        <Truncate
          lines={!expanded && lines}
          ellipsis={
            <span>
              <button
                className="btn btn-link btn-toggle"
                onClick={this.toggleLines}
              >
                {more}
              </button>
            </span>
          }
          onTruncate={this.handleTruncate}
        >
          {children}
        </Truncate>
        {!truncated && expanded && (
          <span>
            <button
              className="btn btn-link btn-toggle"
              onClick={this.toggleLines}
            >
              {less}
            </button>
          </span>
        )}
      </div>
    );
  }
}

export default ToggleText;
