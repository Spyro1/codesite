const elements = document.querySelectorAll("[data-translate]");
// const languageSelector = document.getElementById("language");
const dropdown = document.getElementById("language-selector");
const label = dropdown.querySelector(".dropdown__label");
const options = dropdown.querySelectorAll(".dropdown__option");

function setLanguage(lang) {
  fetch(`translations/${lang}.json`)
    .then(res => res.json())
    .then(translations => {
      elements.forEach(el => {
        const key = el.getAttribute("data-translate");
        if (translations[key]) {
          // Handle different element types
          if (el.tagName === 'META') {
            if (el.hasAttribute('content')) {
              el.setAttribute('content', translations[key]);
            }
          } else if (el.tagName === 'TITLE') {
            el.textContent = translations[key];
          } else {
            el.textContent = translations[key];
          }
        }
      });
      document.documentElement.lang = lang;
      localStorage.setItem("language", lang);   // Save selected language
      label.textContent = lang;                 // Update dropdown label
    });
}

// Handle custom dropdown
options.forEach(option => {
  option.addEventListener("click", () => {
    const selectedLang = option.textContent.trim();
    label.textContent = selectedLang;       // Update visible label
    setLanguage(selectedLang);              // Apply translation
  });
});

// Load saved language or default to English
const savedLang = localStorage.getItem("language") || "en";
setLanguage(savedLang);
