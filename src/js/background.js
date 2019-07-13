'use strict';

chrome.runtime.onMessage.addListener(
  function(request, sender, sendResponse) {
    console.log("Background messeage recieved", request, sender)

    switch (request.type){
      case "getTabId":
        return sendResponse({tabId: sender.tab.id});
        break;

      case "closeMe":
        chrome.tabs.remove(sender.tab.id, () => {
          return sendResponse(true);
        });
        break;

      case "closeTab":
        chrome.tabs.remove(request.tabId, () => {
          return sendResponse(true);
        });
        break;
    }
  });