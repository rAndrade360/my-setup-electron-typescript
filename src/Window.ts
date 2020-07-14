import { BrowserWindow } from 'electron';
import * as path from 'path';

const defaultOptions = {
  height: 600,
  webPreferences: {
    nodeIntegration: true,
    preload: path.join(__dirname, "preload.js"),
  },
  width: 800,
}
interface Config {
  file: string,
  parent?: BrowserWindow,
  height?: number,
  width?: number 
}

class Window extends BrowserWindow {
  constructor({file, ...windowSettings}: Config){
    super({...defaultOptions, ...windowSettings});
    this.onShow(file);
  }
  onShow(file){
    this.loadFile(file);
    this.webContents.openDevTools();
    this.once('ready-to-show', () => {
      this.show()
    })
  }
}

export default Window;