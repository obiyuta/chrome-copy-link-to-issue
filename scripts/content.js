(function() {
  if (window.isAlreadyPrepared) return;
  window.isAlreadyPrepared = true;
  chrome.runtime.onMessage.addListener(function(request, sender, sendResponse) {
    if (request.format) {
      sendResponse({ text: getFormattedIssueLink(request.format) });
    } else {
      sendResponse({});
    }
  });

  function getFormattedIssueLink(format) {
    var titleEl = document.querySelector('[data-component="TitleArea"] .markdown-title');
    var title = titleEl ? titleEl.innerText.trim() : '';
    var match = window.location.pathname.match(/\/(issues|pull)\/(\d+)/);
    var num = match ? '#' + match[2] : '';
    var url = window.location.href;
    var type = isPullRequestUrl(url) ? ' (Pull request)' : '';

    switch (format) {
      case 'markdown':
        return `[${num}｜${title}${type}](${url})`;
        break;
      case 'html':
        return `<a href="${url}">${num}｜${title}${type}</a>`;
        break;
      case 'plain':
        return `${num}｜${title}${type}\n${url}`;
        break;
    }
    return '';
  }

  function isPullRequestUrl(url) {
    return /^https:\/\/github.com\/(.+)\/(.+)\/pull\/(\d+)/.test(url)
  }
})();
