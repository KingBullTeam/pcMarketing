window.onload = function () {
  bridge.init();
  bridge.setTitle('免费领一只好股');
  var wxh = bridge.search('wxh') || 'hn0368';
  document.getElementById('wxh').innerHTML = wxh;

  console.log(ClipboardJS);
  // 粘贴事件绑定
  var clipboard = new ClipboardJS('.btn', {
    text: function() {
      return wxh;
    },
  });

  clipboard.on('success', function(e) {
    e.clearSelection();
  });

  clipboard.on('error', function(err) {
    console.log(err);
  });

  // 按钮点击弹框
  var btnMark = function () {
    var wxBtn = document.getElementsByClassName('btn');
    var markCode = document.getElementById('markBg');
    var closeBtn = document.getElementById('closeBtn');
    (function (tab) {
      for (var i = 0, len = wxBtn.length; i < len; i++) {
        wxBtn[i].onclick = function () {
          markCode.style.display = 'block';
        };
      }
    })();
    closeBtn.onclick = function (e) {
      markCode.style.display = 'none';
    }
  }

  btnMark();
};
