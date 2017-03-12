chrome.runtime.onMessage.addListener(function(request, sender, sendResponse) {
  if (!!request.format) {
    copy(request.format);
  }
});

function copy(format) {
  return execCopy(getFormattedIssueLink(format));
}

function execCopy(text) {
  var textArea = document.createElement("textarea");
  textArea.style.cssText = "position:absolute;left:-100%;";

  document.body.appendChild(textArea);

  textArea.value = text;
  textArea.select();
  document.execCommand("copy");

  document.body.removeChild(textArea);
}

function getFormattedIssueLink(format) {
  var h1 = 'h1.gh-header-title';
  var title = document.querySelectorAll(`${h1} .js-issue-title`)[0].innerText.trim();
  var num = document.querySelectorAll(`${h1} .gh-header-number`)[0].innerText;
  var url = window.location.href;

  switch (format) {
    case 'markdown':
      return `[${num}｜${title}](${url})`;
      break;
    case 'html':
      return `<a href="${url}">${num}｜${title}</a>`;
      break;
    case 'plain':
      return `${num}｜${title}\n${url}`;
      break;
  }
  return '';
}
