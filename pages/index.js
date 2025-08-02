import { useState } from 'react';
import Head from 'next/head';
import Header from '../components/Header';
import StatusForm from '../components/StatusForm';
import Footer from '../components/Footer';

export default function Home() {
  const [result, setResult] = useState(null);

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-gray-100">
      <Head>
        <title>AI WhatsApp Status Generator | CreateWhatsAppStatus.com</title>
        <meta name="description" content="Generate perfect WhatsApp statuses in 25 languages using AI" />
      </Head>
      
      <Header />
      
      <main className="container mx-auto px-4 py-12">
        <div className="max-w-3xl mx-auto bg-white rounded-xl shadow-md overflow-hidden p-6">
          <StatusForm onResult={setResult} />
          {result && <ResultBox result={result} />}
        </div>
      </main>
      
      <Footer />
    </div>
  );
}
