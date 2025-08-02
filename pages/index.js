// File: /pages/index.js

import Head from 'next/head';
import { useRouter } from 'next/router';
import { useState, useEffect } from 'react';
import LanguageSelector from '../components/LanguageSelector';
import MoodSelector from '../components/MoodSelector';
import StatusForm from '../components/StatusForm';
import ResultBox from '../components/ResultBox';
import Footer from '../components/Footer';
import CookieConsent from '../components/CookieConsent';

export default function Home() {
  const router = useRouter();
  const [language, setLanguage] = useState('en');
  const [mood, setMood] = useState('love');
  const [inputText, setInputText] = useState('');
  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const browserLang = navigator.language.split('-')[0];
    const supportedLangs = [
      'en','hi','ar','es','fr','de','pt','bn','ru','ja','ur','tr','ta','te','it','ko','mr','gu','pa','zh','id','pl','nl','vi','th'
    ];
    if (supportedLangs.includes(browserLang)) {
      setLanguage(browserLang);
    }
  }, []);

  const handleSubmit = async () => {
    if (!inputText.trim()) return;
    setLoading(true);
    setResult(null);

    try {
      const res = await fetch('/api/generateStatus', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ mood, language, inputText })
      });

      const data = await res.json();
      if (res.ok) {
        setResult(data.status);
      } else {
        setResult('⚠️ Error generating status.');
      }
    } catch (error) {
      setResult('❌ Server error. Try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <Head>
        <title>Create WhatsApp Status - AI Generator</title>
        <meta name="description" content="Generate WhatsApp Status in any language using AI. Fun, love, sad, motivational & more moods supported." />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta property="og:title" content="Create WhatsApp Status with AI" />
        <meta property="og:description" content="Enter your mood and generate WhatsApp status in your language using AI." />
        <meta property="og:image" content="/og-image.png" />
      </Head>

      <main className="min-h-screen flex flex-col items-center justify-center bg-gray-50 dark:bg-gray-900 px-4 py-8">
        <h1 className="text-3xl md:text-5xl font-bold text-center text-gray-900 dark:text-white mb-6">
          Create WhatsApp Status
        </h1>
        <p className="text-md md:text-lg text-gray-700 dark:text-gray-300 text-center max-w-xl mb-8">
          Type your thoughts, select mood and language — AI will turn it into a beautiful WhatsApp status.
        </p>

        <div className="w-full max-w-2xl space-y-4">
          <LanguageSelector language={language} setLanguage={setLanguage} />
          <MoodSelector mood={mood} setMood={setMood} />
          <StatusForm
            inputText={inputText}
            setInputText={setInputText}
            onSubmit={handleSubmit}
            loading={loading}
          />
          <ResultBox result={result} />
        </div>

        <Footer />
        <CookieConsent />
      </main>
    </>
  );
}
