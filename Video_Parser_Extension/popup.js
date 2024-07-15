document.addEventListener("DOMContentLoaded", () => {
  chrome.storage.sync.get("parsers", (data) => {
    const parsers = data.parsers || [];
    const parserButtonsDiv = document.getElementById("parserButtons");

    parsers.forEach((parser, index) => {
      const button = document.createElement("button");
      button.className = "parser-button";
      button.textContent = `播放 ${index + 1}`;
      button.addEventListener("click", () => {
        chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
          const activeTab = tabs[0];
          const currentUrl = activeTab.url;
          const newUrl = `${parser}${currentUrl}`;

          chrome.tabs.create({ url: newUrl });
        });
      });
      parserButtonsDiv.appendChild(button);
    });
  });
});
