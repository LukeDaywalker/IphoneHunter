/**
 * Created by LukeSkywalker on 2017/10/17.
 */
chrome.webRequest.onBeforeRequest.addListener(function(details) {
        console.log(details);
        return {};
    },{urls: ["*://*.apple.com/*"]},["blocking"]
);