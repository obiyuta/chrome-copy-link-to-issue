var buttons = document.getElementById('buttons');
buttons.addEventListener('click', function (e) {
  ga('send', 'event', 'copy', 'click', e.target.id);
  sendClick(e.target.id, function () {
    window.close();
  });
});

function sendClick(formatType, callback) {
  chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {
    chrome.tabs.executeScript(tabs[0].id, {
      "file": "scripts/content.js"
    }, function () {
      chrome.tabs.sendMessage(tabs[0].id, {format: formatType}, callback);
    });
  });
}
