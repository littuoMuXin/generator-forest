/**
 * Description:
 * User: 常胤 <satans17@gmail.com>
 * Date: 15/11/6
 * Copyright(c) 2014 Taobao.com
 */

import NodeJS_util from 'util';
import dateFormat from './dateFormat';

let userAgent = navigator.userAgent;
let isIOS = /(iPhone|iPad|iPod|iOS)/i.test(userAgent);
let isAndroid = /(Android)/i.test(userAgent);


function makeArray(o) {
  if (o == null) {
    return [];
  }
  if (Object.prototype.toString.call(o) == '[object Array]') {
    return o;
  }
  var lengthType = typeof o.length,
    oType = typeof o;
  // The strings and functions also have 'length'
  if (lengthType !== 'number' ||
      // select element
      // https://github.com/kissyteam/kissy/issues/537
    typeof o.nodeName === 'string' ||
      // window
      /*jshint eqeqeq:false*/
    (o != null && o == o.window) ||
    oType === 'string' ||
      // https://github.com/ariya/phantomjs/issues/11478
    (oType === 'function' && !('item' in o && lengthType === 'number'))) {
    return [o];
  }
  var ret = [];
  for (var i = 0, l = o.length; i < l; i++) {
    ret[i] = o[i];
  }
  return ret;
}


function later(fn, when, periodic, context, data) {
  when = when || 0;
  var m = fn,
    d = makeArray(data),
    f,
    r;

  if (typeof fn === 'string') {
    m = context[fn];
  }

  f = function () {
    m.apply(context, d);
  };

  r = (periodic) ? setInterval(f, when) : setTimeout(f, when);

  return {
    id: r,
    interval: periodic,
    cancel: function () {
      if (this.interval) {
        clearInterval(r);
      } else {
        clearTimeout(r);
      }
    }
  };
}


function buffer(fn, ms, context) {
  ms = ms || 150;

  if (ms === -1) {
    return function () {
      fn.apply(context || this, arguments);
    };
  }
  var bufferTimer = null;

  function f() {
    f.stop();
    bufferTimer = later(fn, ms, 0, context || this, arguments);
  }

  f.stop = function () {
    if (bufferTimer) {
      bufferTimer.cancel();
      bufferTimer = 0;
    }
  };

  return f;
}


function throttle(fn, ms, context) {
  ms = ms || 150;
  if (ms === -1) {
    return function () {
      fn.apply(context || this, arguments);
    };
  }
  var last = new Date();
  return function () {
    var now = new Date();
    if (now - last > ms) {
      last = now;
      fn.apply(context || this, arguments);
    }
  };
}


function getStringLen(str) {
  if (str == null) return 0;
  if (typeof str != "string")str += "";
  return str.replace(/[^\x00-\xff]/g, "01").length;
}

function confirm(text, okCallback) {
  if (isTB) {
    window.WindVane.call('WVUIDialog', 'confirm', {
      message: text,
      okbutton: '确定',
      canclebutton: '取消',
      _index: confirmIndex++
    }, function (e) {
    }, function (e) {
    });
    document.addEventListener('wv.dialog', function (e) {
      if (e.param.type === '确定') {
        if (okCallback) okCallback();
      }
    }, false);

  } else {
    if (confirm(text)) {
      if (okCallback) okCallback();
    }

  }
}

function getUrlArg(){ 
  var url = location.search;
  var theRequest = [];
   if (url.indexOf("?") != -1) {
      var str = url.substr(1);
      var strs = str.split("&");
      for(var i = 0; i < strs.length; i ++) {
         theRequest.push({
            key: strs[i].split("=")[0],
            val: strs[i].split("=")[1]
         });
      }
   }
   return theRequest;
}

var hasOwnProperty = Object.prototype.hasOwnProperty;
var propIsEnumerable = Object.prototype.propertyIsEnumerable;

function toObject(val) {
  if (val === null || val === undefined) {
    throw new TypeError('Object.assign cannot be called with null or undefined');
  }

  return Object(val);
}

var assign = Object.assign || function(target, source) {
  var from;
  var to = toObject(target);
  var symbols;

  for (var s = 1; s < arguments.length; s++) {
    from = Object(arguments[s]);

    for (var key in from) {
      if (hasOwnProperty.call(from, key)) {
        to[key] = from[key];
      }
    }

    if (Object.getOwnPropertySymbols) {
      symbols = Object.getOwnPropertySymbols(from);
      for (var i = 0; i < symbols.length; i++) {
        if (propIsEnumerable.call(from, symbols[i])) {
          to[symbols[i]] = from[symbols[i]];
        }
      }
    }
  }

  return to;
};

var util = NodeJS_util._extend(NodeJS_util, {
  makeArray: makeArray,
  later: later,
  buffer: buffer,
  throttle: throttle,
  dateFormat: dateFormat,
  getUrlArg: getUrlArg,
  assign: assign,
  ios: isIOS,
  android: isAndroid
})

export default util;