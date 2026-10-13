import SmartBanner from './smartbanner.js';

let smartbanner;

function init() {
  smartbanner = new SmartBanner();
  if (smartbanner.apiEnabled) {
    window.smartbanner = smartbanner;
  } else {
    smartbanner.publish();
  }
}

// A script added after load (by a consent manager or a tag manager, say) would wait forever.
if (document.readyState === 'complete') {
  init();
} else {
  window.addEventListener('load', init);
}
