import franc from 'franc-min';

export function detectLanguage(text) {
  const langCode = franc(text);
  const languageMap = {
    eng: 'English',
    hin: 'Hindi',
    spa: 'Spanish',
    // ...25 languages
  };
  return languageMap[langCode] || 'English';
}
