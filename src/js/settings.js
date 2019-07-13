export default {
  "booking.com": {
    "listingPage": "/searchresults",
    "listingPageContainerSelector": "#right",
    "listingPageItemSelector": "[data-hotelid], [data-marker-id]",
    "listingPageItemId": "hotelid",
    "listingPageTitleSelector": ".sr-hotel__name",
    "itemPage": "/hotel",
    "itemPageContainerSelector": "#right",
    "itemPageTitleSelector": "#hp_hotel_name",
    "itemPageIdSelector": "input[name=hotel_id]", 
    "mutationLimit": 10,
    "closeItemPage": false,

// Map listing:
// container: .map_left_cards__container
// item: [data-marker-id]

// page elements to remove completely



  }, 
  "hotels.com": {
    "listingPage": "/search.do",
    "listingPageContainerSelector": "ol.listings",
    "listingPageItemSelector": "li[data-hotel-id]",
    "listingPageItemId": "hotelId",
    "listingPageTitleSelector": "a.property-name-link",
    "itemPage": "/ho",
    "itemPageContainerSelector": "#hotel-description",
    "itemPageTitleSelector": "h1",
    "itemPageIdSelector": "input[name=destination-id]", 
    "mutationLimit": 1,
    "closeItemPage": false,

  }, 
};