function GetQueryString(name) {
    var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)");
    var r = window.location.search.substr(1).match(reg);
    if (r != null) return unescape(r[2]); return null;
}

function GetRandomNum(Min, Max) {
    var Range = Max - Min;
    var Rand = Math.random();
    return (Min + Math.round(Rand * Range));
}
function isMobile(val) {
    var reg = new RegExp("^1[345789][0-9]{9}$");
    return reg.test(val.value);

}

function checkData(data, pro, code) {

    var reg = new RegExp("^\d{6}$");
    var flag = false;
    for (var i = 0; i < data.length; i++) {
        var temp = data[i];

        if (temp[pro] == code) {
            flag = true;
            $("#stockname").val(temp["n"]);
            break;
        }
    }
    return flag;
}

//提交股票代码，手机号码
var submitOnClick = function () {

    var code = $.trim($("#daima").val());
    if (!checkData(s, "c", code)) {
        layer.open({
            title:false,
            content: '股票不存在，请重新选择!',
            btn: ['确认']
        });
        return false;
    } else {
        $('#stockCode').html(code);
        $('#dialogBg').show();
    }
};
$(function () {
    if ($('#ldptn').length >0){loadp();}
    bridge.init();
    bridge.setTitle('五维诊股');
    $('#wxh').html(bridge.search('wxh') || 'hxzt3096');

    $('#markBg').on('click', function(e) {
        $('#dialogBg').hide();
    });

    // 粘贴事件绑定
    var clipboard = new ClipboardJS('.btn', {
        text: function () {
        return bridge.search('wxh') || 'hxzt3096';
        },
    });

    clipboard.on('success', function (e) {
        e.clearSelection();
    });

    clipboard.on('error', function (err) {
        console.log(err);
    });
    AutoComplete.setup({
        "inputElement": "daima",
        "dataSource": s,
        "displayZoneWidth": 220,
        "maxMatchedItemNumberAllowed": 6,
        "inputEnterCallback": function (obj) {
            //submitOnClick();
        },
        "trClickCallback": function (obj) {
            //submitOnClick();
        }
    });
});

