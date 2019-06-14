const electron = require("electron");
const express = require("./server/app");

const { app, BrowserWindow, Menu } = electron;

let mainWindow;

app.on("ready", () => {

  express();
  
  // create new window
  
  mainWindow = new BrowserWindow({
    minWidth: 500,
    minHeight: 640,
    width: 500,
    height: 640
  });
  
  // Load UI
  mainWindow.loadURL("http://localhost:2000/");

  //Build Menu
  const menu = Menu.buildFromTemplate(template);
  Menu.setApplicationMenu(menu);

});

// Template Menu

const template = [
  {
    label: "File",
    submenu: [
      {
        label: "Exit",
        click() {
          app.quit();
        }
      }
    ]
  }
];
