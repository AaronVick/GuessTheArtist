import { fetchArtwork } from '../../utils/artworkService';

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method Not Allowed' });
  }

  const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || 'https://guess-the-artist.vercel.app';
  const { untrustedData } = req.body;
  const buttonIndex = untrustedData?.buttonIndex;

  try {
    let html = '';
    const state = JSON.parse(decodeURIComponent(untrustedData?.state || '{}'));

    if (!state.stage || state.stage === 'initial') {
      const { artwork, correctArtist, wrongArtist } = await fetchArtwork();
      html = generateInitialHTML(baseUrl, artwork, correctArtist, wrongArtist, state);
    } else if (state.stage === 'question') {
      html = generateQuestionHTML(baseUrl, buttonIndex, state);
    }

    res.setHeader('Content-Type', 'text/html');
    res.status(200).send(html);
  } catch (error) {
    handleError(baseUrl, res);
  }
}

function generateInitialHTML(baseUrl, artwork, correctArtist, wrongArtist, state) {
  return `
    <html>
      <head>
        <meta property="fc:frame" content="vNext" />
        <meta property="fc:frame:image" content="${baseUrl}/api/og?artwork=${encodeURIComponent(artwork)}" />
        <meta property="fc:frame:button:1" content="${correctArtist}" />
        <meta property="fc:frame:button:2" content="${wrongArtist}" />
        <meta property="fc:frame:post_url" content="${baseUrl}/api/frame" />
        <meta property="fc:frame:state" content="${encodeURIComponent(JSON.stringify({ correctArtist, wrongArtist, totalAnswered: 0, stage: 'question' }))}" />
      </head>
    </html>
  `;
}

function generateQuestionHTML(baseUrl, buttonIndex, state) {
  const totalAnswered = (state.totalAnswered || 0) + (buttonIndex === 1 ? 1 : 0);
  const selectedArtist = buttonIndex === 1 ? state.correctArtist : state.wrongArtist;
  const isCorrect = selectedArtist === state.correctArtist;
  const message = isCorrect 
    ? `Correct! The artist was ${selectedArtist}. You've guessed ${totalAnswered} artists correctly.` 
    : `Wrong. The correct artist was ${state.correctArtist}. You've guessed ${totalAnswered} artists correctly.`;

  const shareText = encodeIt looks like the plan is to create a game where users guess the artist of an artwork on Farcaster, and you’re requesting a full code review for the files, ensuring they are correctly set up for Farcaster frames, metatags, image frames, and buttons. Since you're already familiar with this process from previous games like “Guess the Quote,” we'll focus on adjusting the files accordingly. 
