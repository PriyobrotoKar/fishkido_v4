import { getAllSubs } from '@/features/subs/actions/getAllSubs';

const TopGifts = async () => {
  const subs = await getAllSubs();

  if (subs.error) {
    return (
      <div className="bg-foreground/5 max-w-xl space-y-7 rounded-lg px-10 py-7">
        <h1 className="font-clash text-2xl font-semibold">Top Gifted Subs</h1>
        <p className="text-muted-foreground">Error fetching data</p>
      </div>
    );
  }

  return (
    <div className="bg-foreground/5 max-w-lg space-y-7 rounded-lg px-4 py-7 md:px-10">
      <h1 className="font-clash text-2xl font-semibold">Top Gifted Subs</h1>
      <div>
        {subs.data?.map((sub, index) => (
          <div key={index} className="flex justify-between p-2">
            <span className="text-muted-foreground min-w-8">#{index + 1}</span>
            <span className="min-w-44">{sub.username}</span>
            <span className="text-muted-foreground min-w-20 text-right">
              {sub.gifts.toLocaleString()}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default TopGifts;
