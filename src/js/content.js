import Store from './store.js';
import ItemPage from './item_page.js';
import ListingPage from './listing_page.js';
import copy from './copy.js';
import settings from './settings.js';

const store = new Store();

export function main() {
  const hostname = window.location.hostname;
  const pathname = window.location.pathname;

  for (let key in settings) {
    if (hostname.indexOf(key) != -1){
      // TODO: move addCss, store.init to after there is a page match. No need to do this on other pages on the site... doh!
      addCss(key);
      store.init(key)
        .then((result) => {
          if (pathname.indexOf(settings[key].listingPage) != -1){
            const listingPage = new ListingPage(settings[key], store);
          } else if(pathname.indexOf(settings[key].itemPage) != -1) {
            const itemPage = new ItemPage(settings[key], store);
          } else {
            console.log("key is not recognized");
          }
       })          
    }
  }
}

function addCss(key) {
  const cssURL = chrome.runtime.getURL("src/css/" + key + ".css");
  if (cssURL){
    const link = document.createElement("link");
    link.type = "text/css";
    link.rel = "stylesheet";
    link.href = cssURL;
    document.head.appendChild(link);
  }
}