
import { Launch } from "@lightningjs/sdk";
import { MainApp } from "./comp/MainApp";

const options = {
    stage: {
        w: 1920,
        h: 1080,
        precision: 1,
    }
}

const config = {
	"appSettings": {
		"stage": {
			"clearColor": "0xFF000000",
			"useImageWorker": true,
			"w": 1920,
			"h": 1080
		},
		"debug": false,
		"keys": {
			8: "Back",
			13: "Enter",
			27: "Exit",
			37: "Left",
			38: "Up",
			39: "Right",
			40: "Down",
			10009: "Back"
		},
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