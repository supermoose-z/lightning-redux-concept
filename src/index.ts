
import { Launch } from "@lightningjs/sdk";
import { MainApp } from "./comp/MainApp";

const options = {
    stage: {
        w: 1280,
        h: 720,
        precision: 1,
    }
}

const config = {
	"appSettings": {
		"stage": {
			"clearColor": "0xFF000000",
			"useImageWorker": true,
			"w": 1280,
			"h": 720
		},
		"debug": false
	},
	"platformSettings": {
		"path": "./",
		"log": false,
		"showVersion": false,
	}
};

async function startApp() {
    //const app = new MainApp(options)
    const app:any = Launch(MainApp, config.appSettings, config.platformSettings, {});
    document.body.appendChild(app.stage.getCanvas());
}

window.addEventListener('DOMContentLoaded', () => {
    startApp().catch(console.error);
});