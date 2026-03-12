var buttons = document.getElementById('buttons');
buttons.addEventListener('click', function (e) {
  var item = e.target.closest('.ActionList-item');
  if (!item) return;
  sendClick(item.id, function () {
    window.close();
  });
});

function sendClick(formatType, callback) {
  chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {
    chrome.scripting.executeScript({
      target: { tabId: tabs[0].id },
      files: ["scripts/content.js"]
    }, function () {
      chrome.tabs.sendMessage(tabs[0].id, {format: formatType}, function(response) {
        if (response && response.text) {
          navigator.clipboard.writeText(response.text).then(callback);
        }
      });
    });
  });
}
