import OpenAI from 'openai';

const openai = new OpenAI(process.env.OPENAI_API_KEY);

export default async function handler(req, res) {
  if (req.method !== 'POST') return res.status(405).end();
  
  const { text, mood, language } = req.body;
  
  const prompt = `Generate a ${mood} WhatsApp status in ${language}. 
  Include relevant emojis. Context: ${text}`;

  try {
    const completion = await openai.chat.completions.create({
      model: "gpt-4o",
      messages: [{ role: "user", content: prompt }],
      temperature: 0.7,
      max_tokens: 100
    });

    const status = completion.choices[0].message.content;
    res.status(200).json({ status });
    
  } catch (error) {
    res.status(500).json({ error: "AI generation failed" });
  }
}
