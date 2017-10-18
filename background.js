/**
 * Created by LukeSkywalker on 2017/10/17.
 */
var secureIndex = 1;
var firstUrl;
chrome.webRequest.onBeforeRequest.addListener(function (details) {
        if ("image" == details.type
            || "font" == details.type) {
            // console.log("image/font:" + details.url);
            return {cancel: true};
        }
        if (details.url.endsWith("product=MQA82CH/A &step=attach#") || details.url.endsWith("product=MQ8G2CH/A&step=attach#")) {
            console.log(details.url);
            // return {cancel:true};
            // return {redirectUrl: "https://www.apple.com/cn/shop/bag/"};
            return {redirectUrl: "https://secure" + secureIndex + ".store.apple.com/cn/shop/checkout/start"};
            // return {redirectUrl: "https://www.apple.com/cn/shop/bagx/checkout_now?_a=checkout&_m=shoppingCart"};
        } else {
            console.log(details);
            return {};
        }
    }, {urls: ["*://*.apple.com/*"]}, ["blocking"]
);
chrome.webRequest.onCompleted.addListener(function (details) {
    // 请求完毕，返回的相关数据，都在details中
    // 拿到数据后，可以通过chrome.extension.sendMessage({msg:"getNetworkResource", data:details});将数据通知popup.html
    if ("https://secure" + secureIndex + ".store.apple.com/cn/shop/checkoutx/billing" == details.url) {
        // if (details.url.match(/https:\/\/secure\d.store.apple.com\/cn\/shop\/checkoutx\/billing/)) {
        console.log(details.url);
        console.log(details);
        chrome.tabs.executeScript(details.tabId, {
            file: "payment.js"
        }, function () {
        });
    } else if (details.url.startsWith("https://secure" + secureIndex + ".store.apple.com/cn/shop/checkoutx")) {
        chrome.tabs.get(details.tabId, function (tab) {
            if ("https://secure" + secureIndex + ".store.apple.com/cn/shop/checkout#terms-box" == tab.url) {
                // if (tab.url.match(/https:\/\/secure\d.store.apple.com\/cn\/shop\/checkout#terms-box/)) {
                console.log(tab.url);
                chrome.tabs.executeScript(tab.id, {
                    file: "termsretry.js"
                }, function () {
                });
            }
        });
    } else if (firstUrl != null && decodeURI(details.url) == firstUrl) {
        console.log(firstUrl);
        setTimeout(function () {
            chrome.tabs.get(details.tabId, function (tab) {
                if (decodeURI(tab.url) == firstUrl) {
                    console.log(firstUrl);
                    chrome.tabs.reload(tab.id, {bypassCache: true}, function () {

                    });
                }
            });
        }, 100);
    }
}, {urls: ["*://*.apple.com/*"]}/*, ["responseHeaders"]*/);
chrome.tabs.onUpdated.addListener(function (tabId, changeInfo, tab) {
    if ("complete" == changeInfo.status) {
        // if (tab.url.startsWith("https://secure1.store.apple.com/cn/shop/sign_in")) {
        var login = tab.url.match(/https:\/\/secure(\d).store.apple.com\/cn\/shop\/sign_in/);
        if (login) {
            secureIndex = login[1];
            console.log("secureIndex:" + secureIndex);
            chrome.tabs.executeScript(tabId, {
                file: "login.js"
            }, function () {
            });
        } else if ("https://www.apple.com/cn/shop/bag" == tab.url) {
            console.log(tab.url);
            chrome.tabs.executeScript(tabId, {
                code: 'document.getElementById("cart-actions-checkout").click()'
            }, function () {
            });
        } else if ("https://secure" + secureIndex + ".store.apple.com/cn/shop/checkout" == tab.url) {
            // } else if (tab.url.match(/https:\/\/secure\d.store.apple.com\/cn\/shop\/checkout/)) {
            console.log(tab.url);
            chrome.tabs.executeScript(tabId, {
                code: 'document.getElementById("cart-continue-button").click()'
            }, function () {
            });
        } else if ("https://secure" + secureIndex + ".store.apple.com/cn/shop/checkout#shipping-box" == tab.url) {
            // } else if (tab.url.match(/https:\/\/secure\d.store.apple.com\/cn\/shop\/checkout#shipping-box/)) {
            console.log(tab.url);
            chrome.tabs.executeScript(tabId, {
                code: 'document.getElementById("shipping-continue-button").click()'
            }, function () {
            });
        } else if ("https://secure" + secureIndex + ".store.apple.com/cn/shop/checkout#payment-box" == tab.url) {
            // } else if (tab.url.match(/https:\/\/secure\d.store.apple.com\/cn\/shop\/checkout#payment-box/)) {
            console.log(tab.url);
            chrome.tabs.executeScript(tabId, {
                code: 'document.getElementById("payment-form-options-0000791680-1").click()'
            }, function () {
            });
        } else if ("https://secure" + secureIndex + ".store.apple.com/cn/shop/checkout#invoice-box" == tab.url) {
            // } else if (tab.url.match(/https:\/\/secure\d.store.apple.com\/cn\/shop\/checkout#invoice-box/)) {
            console.log(tab.url);
            chrome.tabs.executeScript(tabId, {
                code: 'document.getElementById("invoice-next-step").click()'
            }, function () {
            });
        } else if ("https://secure" + secureIndex + ".store.apple.com/cn/shop/checkout#terms-box" == tab.url) {
            // } else if (tab.url.match(/https:\/\/secure\d.store.apple.com\/cn\/shop\/checkout#terms-box/)) {
            console.log(tab.url);
            chrome.tabs.executeScript(tabId, {
                file: "terms.js"
            }, function () {
            });
        } else if ("https://secure" + secureIndex + ".store.apple.com/cn/shop/checkout#terms" == tab.url) {
            // } else if (tab.url.match(/https:\/\/secure\d.store.apple.com\/cn\/shop\/checkout#terms/)) {
            console.log(tab.url);
            chrome.tabs.executeScript(tabId, {
                code: 'document.getElementById("place-order-button").click()'
            }, function () {
            });
        } else if ("https://secure" + secureIndex + ".store.apple.com/cn/shop/checkout/thankyou" == tab.url) {
            // } else if (tab.url.match(/https:\/\/secure\d.store.apple.com\/cn\/shop\/checkout\/thankyou/)) {
            console.log(tab.url);
            chrome.tabs.executeScript(tabId, {
                code: 'document.getElementById("payNow").click()'
            }, function () {
            });
        } else if ("https://netpay.cmbchina.com/cdpay/cdpay.dll?cdpay" == tab.url) {
            console.log(tab.url);
            chrome.tabs.executeScript(tabId, {
                file: "cmb.js"
            }, function () {
            });
        }
    }
});


