document.addEventListener("DOMContentLoaded", () => {
  const container = document.getElementById("history");
  const clearBtn = document.getElementById("clear");
  const toggleBox = document.getElementById("toggleNotify");

  browser.storage.local.get(["history", "telegramEnabled"]).then(data => {
    if (!data.history || data.history.length === 0) {
      container.innerHTML = "<p>Нічого не знайдено 👌</p>";
    } else {
      data.history.forEach(item => {
        const div = document.createElement("div");
        div.className = "entry";
        div.textContent = `[${item.time}] ${item.site}/${item.file}`;
        container.appendChild(div);
      });
    }

    toggleBox.checked = data.telegramEnabled !== false;
  });

  clearBtn.onclick = () => {
    browser.storage.local.set({ history: [] });
    container.innerHTML = "<p>Історію очищено 🧹</p>";
  };

  toggleBox.onchange = () => {
    browser.storage.local.set({ telegramEnabled: toggleBox.checked });
  };
});
