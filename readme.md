
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
    "listingPageContainer": "#right",
    "listingPageItem": "[data-hotelid], [data-marker-id]",
    "listingPageItemId": "hotelid",
    "listingPageTitle": ".sr-hotel__name",

    "itemPage": "/hotel",
    "itemPageContainer": "#right",
    "itemPageTitle": "#hp_hotel_name",
    "itemPageId": "input[name=hotel_id]", 

    "mutationLimit": 10,
    "closeItemPage": false,
  }, 
```

#### listingPage
This string is the identifier in the url that triggers the listing page script. Currently this is a simple indexOf match for the script to trigger. So in the example above "/searchresults" matches for "https://www.booking.com/searchresults.en-gb.html". Note: this could probably be smarter, but it works for now.

#### listingPageContainer
This query selector identifies the main search listing container html node. This has to be the parent node for all the search/listing result items. At the moment this has to result in a single dom element, and is used for observing modifications to its children and updating if necessary.

#### listingPageItem
This query selector selects the list items to modify and hide, and multiple items is expected. 

#### listingPageItemId 
When an item is hidden, this is the selector that finds the element id within the item. The ID is used for identifying the list item and applying the correct state. This is usually a data field, or it can be a part of the url to the items details page, or as a hidden input element as part of a form. 

#### listingPageTitle
When an item is hidden, this is the selector that finds the elements title. The title is the textContent of this html node. The title is used for presenting all hidden items on the Extensions Option page. 

#### itemPage
This string is the identifier in the url that triggers the item page script. Currently this is a simple indexOf match for the script to trigger. So in the example above "/hotel" matches for "https://www.booking.com/hotel". Note: this could probably be smarter, but it works for now.

#### itemPageContainer
This query selector identifies the main container. Used for positioning of the buttons and getting details about the item.

#### itemPageTitle
When this item is hidden, this is the selector that finds the elements title. The title is the textContent of this html node. The title is used for presenting all hidden items on the Extensions Option page.

#### itemPageId
When an item is hidden, this is the selector that finds the element id within the item. The ID is used for identifying the list item and applying the correct state. This is usually a data field, or a part of the url, or as a hidden input element in a form. 

#### mutationLimit
Some sites does a huge number of little changes to the page after modification to the search results, others do one single repaint. This number is to prevent updating the extensions too often and making the page sluggish.

#### closeItemPage
When the user hides an item on it's detail page choose if the page/tab should close. This makes sense on sites that opens every item detail page in a new tab.


## Potential improvements: 
- Check out the history object, and/or mark the :visited links better. Why the hell does not anyone use this browser feature anymore!?

- Check out the query strings for additional meta to store with each item. City would be useful for the listing on the options page, and maybe get movie/hotel category? 

- Adding customisable settings in the Options page. Turn on and off if the item page should close or not.





