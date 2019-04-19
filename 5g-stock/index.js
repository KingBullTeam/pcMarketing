/**
 * astock.js
 * 注：app和js交互代码
 */
(function (root, factory) {
  if (typeof define === 'function' && define.amd) {
    // AMD
    define(['bridge'], factory);
  } else if (typeof exports === 'object') {
    // Node, CommonJS之类的
    module.exports = factory();
  } else {
    // 浏览器全局变量(root 即 window)
    root.bridge = factory();
  }
}(this, function () {
  'use strict';
  // var qiaong = (typeof require !== 'undefined') ? require('./ng.js') : window.ng;
  var ready = false;
  var readyCallbacks = [];
  var bridge;
  var NGWBridge = {};

  /**
   * 初始化
   * 需要在每个页面初始化时调用
   */
  NGWBridge.init = function () {
    if (window.WebViewJavascriptBridge) {
      NGWBridge.initCallback(window.WebViewJavascriptBridge);
    } else {
      document.addEventListener('WebViewJavascriptBridgeReady', function () {
        NGWBridge.initCallback(window.WebViewJavascriptBridge);
      }, false);
    }
  };
  NGWBridge.initCallback = function (b) {
    ready = true;

    bridge = b;
    if (bridge.init) bridge.init(function (message, responseCallback) {});

    readyCallbacks.forEach(function (callback) {
      callback();
    });
  };

  /**
   * ready
   * bridge就位后开始执行
   */
  NGWBridge.ready = function (callback) {
    if (ready) {
      return callback();
    } else {
      readyCallbacks.push(callback);
    }
  };

  /**
   * 设置标题
   */
  NGWBridge.setTitle = function (title) {
    if (title) {
      if (typeof android != 'undefined') {
        if (android.setWebTitle) android.setWebTitle(title);
      } else {
        NGWBridge.ready(function () {
          var msg = JSON.stringify({
            method: 'settitle',
            methodtype: 'settitle',
            title: title
          });

          if (bridge.send) bridge.send(msg);
          if (bridge.sendMessage) bridge.sendMessage(msg);
        });
      }
    }
  };
  
  /**
   * 获取usertoken
   */
  NGWBridge.utoken = function (callback) {
    var usertoken = NGWBridge.search('usertoken');
    if (usertoken) {
      if (callback) callback(usertoken);
    } else if (typeof android != 'undefined') {
      if (callback && android.getUserToken) callback(android.getUserToken());
    } else {
      NGWBridge.ready(function () {
        var msg = JSON.stringify({
          method: 'getUserToken',
          methodtype: 'getUserToken'
        });

        if (bridge.send) {
          bridge.send(msg, function (responseData) {
            var utoken = '';

            if (responseData) {
              var json = JSON.parse(responseData);
              if (json) utoken = json.usertoken;
            }

            if (callback) callback(utoken);
          });
        }
      });
    }
  };

  /**
   * 拨打电话
   */
  NGWBridge.telPhone = function (tel) {
    if (tel) {
      if (typeof android != 'undefined') {
        if (android.telPhone) android.telPhone(tel);
      } else {
        location.href = 'tel:' + tel;
      }
    }
  };

  /**
   * 打开pdf
   */
  NGWBridge.openPDF = function (filepath, filename) {
    if (filepath && filename) {
      if (typeof android != 'undefined') {
        if (android.openPDF) android.openPDF(filepath, filename);
      } else {
        location.href = filepath;
      }
    }
  };

  /**
   * 搜索key
   */
  NGWBridge.search = function (key) {
    var res;
    var ss;
    var i;
    var sss;
    var s = location.search;
    if (s) {
      s = s.substr(1);
      if (s) {
        ss = s.split('&');
        for (i = 0; i < ss.length; i++) {
          sss = ss[i].split('=');
          if (sss && sss[0] === key) {
            res = sss[1];
          }
        }
      }
    }
    return res;
  };

  return NGWBridge;
}));