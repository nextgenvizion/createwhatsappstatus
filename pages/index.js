import Head from "next/head";
import { useState } from "react";

export default function Home() {
  const [userText, setUserText] = useState("");
  const [mood, setMood] = useState("Romantic");
  const [language, setLanguage] = useState("Hindi");
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState("");

  const handleGenerate = async () => {
    if (!userText.trim()) return alert("Please enter something!");

    setLoading(true);
    const res = await fetch("/api/generateStatus", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ userText, mood, language }),
    });

    const data = await res.json();
    setResult(data.status || "No status generated.");
    setLoading(false);
  };

  return (
    <>
      <Head>
        <title>Create WhatsApp Status</title>
        <meta name="description" content="AI-generated WhatsApp statuses in 25 languages." />
      </Head>

      <main className="min-h-screen bg-gray-50 flex flex-col items-center justify-center px-4 py-16">
        <h1 className="text-3xl font-bold mb-6 text-center text-gray-800">
          Create WhatsApp Status
        </h1>

        <textarea
          placeholder="Enter your idea, like: birthday wish for best friend"
          className="w-full max-w-xl p-3 rounded border border-gray-300 mb-4"
          rows={3}
          value={userText}
          onChange={(e) => setUserText(e.target.value)}
        />

        <div className="flex gap-4 mb-4">
          <select
            value={mood}
            onChange={(e) => setMood(e.target.value)}
            className="p-2 rounded border border-gray-300"
          >
            <option>Romantic</option>
            <option>Funny</option>
            <option>Sad</option>
            <option>Motivational</option>
            <option>Breakup</option>
            <option>Birthday</option>
          </select>

          <select
            value={language}
            onChange={(e) => setLanguage(e.target.value)}
            className="p-2 rounded border border-gray-300"
          >
            <option>Hindi</option>
            <option>English</option>
            <option>Spanish</option>
            <option>Arabic</option>
            <option>French</option>
            <option>Portuguese</option>
            <option>Bengali</option>
            <option>Urdu</option>
            <option>Tamil</option>
            <option>Telugu</option>
            <option>Gujarati</option>
            <option>Marathi</option>
            <option>Kannada</option>
            <option>Malayalam</option>
            <option>Punjabi</option>
            <option>Russian</option>
            <option>Indonesian</option>
            <option>Turkish</option>
            <option>Vietnamese</option>
            <option>Japanese</option>
            <option>Korean</option>
            <option>German</option>
            <option>Swahili</option>
            <option>Thai</option>
            <option>Tagalog</option>
          </select>
        </div>

        <button
          onClick={handleGenerate}
          className="bg-green-600 hover:bg-green-700 text-white font-medium px-6 py-2 rounded"
        >
          {loading ? "Generating..." : "Generate Status"}
        </button>

        {result && (
          <div className="mt-6 max-w-xl w-full p-4 border border-gray-300 rounded bg-white text-gray-800">
            <p className="mb-2 font-semibold">Your AI Status:</p>
            <p>{result}</p>
            <button
              className="mt-3 bg-blue-600 hover:bg-blue-700 text-white px-4 py-1 rounded"
              onClick={() => navigator.clipboard.writeText(result)}
            >
              Copy to Clipboard
            </button>
          </div>
        )}
      </main>
    </>
  );
}
