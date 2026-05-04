export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const { transcript } = req.body;

  try {
    const response = await fetch('https://api.anthropic.com/v1/messages', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'x-api-key': process.env.ANTHROPIC_KEY,
        'anthropic-version': '2023-06-01'
      },
      body: JSON.stringify({
        model: 'claude-opus-4-6',
        max_tokens: 1024,
        system: 'You are a BJJ training assistant. The user will give you a raw voice note from their training session. Summarize it into clean, organized training notes. Include: techniques worked on, key details or concepts learned, things to improve, and any notable moments from rolling. Be concise and structured. Use plain text, no markdown.',
        messages: [{ role: 'user', content: transcript }]
      })
    });

    const data = await response.json();
    res.status(200).json({ summary: data.content[0].text });
  } catch (e) {
    res.status(500).json({ error: 'Failed to summarize' });
  }
}