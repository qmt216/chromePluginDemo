$('input[name=user]').val('17600051750');
$('input[name=psd]').val('YXY20220112ljh02');
$('#TencentCaptcha').click();
//当前token
var token = "";
//当前是否需要执行任务的标识
var taskTag = true;
//每天2点重置task标识
setInterval(function () {
    var refreshHours = new Date().getHours();
    var refreshMin = new Date().getMinutes();
    var refreshSec = new Date().getSeconds();
    //每天2点
    // if (refreshHours === 14 && refreshMin === 0 && refreshSec === 0) {
    //     taskTag = true;
    // }
    if (refreshHours === 10 && refreshMin === 50 && refreshSec === 0) {
        taskTag = true;
    }
}, 1000);
//刷新页面 10分钟刷新一次
setInterval(refreshPage, 1000 * 60 * 10);

function refreshPage() {
    let newToken = $('input[name=jwtToken][type=hidden]').val();
    console.log('newToken', newToken, token);
    if (token !== newToken) {
        token = newToken;
        sendToken(newToken);
    }
    if (taskTag) {
        //跳转我的利润页
        $('#profit-agent').find('.J_menuItem').eq(0).click();
        setTimeout(() => {
            //触发下载
            $(window.frames["iframe10"].document).find("#toolbar .ul-list .item").eq(0).click();
            //跳转报表下载
            setTimeout(() => {
                $('#export-down').find('.J_menuItem').eq(0).click();
                setTimeout(() => {
                    $(window.frames["iframe13-17"].document).find("#data_table td:contains('posp交易流水导出')")
                        .eq(0).parent('tr').find('.RoleOfA.table-btn-primary').eq(0).click();
                    taskTag = false;
                }, 10000);
            }, 10000);
        }, 10000);
    }
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
            // alert(jqXHR);
        },
    });
}

// $('button').eq(0).click()=function(){
// 	var url = 'https://agent.jlpay.com/download/download';
//  const opstions = { url };
//  chrome.downloads.download(opstions, (value) => {
//   console.log(value);
// });
// }

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
