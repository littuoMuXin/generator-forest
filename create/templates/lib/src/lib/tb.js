/**
 * Description: 淘宝主客的各种功能，希望以后windvane能提供npm的版本
 * User: 常胤 <satans17@gmail.com>
 * Date: 15/11/7
 * Copyright(c) 2015 Taobao.com
 */

let win = window;
let lib = win['lib'];

function setDocumentTitle(title) {
	win.WindVane.call('WebAppInterface', 'setCustomPageTitle', {
		title: title
	}, function(e) {
  }, function (e) {
    document.title = title;
  });
}

function openWindow(url, callback) {
  let isTB = win.navigator.userAgent.match(/WindVane/i) ? true : false;

  if (callback && NodeJS_util.isFunction(callback)) {
    callback();
  }

  if (url.length === 0 || url === '#' || url === 'javascript:;' || url.indexOf('tel:') === 0) {
    return;
  }

  //在手淘环境，且是手淘native协议，不用windwane接口
  if (isTB && url.indexOf('taobao') === 0 || !isTB) {
    location.href = url;
  } else {
    //链接没有协议头，加上
    if (url.indexOf('http') !== 0) {
      url = location.protocol + url;
    }
    TB.windVane.call('Base', 'openWindow', {
      url: url
    }, function (e) {
    }, function (e) {
      location.href = url;
    });
  }
}

var TB = {
  isTaoBaoApp: win.navigator.userAgent.match(/WindVane/i) ? true : false,
  windVane:win['WindVane'],
  mtop:lib['mtop'],
  login:lib['login'],
  setDocumentTitle: setDocumentTitle,
  openWindow: openWindow
};

export default TB;