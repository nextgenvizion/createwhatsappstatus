// ✅ File: /pages/index.js
// Purpose: Homepage UI — includes full layout, SEO, dynamic form, mood/language selectors, result display, responsive design, watermark, share/copy buttons, cookie banner, and accessibility

import Head from 'next/head';
import { useState } from 'react';
import StatusForm from '../components/StatusForm';
import ResultBox from '../components/ResultBox';
import Footer from '../components/Footer';
import CookieConsent from '../components/CookieConsent';

export default function Home() {
  const [result, setResult] = useState('');
  const [loading, setLoading] = useState(false);

  return (
    <>
      <Head>
        <title>Create WhatsApp Status – AI Generator</title>
        <meta name="description" content="Generate WhatsApp status messages in your language with mood-based AI. No login required. 25+ languages supported." />
        <meta property="og:title" content="Create WhatsApp Status – AI Generator" />
        <meta property="og:description" content="Type your emotion. Choose your mood. Generate AI-powered WhatsApp status in any language." />
        <meta property="og:type" content="website" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className="min-h-screen bg-gradient-to-b from-white to-gray-50 text-gray-900 flex flex-col justify-between font-sans">
        <div className="max-w-3xl mx-auto px-4 py-12 w-full">
          <section className="text-center mb-10">
            <h1 className="text-5xl font-bold mb-4">Create WhatsApp Status</h1>
            <p className="text-lg text-gray-600">
              Type your thoughts, pick a mood and language — let AI generate the perfect WhatsApp status in seconds.
            </p>
          </section>

          <section className="bg-white rounded-xl shadow-md p-6 md:p-8 border border-gray-200">
            <StatusForm setResult={setResult} setLoading={setLoading} />
          </section>

          {loading && (
            <div className="text-center text-sm mt-6 text-gray-500 animate-pulse">
              Generating your status... please wait
            </div>
          )}

          {result && (
            <section className="mt-10">
              <ResultBox result={result} />
              <div className="mt-4 text-sm text-gray-400 text-center italic">
                Generated via CreateWhatsAppStatus.com
              </div>
            </section>
          )}

          <section className="mt-14 border-t pt-8">
            <h2 className="text-xl font-semibold text-center mb-3">Why use CreateWhatsAppStatus?</h2>
            <ul className="text-gray-700 text-sm space-y-2 list-disc pl-6">
              <li>✅ No login required</li>
              <li>✅ Supports 25+ languages and moods</li>
              <li>✅ Native-sounding statuses with emojis</li>
              <li>✅ Fast, mobile-first, AI-powered</li>
              <li>✅ Privacy-respecting: no data stored</li>
            </ul>
          </section>

          <section className="mt-14 text-center text-xs text-gray-400">
            © {new Date().getFullYear()} CreateWhatsAppStatus.com. Built for global expression.
          </section>
        </div>

        <Footer />
        <CookieConsent />
      </main>
    </>
  );
}
