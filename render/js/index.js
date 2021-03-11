const path = require('path');

window.onload = function () {
    initWidget({
        waifuPath: path.join(__dirname, "render/resource/waifu-tips.json"),
        apiPath: "https://live2d.fghrsh.net/api/",
        callback() {
            const waifuToggle = document.getElementById("waifu-toggle");
            mouseMoveFade();
            document.querySelector("#waifu-tool > span.fa.fa-lg.fa-times").onclick = function () {
                const timer = setTimeout(() => {
                    waifuToggle.click();
                    window.close();
                    clearTimeout(timer);
                }, 2000);
            }
        }
    });
}

function mouseMoveFade(timeout = 3000) {
    const waifuTool = document.getElementById("waifu-tool");
    let timer = null;

    window.addEventListener('mousemove', () => {
        waifuTool.setAttribute('class', '');
        if (timer != null)
            clearTimeout(timer);
        timer = setTimeout(() => {
            waifuTool.setAttribute('class', 'waifu-tool-hidden');
            clearTimeout(timer);
        }, timeout);
    });
}