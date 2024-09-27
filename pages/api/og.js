export const config = {
    runtime: 'edge',
  };
  
  export default function handler(req) {
    const { artwork, message } = req.query;
  
    return new ImageResponse(
      (
        <div style={{ height: '100%', width: '100%', display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center', backgroundColor: '#1a1a1a', color: 'white', fontSize: 32 }}>
          {artwork ? (
            <img src={artwork} alt="Artwork" style={{ maxWidth: '90%', maxHeight: '80%' }} />
          ) : (
            <div style={{ textAlign: 'center', margin: '20px 0', maxWidth: '80%' }}>{message}</div>
          )}
        </div>
      ),
      { width: 1200, height: 630 }
    );
  }
  