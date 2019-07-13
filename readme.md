
# Nope - a pessimistic Chrome Extension

This has probably happened to you; you are searching for a hotel in a big city, there are thousands of results, and you check out a few. Then you modify and filter your search a little and search again. Some new properties show up, but they are mixed with the ones you have already seen and rejected. At this point it's all a mess, and you decide to do it later... and then you do the same thing again, and again. 

Work in progress: Or, you have actually gone to see a movie in the cinema. How retro! Then, when it becomes available on Netflix, since the movie is just right for you, Netflix will never, ever, ever stop suggesting it too you. 

If this is you, here is my attampt to solve this. Currently only Booking.com and Hotels.com is supported. More is on its way... maybe. 

## Creating page specific settings
- Add the page url to the content_scripts.matches in ./manifest.json
- Add site specific settings to ./src/js/settings.js
- Add site specific css file to ./src/css/[domain].css

## Potential improvements: 
- Check out the history object, and/or mark the :visited links better. Why the hell does not anyone use this browser feature anymore!?

- Check out the query strings for additional meta to store with each item. City would be useful for the listing on the options page, and maybe get movie/hotel category? 

- Adding customisable settings in the Options page. Turn on and off if the item page should close or not.





