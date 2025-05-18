type Guild = {
  id: string;
  name: string;
  icon: string | null;
  approximate_member_count: number;
};

export const fetchGuild = async (
  invite: string
): Promise<{
  guild: Guild;
  approximate_member_count: number;
}> => {
  const res = await fetch(
    `https://discord.com/api/v10/invites/${invite.slice(invite.lastIndexOf('/') + 1)}?with_counts=true`
  );

  if (!res.ok) {
    console.log('Error fetching guild:', await res.json());
    throw new Error('Failed to fetch guild');
  }

  const data = await res.json();
  return {
    guild: data.guild,
    approximate_member_count: data.approximate_member_count,
  };
};

export const getUserDetailsByID = async (id: string) => {
  const res = await fetch(`https://discordlookup.mesalytic.moe/v1/user/${id}`);

  if (!res.ok) {
    console.log('Error fetching user details:', await res.json());
    throw new Error('Failed to fetch user details');
  }

  const data = await res.json();
  return data;
};
