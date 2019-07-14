import copy from './copy.js';

class ItemPage {

  constructor (settings, store){
    console.log("This is the item page");
    this.settings = settings;
    this.store = store;
    this.container = document.querySelectorAll(this.settings.itemPageContainer)[0];
    this.container.classList.add("nope-item-container");
    this.id = document.querySelector(this.settings.itemPageId).value;
    this.icon = undefined;
    this.label = undefined;
    this.getTabId()
      .then((tabId) => {
        this.updatePage();
      });

    this.store.addListener((list) => {
      console.log("change handler", list);
      this.updatePage();
    });
  }

  updatePage (){
    const list = this.store.getList();
    if (list[this.id]){
      console.log("THIS PROPERTY IS CLOSING", this.settings.closeItemPage);
      this.closeItem();
    } else {
      this.showItem();
    }
  }

  createIcon(){
    if (!this.icon){
      this.icon = document.createElement("div");
      this.icon.classList.add("nope-item-icon");

      const image = document.createElement("img");
      const imgURL = chrome.runtime.getURL("images/icon_128.png");
      image.src = imgURL;
      this.icon.appendChild(image);

      this.icon.addEventListener("click", (event) => {
        this.hideClickHandler();
      }, true);

      this.container.appendChild(this.icon);
    }
  }

  createLabel(){
    if (!this.label){
      this.label = document.createElement("div");
      this.label.classList.add("nope-item-label");
      let textnode = document.createTextNode(copy.hiddenMessage);
      this.label.appendChild(textnode);
      this.label.addEventListener("click", () => {
        this.store.removeItem(this.id)
          .then( (list) => {
            this.showItem();
          });

      }, false);
      this.container.appendChild(this.label);
    }
  }

  hideClickHandler(){
    const titleNode = this.container.querySelector(this.settings.itemPageTitle);
    const reducer = (a, b) => { return a + (b.nodeType === 3 ? b.textContent : ''); }
    const itemName = [].reduce.call(titleNode.childNodes, reducer, '');

    this.store.addItem(this.id, {"id": this.id, "name": itemName})
      .then((list) => {
        console.log("New list:", list, "length:", Object.keys(list).length);
        this.closeItem();
      });
  }

  closeItem(){
    if (this.settings.closeItemPage){
      chrome.runtime.sendMessage({type: "closeTab", tabId: this.tabId}, function(response) {
        console.log(response);
      });
    } else {
      this.hideItem();
    }
  }

  hideItem(){
    this.container.classList.add("nope-item-hidden");
    this.createLabel();
  }

  showItem(){
    this.container.classList.remove("nope-item-hidden");
    this.createIcon();
  }

  getTabId(){
    return new Promise((resolve, reject) => {
      chrome.runtime.sendMessage({ type:"getTabId" }, (result) => {
        this.tabId = result.tabId;
        return resolve(this.tabId);
      });    
    });
  }
}

export default ItemPage;