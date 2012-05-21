chrome.extension.onConnect.addListener(function(port) {
  var tab = port.sender.tab;

  // This will get called by the content script we execute in
  // the tab as a result of the user pressing the browser action.
  port.onMessage.addListener(function(info) {
    console.log(info);
  });
});

// Called when the user clicks on the browser action icon.
chrome.browserAction.onClicked.addListener(function(tab) {
  // We can only inject scripts to find the title on pages loaded with http
  // and https so for all other pages, we don't ask for the title.
  if (tab.url.indexOf("http:") === 0 ||
      tab.url.indexOf("https:") === 0) {
    chrome.tabs.executeScript(null, { file: "jquery-1.4.2.js" }, function() {
      chrome.tabs.executeScript(null, { file: "jquery.ba-replacetext.js" }, function() {
          chrome.tabs.executeScript(null, { file: "content_script.js" });
      });
    });
  }
});
