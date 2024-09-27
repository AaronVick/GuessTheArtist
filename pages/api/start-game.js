export default async function handler(req, res) {
    if (req.method !== 'POST') {
      return res.status(405).json({ error: 'Method Not Allowed' });
    }
  
    const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || 'https://guess-the-artist.vercel.app';
  
    res.status(200).json({
      version: 'vNext',
      image: `${baseUrl}/artistGuess.png`,
      buttons: [{ label: 'Start the Game' }],
      post_url: `${baseUrl}/api/artwork`,
    });
  }
  