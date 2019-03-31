import React from "react";
import ReactDOM from "react-dom";
import { Provider } from "mobx-react";

import eventsStore from "../../app/store/EventStore";
import App from "../../app/App";

const store = { eventsStore };
chrome.tabs.onRemoved.addListener(function(tabid, removed) {
  eventsStore.save();
});
ReactDOM.render(
  <Provider {...store}>
    <App />
  </Provider>,

  document.querySelector("#root")
);
