// Language Configuration
const languages = {
  en: { flag: "us", name: "English" },
  hi: { flag: "in", name: "Hindi" },
  es: { flag: "es", name: "Spanish" },
  // Add 22 more languages...
};

// DOM Elements
const languageBtn = document.getElementById('language-btn');
const statusInput = document.getElementById('status-input');
const statusPreview = document.getElementById('status-preview');
const watermark = document.getElementById('watermark');

// Set Default Language
let currentLang = 'en';

// Language Switcher
document.querySelectorAll('.dropdown-content a').forEach(item => {
  item.addEventListener('click', (e) => {
    e.preventDefault();
    const lang = e.target.getAttribute('data-lang');
    currentLang = lang;
    languageBtn.innerHTML = `<span class="fi fi-${languages[lang].flag}"></span> ${languages[lang].name}`;
    translateUI();
  });
});

// Translate UI Elements
function translateUI() {
  fetch(`lang/${currentLang}.json`)
    .then(response => response.json())
    .then(data => {
      statusInput.placeholder = data.placeholder;
      watermark.textContent = data.watermark;
    });
}

// AI Generation (GPT-4 Hook)
document.getElementById('generate-btn').addEventListener('click', () => {
  const prompt = statusInput.value;
  if (prompt.trim() === '') return;

  // Call GPT-4 API (Replace with your API key)
  fetch('https://api.openai.com/v1/chat/completions', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': 'Bearer YOUR_GPT4_API_KEY'
    },
    body: JSON.stringify({
      model: "gpt-4",
      messages: [{
        role: "user",
        content: `Generate a WhatsApp status in ${currentLang} about: ${prompt}`
      }]
    })
  })
  .then(response => response.json())
  .then(data => {
    statusPreview.textContent = data.choices[0].message.content;
  });
});

// Share on WhatsApp
document.getElementById('share-btn').addEventListener('click', () => {
  const text = encodeURIComponent(statusPreview.textContent);
  window.open(`https://wa.me/?text=${text}`);
});

// Initialize
translateUI();