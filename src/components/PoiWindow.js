import { createApp } from "vue";
import PoiWindow from './PoiWindow.vue'

function createPoiWindow(poiDetail, image, cb) {
    const instance = createApp(PoiWindow, {
        poiDetail,
        image,
        cb
    })

    const node = document.createElement('div');
    instance.mount(node);

    return node;
}

export default createPoiWindow;