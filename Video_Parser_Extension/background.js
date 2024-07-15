chrome.runtime.onInstalled.addListener(() => {
  chrome.storage.sync.set({ parsers: [] }, () => {
    console.log("默认解析接口列表已设置为空。");
  });
});

chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
  if (request.action === "parseUrl") {
    chrome.storage.sync.get("parsers", (data) => {
      const parsers = data.parsers;
      if (parsers.length > 0) {
        const newUrl = `${parsers[0]}${request.url}`;
        chrome.tabs.update(sender.tab.id, { url: newUrl });
      }
    });
  }
});
