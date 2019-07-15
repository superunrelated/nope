export default {
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

  "hotels.com": {
    "listingPage": "/search.do",
    "listingPageContainer": "ol.listings",
    "listingPageItem": "li[data-hotel-id]",
    "listingPageItemId": "hotelId",
    "listingPageTitle": "a.property-name-link",

    "itemPage": "/ho",
    "itemPageContainer": "#hotel-description",
    "itemPageTitle": "h1",
    "itemPageId": "input[name=destination-id]",

    "mutationLimit": 1,
    "closeItemPage": false,
  }, 

  "play.google.com": {
    "listingPage": "/store",
    "listingPageContainer": ".ZmHEEd",
    "listingPageItem": ".uMConb",
    "listingPageItemId": function(htmlNode){
      const button = htmlNode.querySelector("button[data-item-id]");
      const id = button.dataset["itemId"];
      return id;
    },
    "listingPageTitle": ".WsMG1c",

    "itemPage": "/store/movies/details/",
    "itemPageContainer": ".JNury",
    "itemPageTitle": "h1 span",
    "itemPageId": function(){
      const url = new URL(window.location);
      const id = url.searchParams.get("id");
      return id;
    },
    "mutationLimit": 1,
    "closeItemPage": false,
  }, 
};


