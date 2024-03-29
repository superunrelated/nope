export default {
  "booking.com": {
    listingPage: "/searchresults", // OK
    listingPageContainer: "#search_results_table", // OK
    listingPageItem: "[data-testid='property-card']", // OK
    listingPageItemId: function (htmlNode) {
      const anchor = htmlNode.querySelector("a");
      const id = anchor.href
        .split("?")[0]
        .replace("https://www.booking.com/", "");
      return id;
    },
    listingPageTitle: "[data-testid='title']",

    itemPage: "/hotel",
    itemPageContainer:
      ".k2-hp--gallery-header.bui-grid__column.bui-grid__column-9",
    itemPageTitle: "#hp_hotel_name",
    itemPageId: function (htmlNode) {
      const id = window.location.href
        .split("?")[0]
        .replace("https://www.booking.com/", "");
      return id;
    },

    mutationLimit: 10,
    closeItemPage: false,
  },

  "hotels.com": {
    listingPage: "/search.do",
    listingPageContainer: "div[role='region']+div",
    listingPageItem: "li[data-hotel-id]",
    listingPageItemId: function (htmlNode) {
      return htmlNode.dataset.hotelId;
    },
    listingPageTitle: "h2",

    itemPage: "/ho",
    itemPageContainer: "main>div:last-child>div>div",
    itemPageTitle: "h1",
    itemPageId: function (htmlNode) {
      const id = window.location.href
        .split("/?")[0]
        .replace("https://www.hotels.com/ho", "");
        console.log("id", id);
      return id;
    },

    mutationLimit: 1,
    closeItemPage: false,
  },

  "play.google.com": {
    listingPage: "/store",
    listingPageContainer: ".ZmHEEd",
    listingPageItem: ".uMConb",
    listingPageItemId: function (htmlNode) {
      const button = htmlNode.querySelector("button[data-item-id]");
      const id = button.dataset["itemId"];
      return id;
    },
    listingPageTitle: ".WsMG1c",

    itemPage: "/store/movies/details/",
    itemPageContainer: ".JNury",
    itemPageTitle: "h1 span",
    itemPageId: function () {
      const url = new URL(window.location);
      const id = url.searchParams.get("id");
      return id;
    },
    mutationLimit: 1,
    closeItemPage: false,
  },
};
