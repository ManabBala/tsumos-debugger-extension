try {
  console.log("Edit 'pages/devtools/src/index.ts' and save to reload.");
  chrome.devtools.panels.create('Tsumos Debugger', '/icon-34.png', '/devtools-panel/index.html');
} catch (e) {
  console.error(e);
}
