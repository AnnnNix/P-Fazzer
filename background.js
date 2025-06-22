const FILES = [
  ".git/config",
  ".env",
  "Dockerfile",
  ".gitlab-ci.yml",
  "config.php",
  "db.sql",
  "backup.zip",
  "wp-config.txt",
  "wp-config.php.1",
  "config.txt",
  "backup.tar.gz",
  "id_rsa",
  "1.tar.gz"
];

const TELEGRAM_BOT_TOKEN = "TG-BOT-TELEGRAM_BOT_TOKEN";
const TELEGRAM_CHAT_ID = "TELEGRAM_CHAT_ID";

async function checkFiles(baseUrl) {
  const found = [];

  for (const file of FILES) {
    try {
      const res = await fetch(baseUrl + "/" + file, { method: "HEAD" });
      if (res.status === 200) {
        const entry = {
          site: baseUrl,
          file: file,
          time: new Date().toLocaleString()
        };
        saveHistory(entry);
        found.push(entry);

        browser.storage.local.get("telegramEnabled").then(data => {
          if (data.telegramEnabled !== false) {
            notifyTelegram(baseUrl, file);
          }
        });
      }
    } catch (e) {}
  }

  if (found.length > 0) {
    exportHistory(); // експорт у .txt
  }
}

function notifyTelegram(site, file) {
  const text = `🛑 Sensitive file found:\nSite: ${site}\nFile: ${file}`;
  const url = `https://api.telegram.org/bot${TELEGRAM_BOT_TOKEN}/sendMessage`;

  fetch(url, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      chat_id: TELEGRAM_CHAT_ID,
      text: text,
      parse_mode: "Markdown"
    })
  });
}

function saveHistory(entry) {
  browser.storage.local.get({ history: [] }).then(data => {
    const updated = [entry, ...data.history].slice(0, 50);
    browser.storage.local.set({ history: updated });
  });
}

function exportHistory() {
  browser.storage.local.get("history").then(data => {
    if (!data.history || data.history.length === 0) return;

    const content = data.history.map(e => `[${e.time}] ${e.site}/${e.file}`).join("\n");
    const blob = new Blob([content], { type: "text/plain" });
    const url = URL.createObjectURL(blob);

    browser.downloads.download({
      url: url,
      filename: "sensitive-file-scan.txt",
      saveAs: false
    });
  });
}

browser.webNavigation.onCompleted.addListener(details => {
  try {
    const url = new URL(details.url);
    const baseUrl = url.origin;
    checkFiles(baseUrl);
  } catch (e) {}
});
