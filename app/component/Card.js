import React, { Component } from "react";
import { Icon, Form, Input, DatePicker, Button, Statistic } from "antd";
import "./card.css";
import { observer, inject } from "mobx-react";
import moment from "moment";
import DateLabel from "./EditableDateLabel";
const Countdown = Statistic.Countdown;

@inject("eventsStore")
@observer
class Card extends Component {
  handleClick = () => {
    const { eventsStore, event } = this.props;
    eventsStore.curEditEvent = event;
    eventsStore.isEditing = true;
  };
  render() {
    const { event } = this.props;
    const { title, deadline } = event;
    const date = moment(deadline);
    let format = "";
    const dur = moment.duration(date.diff(moment()));
    if (dur.as("hours") > 24) {
      if (dur.as("years") > 1) {
        format += "Y 年 ";
      }
      if (dur.as("months") > 1) {
        format += "M 月 ";
      }
      if (dur.as("days") > 1) {
        format += "D 天 ";
      }
    } else {
      format += "HH:mm:ss";
    }

    return (
      <div className="card" onClick={this.handleClick}>
        <div className="header-title">
          <span>
            距离<span className="title">{title}</span>还有
          </span>
        </div>
        <div className="data">
          <Countdown title="" value={date} format={format} />
        </div>
        <DateLabel deadline={date} />
      </div>
    );
  }
}

@inject("eventsStore")
@observer
class AddCard extends Component {
  handleClick = () => {
    const { eventsStore } = this.props;
    eventsStore.isEditing = true;
  };

  render() {
    return (
      <div className="card">
        <div className="add-button" onClick={this.handleClick}>
          <Icon type="plus" />
        </div>
      </div>
    );
  }
}

export { AddCard };
export default Card;
