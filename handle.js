// var seperate = param.seperate;
// var names = param.names.split(seperate);
// var values = param.values.split(seperate);
// if (names.length == values.length) {
//     for (var i = 0; i < names.length; i++) {
//         var element = document.getElementById(names[i]);
//         if (element) {
//             // var e = document.createEvent('MouseEvent');
//             // e.initEvent('click', false, false);
//             // element.dispatchEvent(e);
//             element.value = values[i];
//         }
//     }
// } else {
//     console.log('data err');
//
// }


//登录苹果账号
// document.getElementById("login-appleId").value="*****@***.com";
// document.getElementById("login-password").value="";
// document.getElementById("sign-in").click();

// document.getElementById("cart-continue-button").click();

document.getElementById("shipping-user-lastName").value = "陈";
document.getElementById("shipping-user-firstName").value = "达到";
document.getElementById("shipping-user-daytimePhoneAreaCode").value = "0";
document.getElementById("shipping-user-daytimePhone").value = "186********";
document.getElementById("shipping-user-street").value = "踏踏路91号订单中心";
document.getElementById("shipping-user-street2").value = "H座300层";
document.getElementById("shipping-user-postalCode").value = "100044";
document.getElementById("shipping-user-emailAddress").value = "*****@***.com";
document.getElementById("shipping-user-mobilePhone").value = "186********";


selectAddres(document.getElementById("shipping-user-state"), "shanghai");
var city = document.getElementById("shipping-user-city");
addPorpertyListenr(city, selectAddres(city, "shanghai"));

var district = document.getElementById("shipping-user-district");
addPorpertyListenr(district, selectAddres(district, "pudongxinqu"));

document.getElementById("shipping-user-state").onChange
function selectAddres(element, address) {

    for (i = 0; i < element.options.length; i++) {

        var curOptObj = element.options[i];

        var curText = curOptObj.text;

        if (address == curText) {

            curOptObj.selected = true;

        }

    }
}
function addPorpertyListenr(element, fn) {
    element.addEventListener("onporpertychange", fn);
}