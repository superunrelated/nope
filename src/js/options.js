import Store from './store.js';

class Options {

  constructor() {
    this.storageKey = "booking.com";
    this.store = new Store();
    this.store.init()
      .then(() => {
        this.createList();
        this.createResetButton();
      })
  }

  createList (){
    const lists = this.store.getAll();
    console.log(lists);

    const htmlContainer = document.querySelectorAll('#listContainer')[0];
    console.log(htmlContainer);
    for (let key in lists) {
      let section = lists[key];
      console.log("section:", key, "list:", section.list);

      let htmlSection = document.createElement("div");
      htmlSection.id = key;
      htmlSection.classList.add("listSection");
      htmlContainer.appendChild(htmlSection);

      let htmlTitle = document.createElement("h2");
      htmlTitle.appendChild(document.createTextNode(key));
      htmlSection.appendChild(htmlTitle);
      
      if (Object.keys(section.list).length) {
        let htmlList = document.createElement("ul");
        htmlSection.appendChild(htmlList);

        for (let k in section.list) {
          let item = section.list[k];
          console.log("item.name", item, item.name);
          let htmlItem = document.createElement("li");
          const button = document.createElement("button");
          button.appendChild(document.createTextNode("X"));
          button.addEventListener("click", () => {
            this.store.removeItem(this.storageKey, k)
              .then(function (list) {
                htmlList.removeChild(htmlItem);
              });
          }, false);

          htmlItem.appendChild(button);

          htmlItem.appendChild(document.createTextNode(item.id + " - " + item.name + " - " + new Date(item.date).toLocaleDateString('en-GB')));
          htmlList.appendChild(htmlItem);
        }
      } else {
        htmlSection.appendChild(document.createTextNode("No hidden items here"));
      }
      
    }
  }


  createResetButton() {
    let button = document.getElementById('deleteAll');
    button.addEventListener('click', function() {
      Store.clear()
        .then(() => {
          button.style.backgroundColor = "#" + Math.floor(Math.random() * 0xFFFFFF);
          location.reload();
        });
    });
  }

}

export default Options;