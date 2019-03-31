import uuid from "uuid/v1";
import defaultCategory from "../../app/config/default-category";

chrome.runtime.onInstalled.addListener(function() {
  let categories = [];
  for (let i = 0; i < defaultCategory.length; i++) {
    categories.push({
      id: uuid(),
      name: defaultCategory[i]
    });
  }
  chrome.storage.sync.set(
    {
      events: {},
      categories: categories
    },
    function() {}
  );
});

chrome.browserAction.onClicked.addListener(function() {
  chrome.tabs.create({ url: chrome.extension.getURL("index.html") }, function(
    tab
  ) {
    // Tab opened.
  });
});
