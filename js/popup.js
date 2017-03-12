var buttons = document.getElementById("buttons");
buttons.addEventListener("click", function (e) {
  sendClick(e.target.id);
  window.close();
});

function sendClick(formatType) {
  chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {
    chrome.tabs.sendMessage(tabs[0].id, {format: formatType}, function(response) {});
  });
}
