export default async function handler(req, res) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
  if (req.method === 'OPTIONS') return res.status(200).end();
  if (req.method !== 'POST') return res.status(405).end();

  const { messages } = req.body;

  const response = await fetch('https://api.groq.com/openai/v1/chat/completions', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': 'Bearer ' + process.env.GROQ_API_KEY
    },
    body: JSON.stringify({
      model: 'llama-3.3-70b-versatile',
      max_tokens: 1000,
      messages: [
        {
          role: 'system',
          content: 'أنت EliteClub AI، مساعد تداول احترافي متخصص في SMC و ICT. أجب بالعربية بأسلوب احترافي وموجز. تخصصك: BOS، CHoCH، Order Blocks، Fair Value Gaps، Liquidity، Multi-Timeframe Analysis، نفسية التداول.'
        },
        ...messages
      ]
    })
  });

  const data = await response.json();
  res.status(200).json(data);
}
