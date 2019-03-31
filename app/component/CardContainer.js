import React, { Component } from "react";

import ColCard from "./ColCard";
import { Row } from "antd";
import { inject, observer } from "mobx-react";

@inject("eventsStore")
@observer
class CardContainer extends Component {
  render() {
    const { eventsStore } = this.props;
    const cards = eventsStore.events.map(event => (
      <ColCard event={event} key={event.id} />
    ));
    cards.push(<ColCard addCard={true} key="add-buttom" />);
    return (
      <div className="card-container">
        <Row type="flex" justify="start" gutter="50">
          {cards}
        </Row>
      </div>
    );
  }
}

export default CardContainer;
