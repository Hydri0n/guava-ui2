import { createApp } from "vue";
import PoiWindow from './PoiWindow.vue'

function createPoiWindow(name, detail, image) {
    const instance = createApp(PoiWindow, {
        name,
        detail,
        image
    })

    const node = document.createElement('div');
    instance.mount(node);

    return node;
}

export default createPoiWindow;