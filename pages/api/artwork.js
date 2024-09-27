import { fetchArtwork } from '../../utils/artworkService';

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method Not Allowed' });
  }

  const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || 'https://guess-the-artist.vercel.app';
  const { artwork, correctArtist, wrongArtist } = await fetchArtwork();

  res.status(200).json({
    version: 'vNext',
    image: `${baseUrl}/api/og?artwork=${encodeURIComponent(artwork)}`,
    buttons: [
      { label: correctArtist },
      { label: wrongArtist },
    ],
    post_url: `${baseUrl}/api/answer`,
  });
}
