const path = require('path');

window.onload = function () {
    initWidget({
        waifuPath: path.join(__dirname, "render/resource/waifu-tips.json"),
        apiPath: "https://live2d.fghrsh.net/api/",
        callback() {
            const waifuToggle = document.getElementById("waifu-toggle");
            const drag = document.getElementById("drag");
            mouseMoveFade(drag);
            document.querySelector("#waifu-tool > span.fa.fa-lg.fa-times").onclick = function () {
                drag.style.opacity = 0;
                const timer = setTimeout(() => {
                    waifuToggle.click();
                    window.close();
                    clearTimeout(timer);
                }, 2000);
            }
        }
    });
}

function mouseMoveFade(drag, timeout = 3000) {
    const waifuTool = document.getElementById("waifu-tool");
    let timer = null;

    window.addEventListener('mousemove', () => {
        drag.setAttribute('class', '');
        waifuTool.setAttribute('class', '');
        if (timer != null)
            clearTimeout(timer);
        timer = setTimeout(() => {
            drag.setAttribute('class', 'drag-hidden');
            waifuTool.setAttribute('class', 'waifu-tool-hidden');
            clearTimeout(timer);
        }, timeout);
    });
}