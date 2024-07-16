document.getElementById("addParserButton").addEventListener("click", () => {
  const parserInput = document.getElementById("parserInput");
  const parserUrl = parserInput.value.trim();

  if (parserUrl) {
    chrome.storage.sync.get("parsers", (data) => {
      const parsers = data.parsers || [];
      parsers.push(parserUrl);

      chrome.storage.sync.set({ parsers: parsers }, () => {
        parserInput.value = "";
        displayParsers();
      });
    });
  }
});

function removeParser(index) {
  chrome.storage.sync.get("parsers", (data) => {
    const parsers = data.parsers || [];
    parsers.splice(index, 1);

    chrome.storage.sync.set({ parsers: parsers }, () => {
      displayParsers();
    });
  });
}

function displayParsers() {
  chrome.storage.sync.get("parsers", (data) => {
    const parsers = data.parsers || [];
    const parsersDiv = document.getElementById("parsers");
    parsersDiv.innerHTML = "";

    parsers.forEach((parser, index) => {
      const div = document.createElement("div");
      div.className = "parser-item";
      div.innerHTML = `<span>${index + 1}. ${parser}</span> <button class="removeButton" data-index="${index}">移除</button>`;
      parsersDiv.appendChild(div);
    });

    document.querySelectorAll(".removeButton").forEach(button => {
      button.addEventListener("click", () => {
        const index = button.getAttribute("data-index");
        removeParser(index);
      });
    });
  });
}

document.addEventListener("DOMContentLoaded", displayParsers);
