
# Nope - a pessimistic Chrome Extension

This has probably happened to you; you are searching for a hotel in a big city, there are thousands of results, and you check out a few. Then you modify and filter your search a little and search again. Some new properties show up, but they are mixed with the ones you have already seen and rejected. At this point it's all a mess, and you decide to do it later... and later you do the same thing again, and again. 

Work in progress: Or, you have actually gone to see a movie in the cinema. How retro! Then, when it becomes available on Netflix, since the movie is just right for you, Netflix will never, ever, ever stop suggesting it too you. 

If this is you, here is my attempt to solve this. Currently Booking.com and Hotels.com is supported. More is on its way... maybe. 

## Creating page specific settings
- Add the page url to the content_scripts.matches in ./manifest.json
- Add settings to ./src/js/settings.js
- Add css file to ./src/css/[domain].css

## Settings.js

```javascript
  "booking.com": {
    "listingPage": "/searchresults",
    "listingPageContainer": "#search_results_table",
    "listingPageItem": "[data-testid='property-card']",
    "listingPageItemId": function(htmlNode){
      const anchor = htmlNode.querySelector("a");
      const id = anchor.href.split("?")[0].replace("https://www.booking.com/", "");
      return id;
    },
    "listingPageTitle": "[data-testid='title']",
    
    "itemPage": "/hotel",
    "itemPageContainer": ".k2-hp--gallery-header.bui-grid__column.bui-grid__column-9",
    "itemPageTitle": "#hp_hotel_name",
    "itemPageId": function(htmlNode){
      const id = window.location.href.split("?")[0].replace("https://www.booking.com/", "");
      return id;
    },

    "mutationLimit": 10,
    "closeItemPage": false,
  }, 
```

#### listingPage : URL String
This string is the identifier in the url that triggers the listing page script. Currently this is a simple indexOf match for the script to trigger. So in the example above "/searchresults" matches for "https://www.booking.com/searchresults.en-gb.html". 
Note: this could probably be smarter, but it works for now.

#### listingPageContainer : Query Selector
This query selector identifies the main search listing container html node. This has to be the parent node for all the search/listing result items. At the moment this has to result in a single dom element, and is used for observing modifications to its children and updating if necessary. Use: document.querySelectorAll(listingPageContainer)

#### listingPageItem : Query Selector
This query selector selects the list items to modify and hide, multiple items is expected. 

#### listingPageItemId : function
A function for getting or generating a unique id for each listingPageItem. The function recieves a listingPageItem node as a prop and returns an id as a string. This can be a data value, form value, the url, the item name/heading or a generated hash. 

#### listingPageTitle : Query Selector
A query selector for finding the item title. The title is used for presenting all hidden items on the Extensions Option page. 

#### itemPage : URL String
This string is the identifier in the url that triggers the item page script. Currently this is a simple indexOf match for the script to trigger. So in the example above "/hotel" matches for "https://www.booking.com/hotel". 
Note: this could probably be smarter, but it works for now.

#### itemPageContainer : Query Selector
This query selector identifies the main container. Used for positioning of the buttons and getting details about the item.

#### itemPageId > function
A function for getting or generating a unique id for each itemPage. The function recieves a listingPageItem node as a prop and returns an id as a string. This can be a data value, form value, the url, the item name/heading or a generated hash. This must yeald the same result as for the listingPageItemId.

#### itemPageTitle : Query Selector
A query selector for finding the item title. This should ideally yeald the sanme result as listingPageItemId, but that is not essential. The title is used for presenting all hidden items on the Extensions Option page.

#### mutationLimit : Integer
Some sites does a huge number of little changes to the page after modification to the search results, others do one single repaint. This number is to prevent updating the extensions too often and making the page sluggish.

#### closeItemPage : Boolean
When the user hides an item on it's detail page choose if the page/tab should close. This makes sense on sites that opens every item detail page in a new tab.


## Potential improvements: 
- Check out the history object, and/or mark the :visited links better. Why the hell does not anyone use this browser feature anymore!?

- Check out the query strings for additional meta to store with each item. City would be useful for the listing on the options page, and maybe get movie/hotel category? 

- Adding customisable settings in the Options page. Turn on and off if the item page should close or not.





