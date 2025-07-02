import React from 'react';

interface Bit {
  user: string;
  bits: number;
}

const topBits: Bit[] = [
  { user: 'ThatLegendJack', bits: 137475 },
  { user: 'Hell_breath', bits: 57877 },
  { user: 'ThatGuyNathannn', bits: 55018 },
  { user: 'MorphTreo', bits: 50800 },
  { user: 'Heavy_Metal666', bits: 46789 },
  { user: 'W_GOAT', bits: 45985 },
  { user: 'YouGotAMic', bits: 33703 },
  { user: 'acidrivix', bits: 27500 },
  { user: 'deluxeretro', bits: 25069 },
  { user: 'CronixxLive', bits: 12100 },
];

const TopBits = () => {
  return (
    <div className="bg-foreground/5 max-w-lg space-y-7 rounded-lg px-4 py-7 md:px-10">
      <h1 className="font-clash text-2xl font-semibold">Top Bits Cheered</h1>
      <div>
        {topBits.map((bit, index) => (
          <div key={index} className="flex justify-between p-2">
            <span className="text-muted-foreground min-w-8">#{index + 1}</span>
            <span className="min-w-44">{bit.user}</span>
            <span className="text-muted-foreground min-w-20 text-right">
              {bit.bits.toLocaleString()}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default TopBits;
