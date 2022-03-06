var s = document.createElement('script');
s.src = chrome.runtime.getURL('./script.js');
s.onload = function () {
  // console.log('loaded', s);
};

(document.head || document.documentElement).appendChild(s);
