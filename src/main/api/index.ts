import { ipcMain } from "electron";
import { TypeBaseConfig } from "../types";
import { ReadFileBynari, WriteFileBynari } from "./utils";
import { existsSync } from "node:fs";
import { Routes } from "../constants";

export default function API_Initializer() {
    // Ipc Events
    ipcMain.on("SettingsChecker", (_event) => {
        _event.returnValue = existsSync(Routes.Bin)
    })
    ipcMain.on("SettingsReceiver", (_event) => {
        ReadFileBynari(
            Routes.Settings,
            (responce: any) => {
                _event.returnValue = responce
            }
        )
    })
    ipcMain.on("SettingsSender", (_event, { _data }: { _data: TypeBaseConfig }) => {
        WriteFileBynari(
            Routes.Settings,
            _data,
            (responce) => {
                _event.returnValue = responce
            }
        )
    })
    ipcMain.on('ModelsReceiver', async _event => {
        ReadFileBynari(
            Routes.Avatars,
            (responce: any) => {
                _event.returnValue = responce
            }
        )
    })
}