// Why dis?
// https://medium.com/@otiai10/how-to-use-es6-import-with-chrome-extension-bd5217b9c978
// https://github.com/otiai10/chrome-extension-es6-import/tree/master

// as a bonus you don't have to refresh the extension to test it! :D

(async () => {
  const src = chrome.extension.getURL('src/js/content.js');
  const contentScript = await import(src);
  contentScript.main();
})();