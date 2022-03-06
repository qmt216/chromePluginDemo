if (chrome.downloads.setShelfEnabled)
chrome.downloads.setShelfEnabled(false);

// Copyright 2018 The Chromium Authors. All rights reserved.
// Use of this source code is governed by a BSD-style license that can be
// found in the LICENSE file.
chrome.runtime.onInstalled.addListener(function () {
  // chrome.storage.set({ color: '#3aa757' }, function () {
  console.log('The color is green.');
});
// });

// chrome.declarativeContent.onPageChanged.removeRules(undefined, function () {
chrome.declarativeContent.onPageChanged.addRules([
  {
    conditions: [
      new chrome.declarativeContent.PageStateMatcher({
        pageUrl: { hostEquals: 'developer.chrome.com' },
      }),
    ],
    actions: [new chrome.declarativeContent.ShowPageAction()],
  },
]);
// });

chrome.downloads.onChanged.addListener((item)=>{
  debugger;
  console.log('onChanged', JSON.stringify(item));
  chrome.downloads.search(
    {
      mime:'zip'
    },
    (items)=>{
      console.log("downloads", JSON.stringify(items));
    }
  );

})

