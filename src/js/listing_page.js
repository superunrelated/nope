import copy from './copy.js';

class ListingPage {

  constructor (settings, store){
    this.settings = settings;
    this.store = store;
    this.container = document.querySelectorAll(this.settings.listingPageContainerSelector)[0];
    this.observer = undefined;
    this.updatePage();

    this.store.addListener((list) => {
      this.updatePage();
    });
  }

  // MutationObserver

  observe (){
    if (!this.observer){
      this.observer = new MutationObserver((mutationsList, observer) => {
        if (mutationsList.length >= this.settings.mutationLimit){
          console.log("OBSERVING CHANGE:", mutationsList.length);
          this.updatePage();
        } else {
          console.log("Minor change", mutationsList.length);
        }
      });
    }

    let config = { attributes: false, childList: true, subtree: true };
    this.observer.observe(this.container, config);
  }

  disconnect (){
    if (this.observer){
      this.observer.disconnect();
    }
  }

  // Updating

  createIcon (){
    if (!this.icon){
      this.icon = document.createElement("div");
      this.icon.classList.add("nope-listing-icon");
      const image = document.createElement("img");
      const imgURL = chrome.runtime.getURL("images/icon_48.png");
      image.src = imgURL;
      this.icon.appendChild(image);
    }
    return this.icon.cloneNode(true);
  }
  
  addIcons (){
    const htmlNodes = document.querySelectorAll(this.settings.listingPageItemSelector);
    for (let htmlNode of htmlNodes) {
      if (!htmlNode.classList.contains('nope-listing-item')){
        htmlNode.classList.add('nope-listing-item');
        let icon = this.createIcon();
        icon.addEventListener("click", (event) => {
          let n = htmlNode;
          this.hideItemClickHandler(n);
        }, true);
        htmlNode.appendChild(icon);
      }
    }
  }

  hideItemClickHandler (htmlNode){
    const id = htmlNode.dataset[this.settings.listingPageItemId];
    const itemName = htmlNode.querySelector(this.settings.listingPageTitleSelector).textContent.replace(/^\s+|\s+$/g, '');
    this.store.addItem(id, {"id": id, "name": itemName})
      .then((list) => {
        this.hideItem(htmlNode);
      });
  }

  updatePage (){
    this.disconnect();
    this.addIcons();
    const list = this.store.getList();
    const htmlNodes = document.querySelectorAll(this.settings.listingPageItemSelector);
    for (let htmlNode of htmlNodes) {
      let id = htmlNode.dataset[this.settings.listingPageItemId];
      if (list[id]){
        this.hideItem(htmlNode);
      }
    }
    this.observe();
  }

  showItem(htmlNode){
    let id = htmlNode.dataset[this.settings.listingPageItemId];
    htmlNode.classList.remove('nope-listing-hidden');
    for (let childNode of htmlNode.children) {
      childNode.style.display = "block";
    }

    let label = htmlNode.querySelectorAll('.nope-listing-label')[0];
    if(label){
      htmlNode.removeChild(label);
    }
  }

  hideItem(htmlNode){
    let id = htmlNode.dataset[this.settings.listingPageItemId];
    htmlNode.classList.add('nope-listing-hidden');

    for (let childNode of htmlNode.children) {
      childNode.style.display = "none";
    }

    let htmlLabel = document.createElement("div");
    htmlLabel.classList.add("nope-listing-label");
    let textnode = document.createTextNode(copy.hiddenMessage);
    htmlLabel.appendChild(textnode);
    htmlLabel.addEventListener("click", () => {
      this.store.removeItem(id)
        .then( (list) => {
          this.showItem(htmlNode);
        });

    }, false);

    htmlNode.appendChild(htmlLabel);
  }
}

export default ListingPage;