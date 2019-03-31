import { observable } from "mobx";
import uuid from "uuid/v1";

class TillEvent {
  @observable title = "";
  @observable deadline = null;
  @observable store = null;
  @observable category = null;
  id = null;

  constructor(title, deadline, category, store, id = uuid()) {
    this.title = title;
    this.deadline = deadline;
    this.category = category;
    this.store = store;
    this.id = id;
  }

  remove() {
    this.store.events.remove(this);
    this.store.save();
  }
}

export default TillEvent;
