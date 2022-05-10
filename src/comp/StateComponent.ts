
import { createStateComponentClass } from "../abstract-store";
import { appStore } from "../store";
import { MainAppStore, AppState } from "../store/MainAppStore";

export const StateComponent = createStateComponentClass<AppState, MainAppStore>(appStore)
