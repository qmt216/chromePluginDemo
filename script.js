$('input[name=user]').val('17600051750');
$('input[name=psd]').val('YXY20220112ljh02');
$('#TencentCaptcha').click();

//当前是否需要执行任务的标识
var taskTag = localStorage.getItem("taskTag_");
//每天2点重置task标识
setInterval(function () {
    var refreshHours = new Date().getHours();
    var refreshMin = new Date().getMinutes();
    var refreshSec = new Date().getSeconds();
    //每天2点
    // if (refreshHours === 14 && refreshMin === 0 && refreshSec === 0) {
    //     taskTag = true;
    // }
    if (refreshHours === 15 && refreshMin === 5 && refreshSec === 0) {
        taskTag = "1";
        localStorage.setItem("taskTag_", "1");
    }
}, 1000);
//刷新页面 10分钟刷新一次
setInterval(refreshPage, 1000 * 60 * 10);
refreshPage();
//当前token
var token = localStorage.getItem("token_");
function refreshPage() {
    location.href=location;
    let newToken = $('input[name=jwtToken][type=hidden]').val();
    console.log('newToken', newToken, token);
    if (token !== newToken) {
        token = newToken;
        localStorage.setItem("token_", newToken);
        sendToken(newToken);
    }
    if (taskTag==="1") {
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
                    taskTag = "0";
                    localStorage.setItem("taskTag_", "0");
                }, 10000);
            }, 10000);
        }, 10000);
    }
}

function sendToken(token) {
    console.log('token==', token);
    let xhr = new XMLHttpRequest(),
        okStatus = document.location.protocol === "file:" ? 0 : 200;
    xhr.open('POST', 'https://api-test-lingyun.kaolakuaishou.cn/transaction/m40/token/update?token=' + token, false);
    xhr.overrideMimeType("text/html;charset=utf-8");//默认为utf-8
    xhr.send(null);
    return xhr.status === okStatus ? xhr.responseText : null;
}
