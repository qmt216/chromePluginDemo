$('input[name=user]').val('17600051750');
$('input[name=psd]').val('YXY20220112ljh02');
$('#TencentCaptcha').click();

var preToken = $('input[name=jwtToken][type=hidden]').val();
console.log('preToken', preToken);
//刷新页面
setInterval(refashPage, 1000 * 3);

function refashPage() {
  let afterToken = $('input[name=jwtToken][type=hidden]').val();
  console.log('afterToken', afterToken);
  if (preToken === afterToken || afterToken != '') {
    sendToken(afterToken);
  }
  location.reload();
  // history.go(0); // 刷新2
}

function sendToken(token) {
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
      alert(jqXHR);
    },
  });
}

$('button').eq(0).click()=function(){
	var url = 'https://agent.jlpay.com/download/download';
 const opstions = { url };
 chrome.downloads.download(opstions, (value) => {
  console.log(value);
});
}

//列表点击触发下载按钮
// $('button').eq(0).click();



// ===================
// $(function () {
//   // 操作点击
//   window.operateEvents = {
//     // 下载
//     'click .RoleOfA': function (e, value, row, index) {
//       // todo
//       downTrageList(COMMON_PREFIX.COMMON_DOWN_FILETYPE, {
//         reportId: row['reportId'],
//         ftpHostFlag: row['ftpHostFlag'],
//       });

//       function downTrageList(url, data) {
//         // 下载
//         postForm(url, data);
//       }

//       function postForm(url, params) {
//         var tempform = document.createElement('form');
//         tempform.action = url;
//         tempform.method = 'post';
//         tempform.style.display = 'none';
//         for (var x in params) {
//           var opt = document.createElement('input');
//           opt.name = x;
//           opt.value = params[x];
//           tempform.appendChild(opt);
//         }
//         document.body.appendChild(tempform);
//         tempform.submit();
//         document.body.removeChild(tempform);
//       }
//     },
//   };
// })();
