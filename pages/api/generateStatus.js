// ✅ File: /pages/api/generateStatus.js
// Purpose: Secure serverless API to OpenAI (GPT-4o) that accepts POST data and returns WhatsApp status

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const { userInput, mood, tone, outputLanguage } = req.body;

  if (!userInput || !mood || !outputLanguage) {
    return res.status(400).json({ error: 'Missing required fields' });
  }

  const systemPrompt = `You are a multilingual WhatsApp status generator. You generate short, emotionally relevant status messages using emojis and native phrasing. Always keep it under 20 words.`;

  const userPrompt = `Generate a ${mood} WhatsApp status in ${outputLanguage} with ${tone || 'default'} tone. Context: "${userInput}".`;

  try {
    const response = await fetch("https://api.openai.com/v1/chat/completions", {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${process.env.OPENAI_API_KEY}`,
      },
      body: JSON.stringify({
        model: "gpt-4o",
        messages: [
          { role: "system", content: systemPrompt },
          { role: "user", content: userPrompt }
        ],
        temperature: 0.9,
        max_tokens: 60
      })
    });

    const data = await response.json();

    if (!data.choices || !data.choices[0]) {
      throw new Error('No response from OpenAI');
    }

    const statusText = data.choices[0].message.content.trim();
    res.status(200).json({ status: statusText });

  } catch (error) {
    console.error("OpenAI error:", error);
    res.status(500).json({ error: 'Failed to generate status' });
  }
}
