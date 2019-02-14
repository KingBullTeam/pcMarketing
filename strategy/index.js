window.onload = function () {
  var f = ['🌑', '🌒', '🌓', '🌔', '🌝', '🌖', '🌗', '🌘'];
  // var f = ['🕐','🕑','🕒','🕓','🕔','🕕','🕖','🕗','🕘','🕙','🕚','🕛'];

  function loop() {
    location.hash = f[Math.floor((Date.now() / 100) % f.length)];
    setTimeout(loop, 50);
  }
  // 按钮点击弹框
  var btnMark = function () {
    var wxBtn = document.getElementsByClassName('btn');
    var markCode = document.getElementById('markCode');
    var closeBtn = document.getElementById('closeBtn');
    var wxImg = document.getElementById('wxCodeMark');
    (function (tab) {
      for (var i = 0, len = wxBtn.length; i < len; i++) {
        wxBtn[i].onclick = function () {
          markCode.style.display = 'block';
        };
      }
    })();
    closeBtn.onclick = function (e) {
      if (e.target != wxImg) {
        markCode.style.display = 'none';
      }
    }
  }

  loop();
  btnMark();
};
