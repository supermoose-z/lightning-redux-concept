
import { MainApp } from "./comp/MainApp";

const options = {
    stage: {
        w: 1280,
        h: 720,
        precision: 1,
    }
}

async function startApp() {
    const app = new MainApp(options)
    document.body.appendChild(app.stage.getCanvas());
}

window.addEventListener('DOMContentLoaded', () => {
    startApp().catch(console.error);
});