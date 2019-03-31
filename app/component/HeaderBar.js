import React, { Component } from "react";
import { Select } from "antd";
import "./header-bar.css";
import { inject, observer } from "mobx-react";
const Option = Select.Option;

@inject("eventsStore")
@observer
class HeaderBar extends Component {
  state = {};

  handleCatChange = value => {
    const { eventsStore } = this.props;
    eventsStore.curCategory = value == "all" ? null : value;
  };
  render() {
    const { eventsStore } = this.props;
    const categories = eventsStore.getCategory();
    const options = categories.map(tag => (
      <Option value={tag.id} key={tag.id}>
        {tag.name}
      </Option>
    ));

    return (
      <div className="header-bar">
        <div className="inner-bar">
          <Select
            value={eventsStore.curCategory || "all"}
            dropdownClassName="dropdown"
            onChange={this.handleCatChange}
          >
            <Option value="all">所有</Option>
            {options}
          </Select>
        </div>
      </div>
    );
  }
}

export default HeaderBar;
