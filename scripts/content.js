(function() {
  if (window.isAlreadyPrepared) return;
  window.isAlreadyPrepared = true;
  chrome.runtime.onMessage.addListener(function(request, sender, sendResponse) {
    if (!!request.format) {
      copy(request.format);
    }
  });

  function copy(format) {
    navigator.clipboard.writeText(getFormattedIssueLink(format));
  }

  function getFormattedIssueLink(format) {
    var h1 = 'h1.gh-header-title';
    var title = document.querySelectorAll(`${h1} .js-issue-title`)[0].innerText.trim();
    var num = document.querySelectorAll(`${h1} .f1-light`)[0].innerText;
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
