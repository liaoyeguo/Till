import { observable, action, computed } from "mobx";
import TillEvent from "./TillEvent";
import moment from "moment";
import uuid from "uuid/v1";
import defaultCategory from "../config/default-category";
import { format } from "util";
class EventStore {
  @observable _events = [];
  @observable categories = [];
  @observable curCategory = null;
  @observable isEditing = false;
  @observable curEditEvent = null;

  constructor() {
    chrome.storage.sync.get(["events", "categories"], result => {
      let events = [];
      let idx = 0;
      while (result.events.hasOwnProperty(idx)) {
        let event = result.events[idx];
        events.push(
          new TillEvent(
            event.title,
            event.deadline,
            event.category,
            this,
            event.id
          )
        );
        idx++;
      }

      let categories = [];
      idx = 0;
      while (result.categories.hasOwnProperty(idx)) {
        let category = result.categories[idx];
        categories.push(category);
        idx++;
      }

      this._events = events || [];
      this.categories = categories || [];
      console.log(this.categories);
    });
  }
  @action addEvent(title, date, category = null) {
    const event = new TillEvent(title, date.format(), category, this);
    this._events.push(event);
    this.save();
  }
  @action createFakeData(num) {
    for (let i = 0; i < num; i++) {
      const tagIdx = Math.floor(Math.random() * this.categories.length);
      let event = new TillEvent(
        "哈哈哈哈",
        moment()
          .add(5, "minutes")
          .format(),
        this.categories[tagIdx].id,
        this
      );
      this._events.push(event);
    }
  }

  @action addCategory(name) {
    this.categories.push({ id: uuid(), name: name });
    this.save();
  }

  @computed get events() {
    if (this.curCategory == null) {
      return this._events;
    } else {
      return this._events.filter(item => item.category == this.curCategory);
    }
  }

  @action removeCategory(item) {
    this.categories.remove(item);
    this.save();
  }

  getCategory() {
    return this.categories;
  }

  save() {
    console.log(this._events);
    chrome.storage.sync.set(
      {
        events: this._events,
        categories: this.categories
      },
      function() {}
    );
  }
}

export default new EventStore();
export { EventStore };
