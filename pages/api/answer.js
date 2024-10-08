export default async function handler(req, res) {
    if (req.method !== 'POST') {
      return res.status(405).json({ error: 'Method Not Allowed' });
    }
  
    const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || 'https://guess-the-artist.vercel.app';
    const { untrustedData } = req.body;
    const buttonIndex = untrustedData?.buttonIndex;
    const correctArtist = untrustedData?.state?.correctArtist;
    const totalAnswered = (untrustedData?.state?.totalAnswered || 0) + (buttonIndex === 1 ? 1 : 0);
  
    const isCorrect = buttonIndex === 1;
    const message = isCorrect 
      ? `Correct! You've guessed ${totalAnswered} artists correctly.` 
      : `Wrong. The correct artist was ${correctArtist}. You guessed ${totalAnswered} artists correctly.`;
  
    const shareText = encodeURIComponent(`I guessed ${totalAnswered} artists correctly in the Artist Guessing Game!\n\nFrame by @aaronv.eth`);
    const shareLink = `https://warpcast.com/~/compose?text=${shareText}&embeds[]=${encodeURIComponent(baseUrl)}`;
  
    res.status(200).json({
      version: 'vNext',
      image: `${baseUrl}/api/og?message=${encodeURIComponent(message)}`,
      buttons: [
        { label: 'Next Artwork' },
        { label: 'Share', action: 'link', target: shareLink },
      ],
      post_url: `${baseUrl}/api/artwork`,
    });
  }
  