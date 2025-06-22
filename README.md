# 📦 Sensitive File Checker – Firefox Extension

**Sensitive File Checker** is a Firefox extension that scans visited websites for accidentally exposed sensitive files such as `.env`, `config.php`, `.git/config`, backups, private keys, and more.

![screenshot](./screenshot.png)

---

## 🔍 Features

- 🚨 Detects common sensitive files including:
  - `.git/config`, `.env`, `config.php`, `wp-config.php.1`, `backup.zip`, `id_rsa`, and others
- 📬 Sends optional Telegram alerts when a file is found
- 📋 Keeps a local history of the last 50 detections
- 💾 Automatically exports detections to a `.txt` file
- 🧹 "Clear History" button in the popup
- 🎨 Clean, modern popup UI with dark theme

---

## 🧩 How to Install (Developer Mode)

1. Clone or download this repository:
   ```bash
   git clone https://github.com/AnnnNix/P-Fazzer/tree/main
   ```
2. Open Firefox and go to:
   ```
   about:debugging#/runtime/this-firefox
   ```
3. Click **Load Temporary Add-on** and select the `manifest.json` file from the project folder

> ⚠️ Temporary add-ons are removed when Firefox restarts. For permanent use, you must sign and publish it on [addons.mozilla.org](https://addons.mozilla.org/).

---

## ⚙️ Settings & Controls

In the extension popup:

- ✅ **Telegram toggle** to enable/disable notifications
- 🧹 **Clear History** button
- 📄 **Auto-export** creates a `.txt` file with detected findings

---

## 🔐 Privacy & Security

This extension:
- Does **not** collect any user data
- Does **not** track browsing behavior
- Sends data **only** to Telegram (if enabled) using your configured bot token and chat ID

---

## 📁 Project Structure

```
├── manifest.json        # Extension metadata
├── background.js        # Core scanning logic
├── popup.html           # Popup UI
├── popup.js             # Popup script
├── style.css            # Stylesheet
├── icon.png             # Toolbar icon
└── README.md
```

---

## 🤝 Contributing

Pull requests are welcome!

You can contribute by:
- Adding new file patterns to scan
- Improving UI/UX
- Translating the popup or README
- Suggesting integrations with more alerting services

---

## 📜 License

Distributed under the [MIT License](./LICENSE).

---

## 🌐 Links

- 🔗 GitHub: [github.com/yourname/sensitive-file-checker](https://github.com/yourname/sensitive-file-checker)
- 🛠 You can use Published my own fork via [addons.mozilla.org]([https://addons.mozilla.org/](https://addons.mozilla.org/en-US/firefox/addon/p-fazzr-sensitive-file-checker/))
- ✉️ Feedback or issues? Open an issue or message us via Telegram
