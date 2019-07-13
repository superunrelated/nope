import settings from './settings.js';

class Store {

  constructor (){
    this.data = {};
    this.listeners = [];
  }

  init (key){
    this.key = key;
    return this.loadData()
      .then((result) => {
        return this.initData()
          .then((result) => {
            chrome.storage.onChanged.addListener((changes, area) => {
              this.changeHandler(changes);
            });
            return result;
          });
      })
      .catch((error) => {
        console.log("Init failed:", error)
      })
  }

  changeHandler(changes){
    if (changes[this.key]){
      // this change is for this key.
      if (Object.keys(changes[this.key].newValue.list).length != Object.keys(this.data[this.key].list).length){
        // something is different in the new data.
        this.loadData()
          .then((data) => {
            for (let f of this.listeners){
              f(this.data[this.key]);
            }
          })
      }
    }
  }

  addListener(handler){
    this.listeners.push(handler);
  }

  removeListener(handler){
    let index = this.listeners.findIndex((h) => {
      return h === handler;
    });
    this.listeners.splice(index, 1);
  }

  initData (){
    for (let k in settings){
      if (!this.data[k]){
        this.data[k] = {
          "list" : {}
        }
      }
    }
    return this.saveData();
  }

  getKey (key){
    return this.key;
  }

  getAll (){
    return this.data;
  }

  getList (){
    return this.data[this.key].list;
  }

  addItem (id, item){
    let i = Object.assign({}, item, {date:Date.now()});
    this.data[this.key].list = Object.assign({}, this.data[this.key].list, {[id]:i});
    return this.saveData()
      .then(() => {
        return this.data[this.key].list;
      });
  }

  removeItem (id){
    delete this.data[this.key].list[id];
    return this.saveData()
      .then(() => {
        return this.data[this.key].list;
      });
  }

  setList (list){
    this.data[this.key].list = Object.assign({}, list);
    return this.saveData()
      .then(() => {
        return this.data[this.key].list;
      });
  }

  loadData (){
    return new Promise((resolve, reject) => {
      chrome.storage.local.get(null, (result) => {
        if (chrome.runtime.lastError){
          reject(chrome.runtime.lastError.message);
        } else {
          console.log("RAW DATA", result);
          this.data = result;
          resolve(result);
        }
      });
    });
  }

  saveData (){
    return new Promise((resolve, reject) => {
      chrome.storage.local.set(this.data, () => {
        if (chrome.runtime.lastError){
          reject(chrome.runtime.lastError.message);
        } else {
          resolve(this.data);
        }
      });
    });
  }

  static clear (){
    return new Promise((resolve, reject) => {
      chrome.storage.local.clear(() => {
        resolve();
      })
    });
  }

}

export default Store;