function btnFillListener() {
    /*分隔符*/
    var splits = document.getElementsByName("split");
    var seperate = '|';
    for (var i = 0; i < splits.length; i++) {
        if (splits[i].checked) {
            seperate = splits[i].value;
            break;
        }
    }
    /*所有字段id,id之间以分隔符分隔*/
    var names = document.getElementById("names").value;
    /*所有字段value,value之间以分隔符分隔*/
    var values = document.getElementById("values").value;
    /*将param对象发送到handle.js*/
    var param = {"seperate": seperate, "names": names, "values": values};
    chrome.tabs.executeScript(null, {
        code: "var param=" + JSON.stringify(param) + ";"
    }, function () {
        chrome.tabs.executeScript(null, {
            file: "handle.js"
        });
    });
    // chrome.tabs.getSelected(function (tabs) {
    //     console.log("当前的标签是:", tabs);
    // });
}
document.addEventListener('DOMContentLoaded', function () {
    document.getElementById("btnFill").addEventListener('click', btnFillListener);
});
