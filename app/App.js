import React, { Component } from "react";

import "./app.css";
import { observer } from "mobx-react";
import CardContainer from "./component/CardContainer";
import HeaderBar from "./component/HeaderBar";
import EditEvent from "./component/editEvent";
import { Form } from "antd";

@observer
class App extends Component {
  render() {
    return (
      <div className="app">
        <HeaderBar />
        <CardContainer />
        <EditEvent />
      </div>
    );
  }
}

export default App;
