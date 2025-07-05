const baseUrl = 'https://api.twitch.tv/helix';
const broadcasterId = process.env.BROADCASTER_ID;

const urls = [
  `/bits/leaderboard`,
  `/channels/followers?broadcaster_id=${broadcasterId}`,
  `/subscriptions?broadcaster_id=${broadcasterId}`,
];

export async function getStats() {
  try {
    const promises = urls.map((url) =>
      fetch(baseUrl + url, {
        headers: {
          'Client-ID': process.env.TWITCH_CLIENT_ID || '',
          Authorization: `Bearer ${process.env.TWITCH_ACCESS_TOKEN || ''}`,
        },
      })
    );

    const responses = await Promise.all(promises);

    const isAllResponsesOk = responses.every((res) => res.ok);

    if (!isAllResponsesOk) {
      throw new Error('One or more responses were not OK');
    }

    const [bits, followers, subscriptions] = await Promise.all(
      responses.map((res) => res.json())
    );

    return {
      bits,
      followers: followers.total,
      subscribers: subscriptions.total,
    };
  } catch (error) {
    console.error('Failed to fetch stats:', error);
    return null;
  }
}
