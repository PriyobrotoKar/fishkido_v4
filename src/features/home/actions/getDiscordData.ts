const userId = '534064040788492295';

export const getDiscordData = async () => {
  try {
    const response = await fetch(`https://api.lanyard.rest/v1/users/${userId}`);
    if (!response.ok) {
      throw new Error('Failed to fetch Discord data');
    }

    const data = await response.json();

    return data.data;
  } catch (error) {
    console.error('Error fetching Discord data:', error);
    return null;
  }
};
