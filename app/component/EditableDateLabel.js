import React, { Component } from "react";
import { DatePicker } from "antd";

class DateLabel extends Component {
  render() {
    const { deadline } = this.props;
    return (
      <div className="date">
        <span>{deadline.format("YYYY-MM-DD")}</span>
      </div>
    );
  }
}

export default DateLabel;
