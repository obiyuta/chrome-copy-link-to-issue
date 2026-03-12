chrome.runtime.onInstalled.addListener(function() {
  chrome.action.disable();
  chrome.declarativeContent.onPageChanged.removeRules(undefined, function() {
    chrome.declarativeContent.onPageChanged.addRules([
      {
        conditions: [
          new chrome.declarativeContent.PageStateMatcher({
            pageUrl: {
              hostEquals: 'github.com',
              schemes: ['https'],
              urlMatches: '/(.+)/(.+)/(issues|pull)/(\\d+)'
            },
            css: ['.markdown-title']
          })
        ],
        actions: [ new chrome.declarativeContent.ShowAction() ]
      }
    ]);
  });
});