function addPhoneToCart(phoneType, screenSize, product, dimensionScreenSize, callback) {
    firstUrl = "https://www.apple.com/cn/shop/buy-iphone/" + phoneType + "/" + screenSize + "-英寸显示屏-256gb-深空灰色?product=" + product + "&purchaseOption=fullPrice&step=select&complete=true&dimensionCapacity=256gb&dimensionColor=space_gray&dimensionScreensize=" + dimensionScreenSize + "inch&add-to-cart=add-to-cart#";
    chrome.tabs.create({url: firstUrl},
        callback);
}
function addIphoneXToCart() {
    var phoneType = "iphone-x";
    var screenSize = "5.8";
    var product = "MQA82CH/A";
    var dimensionScreenSize = "5_8";
    addPhoneToCart(phoneType, screenSize, product, dimensionScreenSize, function (tab) {
        console.log(tab);
    });

}
function addIphone8ToCart() {
    var phoneType = "iphone-8";
    var screenSize = "5.5";
    var product = "MQ8G2CH/A";
    var dimensionScreenSize = "5_5";
    addPhoneToCart(phoneType, screenSize, product, dimensionScreenSize, function (tab) {
        console.log(tab);
    });

}
function addToCart() {
    addIphone8ToCart();
    // addIphoneXToCart();
}


chrome.browserAction.onClicked.addListener(function () {
    addToCart();
});