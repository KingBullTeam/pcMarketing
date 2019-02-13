window.onload = function () {
  // 涨了么  tab切换
  var tabInit = function () {
    var olEl = document.getElementById('olTab').getElementsByTagName('li');
    var ulEl = document.getElementById('ulTab').getElementsByTagName('li');

    (function (tab) {
      for (var i = 0, len = olEl.length; i < len; i++) {
        olEl[i].onmouseover = showTab;
      }
    })();

    function showTab() {
      for (var i = 0, len = olEl.length; i < len; i++) {
        if (olEl[i] === this) {
          olEl[i].className = 'active';
          ulEl[i].className = 'active';
        } else {
          olEl[i].className = '';
          ulEl[i].className = '';
        }
      }
    }
  };


  // 按钮点击弹框
  var btnMark = function () {
    var wxBtn = document.getElementsByClassName('wxbtn');
    var markCode = document.getElementById('markCode');
    var wxImg = document.getElementById('wxCodeMark');
    (function (tab) {
      for (var i = 0, len = wxBtn.length; i < len; i++) {
        wxBtn[i].onclick = function () {
          markCode.style.display = 'block';
        };
      }
    })();
    markCode.onclick = function (e) {
      console.log(e.target != wxImg);
      if (e.target != wxImg) {
        markCode.style.display = 'none';
      }
    }
  }

  tabInit();
  btnMark();
};