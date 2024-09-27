import Head from 'next/head';

export default function Home({ initialMetaTags }) {
  return (
    <div>
      <Head>
        <title>Guess the Artist</title>
        <meta property="fc:frame:image" content="/artistGuess.png" />
        <meta property="fc:frame:button:1" content="Start the Game" />
        <meta property="fc:frame:post_url" content="/api/start-game" />
      </Head>
      <h1>Guess the Artist</h1>
      <img src="/artistGuess.png" alt="Artist Guess" width="600" height="300" />
    </div>
  );
}

export async function getServerSideProps() {
  const initialMetaTags = `
    <meta property="fc:frame" content="vNext" />
    <meta property="fc:frame:image" content="/artistGuess.png" />
    <meta property="fc:frame:button:1" content="Start the Game" />
    <meta property="fc:frame:post_url" content="/api/start-game" />
  `;

  return { props: { initialMetaTags } };
}
