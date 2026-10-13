/*!
 * smartbanner.js v1.30.0 <https://github.com/easy-connect-io/smartbanner.js#readme>
 * Copyright © 2026 Ain Tohvri, contributors. Licensed under GPL-3.0.
 */
(() => {
  // src/bakery.js
  var Bakery = class _Bakery {
    static getCookieExpiresString(hideTtl) {
      const now = /* @__PURE__ */ new Date();
      const expireTime = new Date(now.getTime() + hideTtl);
      return `expires=${expireTime.toGMTString()};`;
    }
    static bake(hideTtl, hidePath) {
      document.cookie = `smartbanner_exited=1; ${hideTtl ? _Bakery.getCookieExpiresString(hideTtl) : ""} path=${hidePath}`;
    }
    static unbake() {
      document.cookie = "smartbanner_exited=; expires=Thu, 01 Jan 1970 00:00:01 GMT;";
    }
    static get baked() {
      let value = document.cookie.replace(/(?:(?:^|.*;\s*)smartbanner_exited\s*=\s*([^;]*).*$)|^.*$/, "$1");
      return value === "1";
    }
  };

  // src/detector.js
  var Detector = class _Detector {
    static platform() {
      let maxTouchPoints = window.navigator.maxTouchPoints;
      let userAgent = window.navigator.userAgent;
      if (/Android/i.test(userAgent)) {
        return "android";
      } else if (!window.MSStream && !/X11|Linux|Windows/i.test(userAgent) && maxTouchPoints && maxTouchPoints > 0 || /iPhone|iPad|iPod/i.test(userAgent)) {
        return "ios";
      }
    }
    static userAgentMatchesRegex(regexString) {
      return new RegExp(regexString).test(window.navigator.userAgent);
    }
    static jQueryMobilePage() {
      return typeof window.$ !== "undefined" && typeof window.$.mobile !== "undefined" && document.querySelector(".ui-page") !== null;
    }
    static wrapperElement() {
      let selector = _Detector.jQueryMobilePage() ? ".ui-page" : "html";
      return document.querySelectorAll(selector);
    }
  };

  // src/optionparser.js
  function valid(name) {
    return name.indexOf("smartbanner:") !== -1 && name.split(":")[1].length > 0;
  }
  function convertToCamelCase(name) {
    let parts = name.split("-");
    parts.map(function(part, index) {
      if (index > 0) {
        parts[index] = part.charAt(0).toUpperCase() + part.substring(1);
      }
    });
    return parts.join("");
  }
  var OptionParser = class {
    parse() {
      let metas = document.getElementsByTagName("meta");
      let options = {};
      Array.apply(null, metas).forEach(function(meta) {
        let optionName = null;
        let name = meta.getAttribute("name");
        let content = meta.getAttribute("content");
        if (name && content && valid(name) && content.length > 0) {
          optionName = name.split(":")[1];
          if (optionName.indexOf("-") !== -1) {
            optionName = convertToCamelCase(optionName);
          }
          options[optionName] = content;
        }
      });
      return options;
    }
  };

  // src/smartbanner-styles.js
  var smartbanner_styles_default = ':host{all:initial !important}.smartbanner{left:0;z-index:9999}.smartbanner.smartbanner--top{position:relative}.smartbanner.smartbanner--top-absolute{position:absolute;top:0}.smartbanner.smartbanner--bottom{position:fixed;bottom:0}.smartbanner{overflow-x:hidden;width:100%;height:84px;background:#f3f3f3;font-family:Helvetica,sans,sans-serif}.smartbanner__exit{position:absolute;top:calc(50% - 6px);left:9px;display:block;margin:0;width:12px;height:12px;border:0;text-align:center}.smartbanner__exit::before,.smartbanner__exit::after{position:absolute;width:1px;height:12px;background:#716f6f;content:" "}.smartbanner__exit::before{transform:rotate(45deg)}.smartbanner__exit::after{transform:rotate(-45deg)}.smartbanner__icon{position:absolute;top:10px;left:30px;width:64px;height:64px;border-radius:15px;background-size:64px 64px}.smartbanner__info{position:absolute;top:10px;left:104px;display:flex;overflow-y:hidden;width:60%;height:64px;align-items:center;color:#000}.smartbanner__info__title{font-size:14px}.smartbanner__info__author,.smartbanner__info__price{font-size:12px;width:85%}@media screen and (min-width: 500px){.smartbanner__info__author,.smartbanner__info__price{width:100%}}.smartbanner__button{position:absolute;top:32px;right:10px;z-index:1;display:block;padding:0 10px;min-width:10%;border-radius:5px;background:#f3f3f3;color:#1474fc;font-size:18px;text-align:center;text-decoration:none}.smartbanner__button__label{text-align:center}.smartbanner.smartbanner--android{background:#3d3d3d url("data:image/gif;base64,R0lGODlhCAAIAIABAFVVVf///yH5BAEHAAEALAAAAAAIAAgAAAINRG4XudroGJBRsYcxKAA7");box-shadow:inset 0 4px 0 #88b131}.smartbanner.smartbanner--android .smartbanner__exit{left:6px;margin-right:7px;width:17px;height:17px;border-radius:14px;background:#1c1e21;box-shadow:0 1px 2px rgba(0,0,0,.8) inset,0 1px 1px rgba(255,255,255,.3);color:#b1b1b3;font-family:"ArialRoundedMTBold",Arial;font-size:20px;line-height:17px;text-shadow:0 1px 1px #000}.smartbanner.smartbanner--android .smartbanner__exit::before,.smartbanner.smartbanner--android .smartbanner__exit::after{top:3px;left:8px;width:2px;height:11px;background:#b1b1b3}.smartbanner.smartbanner--android .smartbanner__exit:active,.smartbanner.smartbanner--android .smartbanner__exit:hover{color:#eee}.smartbanner.smartbanner--android .smartbanner__icon{background-color:rgba(0,0,0,0);box-shadow:none}.smartbanner.smartbanner--android .smartbanner__info{color:#ccc;text-shadow:0 1px 2px #000}.smartbanner.smartbanner--android .smartbanner__info__title{color:#fff;font-weight:bold}.smartbanner.smartbanner--android .smartbanner__button{top:30px;right:20px;padding:0;min-width:12%;border-radius:0;background:none;box-shadow:0 0 0 1px #333,0 0 0 2px #dddcdc;color:#d1d1d1;font-size:14px;font-weight:bold}.smartbanner.smartbanner--android .smartbanner__button:active,.smartbanner.smartbanner--android .smartbanner__button:hover{background:none}.smartbanner.smartbanner--android .smartbanner__button__label{display:block;padding:0 10px;background:#42b6c9;background:linear-gradient(to bottom, #42b6c9, #39a9bb);box-shadow:none;line-height:24px;text-align:center;text-shadow:none;text-transform:none}.smartbanner.smartbanner--android .smartbanner__button__label:active,.smartbanner.smartbanner--android .smartbanner__button__label:hover{background:#2ac7e1}';

  // src/smartbanner.js
  var DEFAULT_PLATFORMS = "android,ios";
  var DEFAULT_CLOSE_LABEL = "Close";
  var DEFAULT_BUTTON_LABEL = "View";
  var datas = {
    originalTop: "data-smartbanner-original-top",
    originalMarginTop: "data-smartbanner-original-margin-top"
  };
  function handleExitClick(event, self) {
    self.exit();
    event.preventDefault();
  }
  function handleClickout(event, self) {
    self.clickout();
  }
  function addEventListeners(self) {
    let closeIcon = self.shadow.querySelector(".js_smartbanner__exit");
    closeIcon.addEventListener("click", (event) => handleExitClick(event, self));
    let button = self.shadow.querySelector(".js_smartbanner__button");
    button.addEventListener("click", (event) => handleClickout(event, self));
  }
  var SmartBanner = class {
    constructor() {
      let parser = new OptionParser();
      this.options = parser.parse();
      this.platform = Detector.platform();
      let event = new Event("smartbanner.init");
      document.dispatchEvent(event);
    }
    // DEPRECATED. Will be removed.
    get originalTop() {
      let wrapper = Detector.wrapperElement()[0];
      return parseFloat(wrapper.getAttribute(datas.originalTop));
    }
    // DEPRECATED. Will be removed.
    get originalTopMargin() {
      let wrapper = Detector.wrapperElement()[0];
      return parseFloat(wrapper.getAttribute(datas.originalMarginTop));
    }
    get priceSuffix() {
      if (this.platform === "ios" && this.options.priceSuffixApple) {
        return this.options.priceSuffixApple;
      } else if (this.platform === "android" && this.options.priceSuffixGoogle) {
        return this.options.priceSuffixGoogle;
      }
      return "";
    }
    get price() {
      if (this.options.price && this.options.price !== "") {
        return this.options.price;
      } else {
        return "";
      }
    }
    get icon() {
      if (this.platform === "android") {
        return this.options.iconGoogle;
      } else {
        return this.options.iconApple;
      }
    }
    get buttonUrl() {
      if (this.platform === "android") {
        return this.options.buttonUrlGoogle;
      } else if (this.platform === "ios") {
        return this.options.buttonUrlApple;
      }
      return "#";
    }
    get closeLabel() {
      return this.options.closeLabel !== void 0 ? this.options.closeLabel : DEFAULT_CLOSE_LABEL;
    }
    get buttonLabel() {
      let buttonLabel = this.options.button;
      if (this.platform === "android" && this.options.buttonGoogle) {
        buttonLabel = this.options.buttonGoogle;
      } else if (this.platform === "ios" && this.options.buttonApple) {
        buttonLabel = this.options.buttonApple;
      }
      return buttonLabel || DEFAULT_BUTTON_LABEL;
    }
    get html() {
      let modifier = !this.options.customDesignModifier ? this.platform : this.options.customDesignModifier;
      let position = this.options.position || "top";
      return `<div class="smartbanner smartbanner--${position} smartbanner--${modifier}">
      <a href="#" class="smartbanner__exit js_smartbanner__exit" title="${this.closeLabel}" rel="nofollow"></a>
      <div class="smartbanner__icon" style="background-image: url(${this.icon});"></div>
      <div class="smartbanner__info">
        <div>
          <div class="smartbanner__info__title">${this.options.title}</div>
          <div class="smartbanner__info__author">${this.options.author}</div>
          <div class="smartbanner__info__price">${this.price}${this.priceSuffix}</div>
        </div>
      </div>
      <a href="${this.buttonUrl}" target="_blank" class="smartbanner__button js_smartbanner__button" rel="noopener" aria-label="${this.buttonLabel}"><span class="smartbanner__button__label">${this.buttonLabel}</span></a>
    </div>`;
    }
    get height() {
      try {
        return document.querySelector(".js_smartbanner").offsetHeight;
      } catch (error) {
        return 0;
      }
    }
    get platformEnabled() {
      let enabledPlatforms = this.options.enabledPlatforms || DEFAULT_PLATFORMS;
      return enabledPlatforms && enabledPlatforms.replace(/\s+/g, "").split(",").indexOf(this.platform) !== -1;
    }
    get positioningDisabled() {
      return this.options.disablePositioning === "true";
    }
    get apiEnabled() {
      return this.options.api === "true" || this.options.api === "yes";
    }
    get userAgentExcluded() {
      if (!this.options.excludeUserAgentRegex) {
        return false;
      }
      return Detector.userAgentMatchesRegex(this.options.excludeUserAgentRegex);
    }
    get userAgentIncluded() {
      if (!this.options.includeUserAgentRegex) {
        return false;
      }
      return Detector.userAgentMatchesRegex(this.options.includeUserAgentRegex);
    }
    get hideTtl() {
      return this.options.hideTtl ? parseInt(this.options.hideTtl) : false;
    }
    get hidePath() {
      return this.options.hidePath ? this.options.hidePath : "/";
    }
    publish() {
      if (Object.keys(this.options).length === 0) {
        throw new Error("No options detected. Please consult documentation.");
      }
      if (Bakery.baked) {
        return false;
      }
      if (this.userAgentExcluded) {
        return false;
      }
      if (!(this.platformEnabled || this.userAgentIncluded)) {
        return false;
      }
      let host = document.createElement("div");
      host.classList.add("js_smartbanner");
      document.body.prepend(host);
      this.shadow = host.attachShadow({ mode: "open" });
      let style = document.createElement("style");
      style.textContent = smartbanner_styles_default;
      this.shadow.appendChild(style);
      let template = document.createElement("template");
      template.innerHTML = this.html;
      this.shadow.appendChild(template.content);
      let event = new Event("smartbanner.view");
      document.dispatchEvent(event);
      addEventListeners(this);
    }
    exit() {
      let host = document.querySelector(".js_smartbanner");
      host.remove();
      this.shadow = null;
      let event = new Event("smartbanner.exit");
      document.dispatchEvent(event);
      Bakery.bake(this.hideTtl, this.hidePath);
    }
    clickout() {
      let event = new Event("smartbanner.clickout");
      document.dispatchEvent(event);
    }
  };

  // src/index.js
  var smartbanner;
  function init() {
    smartbanner = new SmartBanner();
    if (smartbanner.apiEnabled) {
      window.smartbanner = smartbanner;
    } else {
      smartbanner.publish();
    }
  }
  if (document.readyState === "complete") {
    init();
  } else {
    window.addEventListener("load", init);
  }
})();
