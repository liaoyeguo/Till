import React, { Component } from "react";
import { Col } from "antd";
import Card, { AddCard } from "./Card";
import { observer } from "mobx-react";

@observer
class ColCard extends Component {
  render() {
    const { addCard } = this.props;
    return (
      //   {addCard ? <Col xxl={{ span: 4 }} xl={{ span: 6 }} className="col">
      //   <Card />
      // </Col> : }
      <div>
        {addCard ? (
          <Col xxl={{ span: 4 }} xl={{ span: 6 }} className="col">
            <AddCard {...this.props} />
          </Col>
        ) : (
          <Col xxl={{ span: 4 }} xl={{ span: 6 }} className="col">
            <Card {...this.props} />
          </Col>
        )}
      </div>
    );
  }
}

export default ColCard;
