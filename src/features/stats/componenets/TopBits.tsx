import React from 'react';

interface TopBitsProps {
  bits?: {
    data: {
      user_name: string;
      score: number;
    }[];
  };
}

const TopBits = ({ bits }: TopBitsProps) => {
  if (!bits || !bits.data) {
    return (
      <div className="bg-foreground/5 max-w-lg space-y-7 rounded-lg px-4 py-7 md:px-10">
        <h1 className="font-clash text-2xl font-semibold">Top Bits Cheered</h1>
        <p className="text-muted-foreground">No data available</p>
      </div>
    );
  }

  return (
    <div className="bg-foreground/5 max-w-lg space-y-7 rounded-lg px-4 py-7 md:px-10">
      <h1 className="font-clash text-2xl font-semibold">Top Bits Cheered</h1>
      <div>
        {bits.data.map((bit, index) => (
          <div key={index} className="flex justify-between p-2">
            <span className="text-muted-foreground min-w-8">#{index + 1}</span>
            <span className="min-w-44">{bit.user_name}</span>
            <span className="text-muted-foreground min-w-20 text-right">
              {bit.score.toLocaleString()}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default TopBits;
