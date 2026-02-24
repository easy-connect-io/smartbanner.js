/*!
 * smartbanner.js v1.24.1 <https://github.com/ain/smartbanner.js#readme>
 * Copyright © 2026 Ain Tohvri, contributors. Licensed under GPL-3.0.
 */
(function(){function r(e,n,t){function o(i,f){if(!n[i]){if(!e[i]){var c="function"==typeof require&&require;if(!f&&c)return c(i,!0);if(u)return u(i,!0);var a=new Error("Cannot find module '"+i+"'");throw a.code="MODULE_NOT_FOUND",a}var p=n[i]={exports:{}};e[i][0].call(p.exports,function(r){var n=e[i][1][r];return o(n||r)},p,p.exports,r,e,n,t)}return n[i].exports}for(var u="function"==typeof require&&require,i=0;i<t.length;i++)o(t[i]);return o}return r})()({1:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;
function _typeof(o) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (o) { return typeof o; } : function (o) { return o && "function" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? "symbol" : typeof o; }, _typeof(o); }
function _classCallCheck(a, n) { if (!(a instanceof n)) throw new TypeError("Cannot call a class as a function"); }
function _defineProperties(e, r) { for (var t = 0; t < r.length; t++) { var o = r[t]; o.enumerable = o.enumerable || !1, o.configurable = !0, "value" in o && (o.writable = !0), Object.defineProperty(e, _toPropertyKey(o.key), o); } }
function _createClass(e, r, t) { return r && _defineProperties(e.prototype, r), t && _defineProperties(e, t), Object.defineProperty(e, "prototype", { writable: !1 }), e; }
function _toPropertyKey(t) { var i = _toPrimitive(t, "string"); return "symbol" == _typeof(i) ? i : i + ""; }
function _toPrimitive(t, r) { if ("object" != _typeof(t) || !t) return t; var e = t[Symbol.toPrimitive]; if (void 0 !== e) { var i = e.call(t, r || "default"); if ("object" != _typeof(i)) return i; throw new TypeError("@@toPrimitive must return a primitive value."); } return ("string" === r ? String : Number)(t); }
var Bakery = exports["default"] = /*#__PURE__*/function () {
  function Bakery() {
    _classCallCheck(this, Bakery);
  }
  return _createClass(Bakery, null, [{
    key: "getCookieExpiresString",
    value: function getCookieExpiresString(hideTtl) {
      var now = new Date();
      var expireTime = new Date(now.getTime() + hideTtl);
      return "expires=".concat(expireTime.toGMTString(), ";");
    }
  }, {
    key: "bake",
    value: function bake(hideTtl, hidePath) {
      document.cookie = "smartbanner_exited=1; ".concat(hideTtl ? Bakery.getCookieExpiresString(hideTtl) : '', " path=").concat(hidePath);
    }
  }, {
    key: "unbake",
    value: function unbake() {
      document.cookie = 'smartbanner_exited=; expires=Thu, 01 Jan 1970 00:00:01 GMT;';
    }
  }, {
    key: "baked",
    get: function get() {
      var value = document.cookie.replace(/(?:(?:^|.*;\s*)smartbanner_exited\s*=\s*([^;]*).*$)|^.*$/, '$1');
      return value === '1';
    }
  }]);
}();

},{}],2:[function(require,module,exports){
(function (global){(function (){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;
function _typeof(o) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (o) { return typeof o; } : function (o) { return o && "function" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? "symbol" : typeof o; }, _typeof(o); }
function _classCallCheck(a, n) { if (!(a instanceof n)) throw new TypeError("Cannot call a class as a function"); }
function _defineProperties(e, r) { for (var t = 0; t < r.length; t++) { var o = r[t]; o.enumerable = o.enumerable || !1, o.configurable = !0, "value" in o && (o.writable = !0), Object.defineProperty(e, _toPropertyKey(o.key), o); } }
function _createClass(e, r, t) { return r && _defineProperties(e.prototype, r), t && _defineProperties(e, t), Object.defineProperty(e, "prototype", { writable: !1 }), e; }
function _toPropertyKey(t) { var i = _toPrimitive(t, "string"); return "symbol" == _typeof(i) ? i : i + ""; }
function _toPrimitive(t, r) { if ("object" != _typeof(t) || !t) return t; var e = t[Symbol.toPrimitive]; if (void 0 !== e) { var i = e.call(t, r || "default"); if ("object" != _typeof(i)) return i; throw new TypeError("@@toPrimitive must return a primitive value."); } return ("string" === r ? String : Number)(t); }
var Detector = exports["default"] = /*#__PURE__*/function () {
  function Detector() {
    _classCallCheck(this, Detector);
  }
  return _createClass(Detector, null, [{
    key: "platform",
    value: function platform() {
      var maxTouchPoints = window.navigator.maxTouchPoints;
      var userAgent = window.navigator.userAgent;
      if (/Android/i.test(userAgent)) {
        return 'android';
        // maxTouchPoints is the only effective method to detect iPad iOS 13+
        // FMI https://developer.apple.com/forums/thread/119186
      } else if (!window.MSStream && !/X11|Linux|Windows/i.test(userAgent) && maxTouchPoints && maxTouchPoints > 0 || /iPhone|iPad|iPod/i.test(userAgent)) {
        return 'ios';
      }
    }
  }, {
    key: "userAgentMatchesRegex",
    value: function userAgentMatchesRegex(regexString) {
      return new RegExp(regexString).test(window.navigator.userAgent);
    }
  }, {
    key: "jQueryMobilePage",
    value: function jQueryMobilePage() {
      return typeof global.$ !== 'undefined' && global.$.mobile !== 'undefined' && document.querySelector('.ui-page') !== null;
    }
  }, {
    key: "wrapperElement",
    value: function wrapperElement() {
      var selector = Detector.jQueryMobilePage() ? '.ui-page' : 'html';
      return document.querySelectorAll(selector);
    }
  }]);
}();

}).call(this)}).call(this,typeof global !== "undefined" ? global : typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : {})
},{}],3:[function(require,module,exports){
"use strict";

var _smartbanner = _interopRequireDefault(require("./smartbanner.js"));
function _interopRequireDefault(e) { return e && e.__esModule ? e : { "default": e }; }
var smartbanner;
window.addEventListener('load', function () {
  smartbanner = new _smartbanner["default"]();
  if (smartbanner.apiEnabled) {
    window.smartbanner = smartbanner;
  } else {
    smartbanner.publish();
  }
});

},{"./smartbanner.js":6}],4:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;
function _typeof(o) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (o) { return typeof o; } : function (o) { return o && "function" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? "symbol" : typeof o; }, _typeof(o); }
function _classCallCheck(a, n) { if (!(a instanceof n)) throw new TypeError("Cannot call a class as a function"); }
function _defineProperties(e, r) { for (var t = 0; t < r.length; t++) { var o = r[t]; o.enumerable = o.enumerable || !1, o.configurable = !0, "value" in o && (o.writable = !0), Object.defineProperty(e, _toPropertyKey(o.key), o); } }
function _createClass(e, r, t) { return r && _defineProperties(e.prototype, r), t && _defineProperties(e, t), Object.defineProperty(e, "prototype", { writable: !1 }), e; }
function _toPropertyKey(t) { var i = _toPrimitive(t, "string"); return "symbol" == _typeof(i) ? i : i + ""; }
function _toPrimitive(t, r) { if ("object" != _typeof(t) || !t) return t; var e = t[Symbol.toPrimitive]; if (void 0 !== e) { var i = e.call(t, r || "default"); if ("object" != _typeof(i)) return i; throw new TypeError("@@toPrimitive must return a primitive value."); } return ("string" === r ? String : Number)(t); }
function valid(name) {
  // TODO: validate against options dictionary
  return name.indexOf('smartbanner:') !== -1 && name.split(':')[1].length > 0;
}
function convertToCamelCase(name) {
  var parts = name.split('-');
  parts.map(function (part, index) {
    if (index > 0) {
      parts[index] = part.charAt(0).toUpperCase() + part.substring(1);
    }
  });
  return parts.join('');
}
var OptionParser = exports["default"] = /*#__PURE__*/function () {
  function OptionParser() {
    _classCallCheck(this, OptionParser);
  }
  return _createClass(OptionParser, [{
    key: "parse",
    value: function parse() {
      var metas = document.getElementsByTagName('meta');
      var options = {};
      Array.apply(null, metas).forEach(function (meta) {
        var optionName = null;
        var name = meta.getAttribute('name');
        var content = meta.getAttribute('content');
        if (name && content && valid(name) && content.length > 0) {
          optionName = name.split(':')[1];
          if (optionName.indexOf('-') !== -1) {
            optionName = convertToCamelCase(optionName);
          }
          options[optionName] = content;
        }
      });
      return options;
    }
  }]);
}();

},{}],5:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;
var _default = exports["default"] = ":host {\n  all: initial !important;\n}\n\n.smartbanner {\n  left: 0;\n  z-index: 9999;\n  overflow-x: hidden;\n  width: 100%;\n  height: 84px;\n  background: #f3f3f3;\n  font-family: Helvetica, sans, sans-serif;\n  /** Android styles **/\n}\n.smartbanner.smartbanner--top {\n  position: relative;\n}\n.smartbanner.smartbanner--top-absolute {\n  position: absolute;\n  top: 0;\n}\n.smartbanner.smartbanner--bottom {\n  position: fixed;\n  bottom: 0;\n}\n.smartbanner__exit {\n  position: absolute;\n  top: calc(50% - 6px);\n  left: 9px;\n  display: block;\n  margin: 0;\n  width: 12px;\n  height: 12px;\n  border: 0;\n  text-align: center;\n}\n.smartbanner__exit::before, .smartbanner__exit::after {\n  position: absolute;\n  width: 1px;\n  height: 12px;\n  background: #716f6f;\n  content: \" \";\n}\n.smartbanner__exit::before {\n  transform: rotate(45deg);\n}\n.smartbanner__exit::after {\n  transform: rotate(-45deg);\n}\n.smartbanner__icon {\n  position: absolute;\n  top: 10px;\n  left: 30px;\n  width: 64px;\n  height: 64px;\n  border-radius: 15px;\n  background-size: 64px 64px;\n}\n.smartbanner__info {\n  position: absolute;\n  top: 10px;\n  left: 104px;\n  display: flex;\n  overflow-y: hidden;\n  width: 60%;\n  height: 64px;\n  align-items: center;\n  color: #000;\n}\n.smartbanner__info__title {\n  font-size: 14px;\n}\n.smartbanner__info__author, .smartbanner__info__price {\n  font-size: 12px;\n  width: 85%;\n}\n@media screen and (min-width: 500px) {\n  .smartbanner__info__author, .smartbanner__info__price {\n    width: 100%;\n  }\n}\n.smartbanner__button {\n  position: absolute;\n  top: 32px;\n  right: 10px;\n  z-index: 1;\n  display: block;\n  padding: 0 10px;\n  min-width: 10%;\n  border-radius: 5px;\n  background: #f3f3f3;\n  color: #1474fc;\n  font-size: 18px;\n  text-align: center;\n  text-decoration: none;\n}\n.smartbanner__button__label {\n  text-align: center;\n}\n.smartbanner.smartbanner--android {\n  background: #3d3d3d url(\"data:image/gif;base64,R0lGODlhCAAIAIABAFVVVf///yH5BAEHAAEALAAAAAAIAAgAAAINRG4XudroGJBRsYcxKAA7\");\n  box-shadow: inset 0 4px 0 #88b131;\n}\n.smartbanner.smartbanner--android .smartbanner__exit {\n  left: 6px;\n  margin-right: 7px;\n  width: 17px;\n  height: 17px;\n  border-radius: 14px;\n  background: #1c1e21;\n  box-shadow: 0 1px 2px rgba(0, 0, 0, 0.8) inset, 0 1px 1px rgba(255, 255, 255, 0.3);\n  color: #b1b1b3;\n  font-family: \"ArialRoundedMTBold\", Arial;\n  font-size: 20px;\n  line-height: 17px;\n  text-shadow: 0 1px 1px #000;\n}\n.smartbanner.smartbanner--android .smartbanner__exit::before, .smartbanner.smartbanner--android .smartbanner__exit::after {\n  top: 3px;\n  left: 8px;\n  width: 2px;\n  height: 11px;\n  background: #b1b1b3;\n}\n.smartbanner.smartbanner--android .smartbanner__exit:active, .smartbanner.smartbanner--android .smartbanner__exit:hover {\n  color: #eee;\n}\n.smartbanner.smartbanner--android .smartbanner__icon {\n  background-color: transparent;\n  box-shadow: none;\n}\n.smartbanner.smartbanner--android .smartbanner__info {\n  color: #ccc;\n  text-shadow: 0 1px 2px #000;\n}\n.smartbanner.smartbanner--android .smartbanner__info__title {\n  color: #fff;\n  font-weight: bold;\n}\n.smartbanner.smartbanner--android .smartbanner__button {\n  top: 30px;\n  right: 20px;\n  padding: 0;\n  min-width: 12%;\n  border-radius: 0;\n  background: none;\n  box-shadow: 0 0 0 1px #333, 0 0 0 2px #dddcdc;\n  color: #d1d1d1;\n  font-size: 14px;\n  font-weight: bold;\n}\n.smartbanner.smartbanner--android .smartbanner__button:active, .smartbanner.smartbanner--android .smartbanner__button:hover {\n  background: none;\n}\n.smartbanner.smartbanner--android .smartbanner__button__label {\n  display: block;\n  padding: 0 10px;\n  background: #42b6c9;\n  background: linear-gradient(to bottom, #42b6c9, #39a9bb);\n  box-shadow: none;\n  line-height: 24px;\n  text-align: center;\n  text-shadow: none;\n  text-transform: none;\n}\n.smartbanner.smartbanner--android .smartbanner__button__label:active, .smartbanner.smartbanner--android .smartbanner__button__label:hover {\n  background: #2ac7e1;\n}\n\n/*# sourceMappingURL=smartbanner.css.map */\n";

},{}],6:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;
var _bakery = _interopRequireDefault(require("./bakery.js"));
var _detector = _interopRequireDefault(require("./detector.js"));
var _optionparser = _interopRequireDefault(require("./optionparser.js"));
var _smartbannerStyles = _interopRequireDefault(require("./smartbanner-styles.js"));
function _interopRequireDefault(e) { return e && e.__esModule ? e : { "default": e }; }
function _typeof(o) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (o) { return typeof o; } : function (o) { return o && "function" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? "symbol" : typeof o; }, _typeof(o); }
function _classCallCheck(a, n) { if (!(a instanceof n)) throw new TypeError("Cannot call a class as a function"); }
function _defineProperties(e, r) { for (var t = 0; t < r.length; t++) { var o = r[t]; o.enumerable = o.enumerable || !1, o.configurable = !0, "value" in o && (o.writable = !0), Object.defineProperty(e, _toPropertyKey(o.key), o); } }
function _createClass(e, r, t) { return r && _defineProperties(e.prototype, r), t && _defineProperties(e, t), Object.defineProperty(e, "prototype", { writable: !1 }), e; }
function _toPropertyKey(t) { var i = _toPrimitive(t, "string"); return "symbol" == _typeof(i) ? i : i + ""; }
function _toPrimitive(t, r) { if ("object" != _typeof(t) || !t) return t; var e = t[Symbol.toPrimitive]; if (void 0 !== e) { var i = e.call(t, r || "default"); if ("object" != _typeof(i)) return i; throw new TypeError("@@toPrimitive must return a primitive value."); } return ("string" === r ? String : Number)(t); }
var DEFAULT_PLATFORMS = 'android,ios';
var DEFAULT_CLOSE_LABEL = 'Close';
var DEFAULT_BUTTON_LABEL = 'View';
var datas = {
  originalTop: 'data-smartbanner-original-top',
  originalMarginTop: 'data-smartbanner-original-margin-top'
};
function handleExitClick(event, self) {
  self.exit();
  event.preventDefault();
}
function handleClickout(event, self) {
  self.clickout();
}
function addEventListeners(self) {
  var closeIcon = self.shadow.querySelector('.js_smartbanner__exit');
  closeIcon.addEventListener('click', function (event) {
    return handleExitClick(event, self);
  });
  var button = self.shadow.querySelector('.js_smartbanner__button');
  button.addEventListener('click', function (event) {
    return handleClickout(event, self);
  });
}
function restoreContentPosition() {
  var wrappers = _detector["default"].wrapperElement();
  for (var i = 0, l = wrappers.length, wrapper; i < l; i++) {
    wrapper = wrappers[i];
    if (_detector["default"].jQueryMobilePage() && wrapper.getAttribute(datas.originalTop)) {
      wrapper.style.top = wrapper.getAttribute(datas.originalTop) + 'px';
    } else if (wrapper.getAttribute(datas.originalMarginTop)) {
      wrapper.style.marginTop = wrapper.getAttribute(datas.originalMarginTop) + 'px';
    }
  }
}
var SmartBanner = exports["default"] = /*#__PURE__*/function () {
  function SmartBanner() {
    _classCallCheck(this, SmartBanner);
    var parser = new _optionparser["default"]();
    this.options = parser.parse();
    this.platform = _detector["default"].platform();
    var event = new Event('smartbanner.init');
    document.dispatchEvent(event);
  }

  // DEPRECATED. Will be removed.
  return _createClass(SmartBanner, [{
    key: "originalTop",
    get: function get() {
      var wrapper = _detector["default"].wrapperElement()[0];
      return parseFloat(wrapper.getAttribute(datas.originalTop));
    }

    // DEPRECATED. Will be removed.
  }, {
    key: "originalTopMargin",
    get: function get() {
      var wrapper = _detector["default"].wrapperElement()[0];
      return parseFloat(wrapper.getAttribute(datas.originalMarginTop));
    }
  }, {
    key: "priceSuffix",
    get: function get() {
      if (this.platform === 'ios' && this.options.priceSuffixApple) {
        return this.options.priceSuffixApple;
      } else if (this.platform === 'android' && this.options.priceSuffixGoogle) {
        return this.options.priceSuffixGoogle;
      }
      return '';
    }
  }, {
    key: "price",
    get: function get() {
      if (this.options.price && this.options.price !== '') {
        return this.options.price;
      } else {
        return '';
      }
    }
  }, {
    key: "icon",
    get: function get() {
      if (this.platform === 'android') {
        return this.options.iconGoogle;
      } else {
        return this.options.iconApple;
      }
    }
  }, {
    key: "buttonUrl",
    get: function get() {
      if (this.platform === 'android') {
        return this.options.buttonUrlGoogle;
      } else if (this.platform === 'ios') {
        return this.options.buttonUrlApple;
      }
      return '#';
    }
  }, {
    key: "closeLabel",
    get: function get() {
      return this.options.closeLabel !== undefined ? this.options.closeLabel : DEFAULT_CLOSE_LABEL;
    }
  }, {
    key: "buttonLabel",
    get: function get() {
      var buttonLabel = this.options.button;
      if (this.platform === 'android' && this.options.buttonGoogle) {
        buttonLabel = this.options.buttonGoogle;
      } else if (this.platform === 'ios' && this.options.buttonApple) {
        buttonLabel = this.options.buttonApple;
      }
      return buttonLabel || DEFAULT_BUTTON_LABEL;
    }
  }, {
    key: "html",
    get: function get() {
      var modifier = !this.options.customDesignModifier ? this.platform : this.options.customDesignModifier;
      var position = this.options.position || 'top';
      return "<div class=\"smartbanner smartbanner--".concat(position, " smartbanner--").concat(modifier, "\">\n      <span class=\"smartbanner__exit js_smartbanner__exit\" aria-label=\"").concat(this.closeLabel, "\"></span>\n      <div class=\"smartbanner__icon\" style=\"background-image: url(").concat(this.icon, ");\"></div>\n      <div class=\"smartbanner__info\">\n        <div>\n          <div class=\"smartbanner__info__title\">").concat(this.options.title, "</div>\n          <div class=\"smartbanner__info__author\">").concat(this.options.author, "</div>\n          <div class=\"smartbanner__info__price\">").concat(this.price).concat(this.priceSuffix, "</div>\n        </div>\n      </div>\n      <a href=\"").concat(this.buttonUrl, "\" target=\"_blank\" class=\"smartbanner__button js_smartbanner__button\" rel=\"noopener\" aria-label=\"").concat(this.buttonLabel, "\"><span class=\"smartbanner__button__label\">").concat(this.buttonLabel, "</span></a>\n    </div>");
    }
  }, {
    key: "height",
    get: function get() {
      try {
        return document.querySelector('.js_smartbanner').offsetHeight;
      } catch (error) {
        return 0;
      }
    }
  }, {
    key: "platformEnabled",
    get: function get() {
      var enabledPlatforms = this.options.enabledPlatforms || DEFAULT_PLATFORMS;
      return enabledPlatforms && enabledPlatforms.replace(/\s+/g, '').split(',').indexOf(this.platform) !== -1;
    }
  }, {
    key: "positioningDisabled",
    get: function get() {
      return this.options.disablePositioning === 'true';
    }
  }, {
    key: "apiEnabled",
    get: function get() {
      return this.options.api === 'true' || this.options.api === 'yes';
    }
  }, {
    key: "userAgentExcluded",
    get: function get() {
      if (!this.options.excludeUserAgentRegex) {
        return false;
      }
      return _detector["default"].userAgentMatchesRegex(this.options.excludeUserAgentRegex);
    }
  }, {
    key: "userAgentIncluded",
    get: function get() {
      if (!this.options.includeUserAgentRegex) {
        return false;
      }
      return _detector["default"].userAgentMatchesRegex(this.options.includeUserAgentRegex);
    }
  }, {
    key: "hideTtl",
    get: function get() {
      return this.options.hideTtl ? parseInt(this.options.hideTtl) : false;
    }
  }, {
    key: "hidePath",
    get: function get() {
      return this.options.hidePath ? this.options.hidePath : '/';
    }
  }, {
    key: "publish",
    value: function publish() {
      if (Object.keys(this.options).length === 0) {
        throw new Error('No options detected. Please consult documentation.');
      }
      if (_bakery["default"].baked) {
        return false;
      }

      // User Agent was explicetely excluded by defined excludeUserAgentRegex
      if (this.userAgentExcluded) {
        return false;
      }

      // User agent was neither included by platformEnabled,
      // nor by defined includeUserAgentRegex
      if (!(this.platformEnabled || this.userAgentIncluded)) {
        return false;
      }
      var host = document.createElement('div');
      host.classList.add('js_smartbanner');
      document.body.prepend(host);
      this.shadow = host.attachShadow({
        mode: 'open'
      });
      var style = document.createElement('style');
      style.textContent = _smartbannerStyles["default"];
      this.shadow.appendChild(style);
      var template = document.createElement('template');
      template.innerHTML = this.html;
      this.shadow.appendChild(template.content);
      var event = new Event('smartbanner.view');
      document.dispatchEvent(event);
      addEventListeners(this);
    }
  }, {
    key: "exit",
    value: function exit() {
      var host = document.querySelector('.js_smartbanner');
      host.remove();
      this.shadow = null;
      var event = new Event('smartbanner.exit');
      document.dispatchEvent(event);
      _bakery["default"].bake(this.hideTtl, this.hidePath);
    }
  }, {
    key: "clickout",
    value: function clickout() {
      var event = new Event('smartbanner.clickout');
      document.dispatchEvent(event);
    }
  }]);
}();

},{"./bakery.js":1,"./detector.js":2,"./optionparser.js":4,"./smartbanner-styles.js":5}]},{},[3]);
