/**
 * Created by LukeSkywalker on 2017/10/18.
 */

function retry() {
    var button = document.getElementById("place-order-button");
    if (button == null) {
        setTimeout(function () {
            retry();
        }, 100);
    } else {
        button.click()
    }
}
retry();