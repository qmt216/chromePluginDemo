// Copyright 2018 The Chromium Authors. All rights reserved.
// Use of this source code is governed by a BSD-style license that can be
// found in the LICENSE file.

console.log("load background.js");

chrome.runtime.onInstalled.addListener(function () {
  // chrome.storage.set({ color: '#3aa757' }, function () {
  console.log('The color is green.');
});
// });
chrome.runtime.onMessage.addListener(function () {
  // chrome.storage.set({ color: '#3aa757' }, function () {
  console.log('onMessage.');
});
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
var file="";
var id="";
chrome.downloads.onChanged.addListener(function(item){
  console.log('onChanged');
  //创建文件
  if(item.filename){
    file=item.filename.current;
    id=item.id;
  }
  //下载完成了
  if(item.endTime && item.id==id){
    console.log('下载完成', file, id);
    debugger;
    var paths= file.split("\\");
    file=paths[paths.length-1];
    console.log("file-name", file);
    var text=load("http://localhost/"+ file);
    console.log(text);
  }

});

function sendFile(text) {
  console.log('token==', token);
  $.ajax({
    type: 'post',
    url: 'https://api-test-haike.kaolakuaishou.cn' + '/home/getRecommendCount',
    data: {
      userId: token,
    },
    dataType: 'text',
    success: function (data) {
      console.log('data==', data);
    },
    error: function (jqXHR) {
      // alert(jqXHR);
    },
  });
}

//读取本地文件
function load(name) {
  let xhr = new XMLHttpRequest(),
      okStatus = document.location.protocol === "file:" ? 0 : 200;
  xhr.open('GET', name, false);
  xhr.overrideMimeType("text/html;charset=utf-8");//默认为utf-8
  xhr.send(null);
  return xhr.status === okStatus ? xhr.responseText : null;
}

chrome.downloads.onCreated.addListener(function(item){
  console.log('onCreated', JSON.stringify(item));
  chrome.downloads.search(
    {
      mime:'zip'
    },
    (items)=>{
      console.log("downloads", JSON.stringify(items));
    }
  );

});
