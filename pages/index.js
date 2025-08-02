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
    setResult("");

    try {
      const res = await fetch("/api/generateStatus", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ userText, mood, language }),
      });
      const data = await res.json();
      setResult(data.status || "No status generated.");
    } catch (err) {
      setResult("⚠️ Error generating status.");
    }

    setLoading(false);
  };

  return (
    <>
      <Head>
        <title>Create WhatsApp Status</title>
        <link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Inter:wght@400;600&display=swap" />
      </Head>
      <div style={styles.container}>
        <h1 style={styles.heading}>✨ Create WhatsApp Status</h1>
        <textarea
          placeholder="Enter your idea, like: birthday wish for best friend"
          value={userText}
          onChange={(e) => setUserText(e.target.value)}
          style={styles.textarea}
        />
        <div style={styles.row}>
          <select value={mood} onChange={(e) => setMood(e.target.value)} style={styles.select}>
            <option>Romantic</option>
            <option>Sad</option>
            <option>Funny</option>
            <option>Motivational</option>
            <option>Attitude</option>
            <option>Good Morning</option>
          </select>
          <select value={language} onChange={(e) => setLanguage(e.target.value)} style={styles.select}>
            <option>Hindi</option>
            <option>English</option>
            <option>Spanish</option>
            <option>German</option>
            <option>French</option>
          </select>
        </div>
        <button onClick={handleGenerate} style={styles.button}>
          {loading ? "Generating..." : "Generate Status"}
        </button>
        <div style={styles.resultBox}>
          {result && <p style={styles.resultText}>{result}</p>}
        </div>
      </div>
    </>
  );
}

const styles = {
  container: {
    fontFamily: "'Inter', sans-serif",
    padding: "2rem",
    maxWidth: "600px",
    margin: "0 auto",
    textAlign: "center",
  },
  heading: {
    fontSize: "2rem",
    fontWeight: "600",
    marginBottom: "1.5rem",
  },
  textarea: {
    width: "100%",
    padding: "1rem",
    borderRadius: "8px",
    border: "1px solid #ccc",
    marginBottom: "1rem",
    fontSize: "1rem",
    minHeight: "80px",
    resize: "vertical",
  },
  row: {
    display: "flex",
    justifyContent: "center",
    gap: "1rem",
    marginBottom: "1.5rem",
  },
  select: {
    padding: "0.5rem 1rem",
    fontSize: "1rem",
    borderRadius: "6px",
    border: "1px solid #bbb",
  },
  button: {
    padding: "0.75rem 1.5rem",
    fontSize: "1rem",
    backgroundColor: "#0070f3",
    color: "#fff",
    border: "none",
    borderRadius: "8px",
    cursor: "pointer",
    transition: "background-color 0.3s ease",
  },
  resultBox: {
    marginTop: "2rem",
    padding: "1rem",
    backgroundColor: "#f5f5f5",
    borderRadius: "8px",
    minHeight: "50px",
  },
  resultText: {
    fontSize: "1.1rem",
    fontWeight: "500",
    color: "#333",
  },
};
