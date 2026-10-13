# smartbanner.js [![Build Status](https://github.com/easy-connect-io/smartbanner.js/actions/workflows/build.yml/badge.svg)](https://github.com/easy-connect-io/smartbanner.js/actions/workflows/build.yml)
Customisable and lightweight smart app banner for iOS and Android.

![smartbanner.js iOS screenshot](screenshot-ios.png) &nbsp; ![smartbanner.js Android screenshot](screenshot-android.png)

## easy-connect fork

This is easy-connect's fork of [ain/smartbanner.js](https://github.com/ain/smartbanner.js), served to customer websites from `https://code.easy-connect.io/smartbanner/`. The rest of this README is upstream's documentation, corrected where the fork behaves differently:

- **Shadow root.** The banner renders inside a shadow root with its CSS inlined into the JS (`scripts/inline-css.js` generates `src/smartbanner-styles.js`), so the host page's styles can't reach it. Pages only need the `<script>`, no stylesheet, and the [custom design modifier](#custom-design-modifier) can only switch between the built-in iOS and Android designs.
- **[Position](#position).** `top` (the default) puts the banner at the top of `<body>`, in the page flow, so the content below moves down by its height. `top-absolute` and `bottom` place it over the content instead. The script never moves page content itself, so upstream's `disable-positioning` option does nothing.
- **Loading.** The banner initialises on the window `load` event. A `<script>` tag in the page, `async` included, works. A script that only gets added after `load`, for instance by a consent manager once the visitor accepts or by a tag manager trigger like GTM's "Window Loaded", never initialises and shows nothing, without any error.

App icons live in `icons/<saleschannel>.png` (192 px, from each app's iOS icon in ec-platform) and are served from `https://code.easy-connect.io/smartbanner/icons/<saleschannel>.png`. Snippets must use those, never the App Store or Play Store image URLs: the icon loads on every page view, so those would send every visitor's IP to Apple or Google before any consent. Apart from the icon the banner makes no requests, and its only cookie is `smartbanner_exited`, set when the visitor closes it.

To send the button to a tracked link (a Branch `app.link`, say) only once the visitor has consented, and to the plain store URLs otherwise, put the store URLs in the meta tags, turn on [API mode](#smartbanner-api-use) and swap the URLs before publishing:

```html
<meta name="smartbanner:api" content="true">
<script>
  window.addEventListener('load', function() {
    setTimeout(function() {
      if (visitorHasConsented()) { // your consent manager's check
        smartbanner.options.buttonUrlApple = 'https://<app>.app.link/<ios-link>';
        smartbanner.options.buttonUrlGoogle = 'https://<app>.app.link/<android-link>';
      }
      smartbanner.publish();
    }, 0);
  });
</script>
```

The meta tags are read once, at `load`, so changing them afterwards has no effect; set `smartbanner.options` instead. A consent given while the banner is already showing applies from the next page view.

To merge upstream: `git remote add upstream https://github.com/ain/smartbanner.js` once, then `git fetch upstream && git merge upstream/main`, then `npm run build` and commit `dist/`.

Pushing a change to `dist/smartbanner.min.{js,css}` or `icons/` to `main` deploys it to `s3://code.easy-connect.io/smartbanner/` (AWS prod1) through `.github/workflows/deploy.yml`, which you can also run by hand from the Actions tab. CI fails any PR whose committed `dist/` wasn't built from `src/` (`scripts/check-dist.sh`), and the deploy checks again before it uploads. CloudFront caches for at most 10 seconds, so a deploy is live almost immediately on every customer site. The workflow signs in to AWS as the `smartbanner-github-deploy` role, which `deploy/github-oidc-role.sh` creates once.

## Features

- Populating smartbanner is as easy as [adding meta tags](#basic-usage), no JavaScript knowledge required
- Default [Smart App Banner](https://developer.apple.com/library/ios/documentation/AppleApplications/Reference/SafariWebContent/PromotingAppswithAppBanners/PromotingAppswithAppBanners.html) like design
- Customisable info with i18n support
- Platform-specific design, or the same design on all platforms with a [custom design modifier](#custom-design-modifier)
- Close button that closes the banner and sets cookie to keep banner closed
  - for current session or [for defined time](#time-limited-close)
  - site-wide or [at a designated path](#path-designated-close)
- Platform-specific app icon and _View_ button
- User Agent specific targeting
- Pure JavaScript coming in at __9.2KB minified__ (3.2KB gzipped), CSS included
- [Events](#events) emitted for [API](#smartbanner-api-use) implementations
- ECMAScript 6 (`es2015`) source

## Basic Usage

`smartbanner.js` works automagically given following meta tags:

```html
<!-- Start SmartBanner configuration -->
<meta name="smartbanner:title" content="Smart Application">
<meta name="smartbanner:author" content="SmartBanner Contributors">
<meta name="smartbanner:price" content="FREE">
<meta name="smartbanner:price-suffix-apple" content=" - On the App Store">
<meta name="smartbanner:price-suffix-google" content=" - In Google Play">
<meta name="smartbanner:icon-apple" content="https://url/to/apple-store-icon.png">
<meta name="smartbanner:icon-google" content="https://url/to/google-play-icon.png">
<meta name="smartbanner:button" content="VIEW">
<meta name="smartbanner:button-url-apple" content="https://ios/application-url">
<meta name="smartbanner:button-url-google" content="https://android/application-url">
<meta name="smartbanner:enabled-platforms" content="android,ios">
<meta name="smartbanner:close-label" content="Close">
<!-- End SmartBanner configuration -->
```

Additionally, the script has to be included. It carries its own CSS, so no stylesheet is needed:

```html
<script async src="https://code.easy-connect.io/smartbanner/smartbanner.min.js"></script>
```

The script has to be in the page before the window `load` event fires; one added later never shows the banner.

## Advanced Usage

### Hide the smartbanner for certain User Agents

There are cases where you do not want to show the smart app banner on all Android and/or all iOS devices. For example:
* your app is available only for some Android/iOS versions
* your app is only available on iPhone, but not iPad
* your app is a web app which also shows this website, but of course should not show the smart app banner.

In this case you can define a regular expression, which matches all user agent strings that should be excluded. Just add another `meta` tag like the following:
```html
<meta name="smartbanner:exclude-user-agent-regex" content="^.*My Example Webapp$">
```
This regular expression would match any user agent string, that ends with *My Example Webapp*.

### Show the smartbanner for certain User Agents

In addition to blacklisting certain user agents using the regex explained in the previous section, you can also show smartbanner to user agents that `enabled-platforms` would leave out:
```html
<meta name="smartbanner:include-user-agent-regex" content="iPhone 7">
```

Note that `include-user-agent-regex` only adds to what `enabled-platforms` allows, it never narrows it down. To show smartbanner to matching user agents *only*, disable all platforms alongside it:

```html
<meta name="smartbanner:enabled-platforms" content="none">
<meta name="smartbanner:include-user-agent-regex" content="iPhone 7">
```

**Note:** You can define `enabled-platforms`, `exclude-user-agent-regex` and `include-user-agent-regex` at the same time. Smartbanner is shown when either `enabled-platforms` or `include-user-agent-regex` matches, unless `exclude-user-agent-regex` matches, which always takes precedence.

### Position

```html
<meta name="smartbanner:position" content="bottom">
```

| Value           | Placement                                                                                                                  |
| :-----          | :-----------                                                                                                               |
| `top` (default) | At the top of `<body>`, in the page flow: the content below moves down by the banner's height, and both scroll together. |
| `top-absolute`  | At the top of the page, over the content, and scrolls away with it.                                                        |
| `bottom`        | Fixed to the bottom of the viewport, over the content.                                                                     |

The script never moves page content itself, so upstream's `disable-positioning` option does nothing here.

### Hide the smartbanner completely

If you want to prevent smartbanner rendering in some html pages, you can add optional `meta` tag:

```html
<meta name="smartbanner:enabled-platforms" content="none">
```

### Time-limited close

By default smartbanner would not reappear for the remainder of the browser session, as closing it sets a session cookie. The `hide-ttl` option replaces that with a fixed duration. Following example would keep smartbanner closed for 10 seconds (10000 ms):

```html
<meta name="smartbanner:hide-ttl" content="10000">
```

### Path-designated close

Once closed smartbanner would stay closed site-wide. It is default behaviour, equivalent to `hide-path` being set to `/`.

Following example would keep smartbanner closed under `/shop` only (but only when user has actually closed it), meaning it would reappear elsewhere on the site:

```html
<meta name="smartbanner:hide-path" content="/shop">
```

### Custom design modifier

smartbanner uses built-in platform-specific styles (`smartbanner--ios` or `smartbanner--android`). A custom design modifier forces one of them on all platforms, e.g.:

```html
<meta name="smartbanner:custom-design-modifier" content="ios">
```

which would add `smartbanner--ios` class on wrapper regardless of actual platform. The banner renders in a shadow root, so styles defined by the page can't reach it: any value other than `android` gets the iOS design.

### Platform-specific button labels
If you want to have a different button label for each platform, you can use the following meta tags:
```html
<meta name="smartbanner:button-apple" content="Download on the App Store">
<meta name="smartbanner:button-google" content="Get it on Google Play">
```

### smartbanner API use

By default smartbanner is added to DOM automatically. You can disable it with

```html
<meta name="smartbanner:api" content="yes">
```

which also accepts `true` as value, and add smartbanner to DOM manually:

```js
window.addEventListener('load', function() {
  setTimeout(function() {
    smartbanner.publish();
  }, 0);
});
```

**Note:** `smartbanner` is exposed on `window` by the script's own `load` handler. With an `async` script the page's `load` handler can run first, and calling `smartbanner.publish()` straight from it throws a `ReferenceError`. The `setTimeout` runs it after every `load` handler.

### Events

Following events are being dispatched:

| Event                  | Description                                                     |
| :-----                 | :-----------                                                    |
| `smartbanner.init`     | Dispatched when smartbanner has been initialised                |
| `smartbanner.view`     | Dispatched when smartbanner is added to display                 |
| `smartbanner.clickout` | Dispatched when smartbanner is clicked to navigate to app store |
| `smartbanner.exit`     | Dispatched when smartbanner is closed                           |

Example handler (closes smartbanner when user clicks to navigate to app store):

```js
document.addEventListener('smartbanner.clickout', () => smartbanner.exit());
```

## Node.js Support

Node.js is only required for installing and building `smartbanner.js`, the distributed bundle itself runs in browsers.

Supported Node.js versions follow the [Node.js release schedule](https://github.com/nodejs/release#release-schedule): _Current_, _Active LTS_ and _Maintenance LTS_ lines are supported, end-of-life ones are not.

**Note:** dropping support for an end-of-life Node.js version is released as a minor version and is not considered a breaking change.

## Contributing

See [CONTRIBUTING.md](CONTRIBUTING.md).

## Sponsors

Cross-browser testing across all mobile platforms is powered by

<a href="https://www.browserstack.com" title="BrowserStack"><img src="https://raw.githubusercontent.com/ain/smartbanner.js/main/browserstack.svg" height="32px" alt="BrowserStack"></a>

## Licence

Copyright © 2016-2026 Ain Tohvri, contributors. Licenced under [GPL-3](https://raw.githubusercontent.com/ain/smartbanner.js/main/LICENSE).
