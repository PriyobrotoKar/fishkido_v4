import Image from 'next/image';
import React from 'react';

const BgGradient = () => {
  return (
    <div className="absolute inset-0 -z-10 h-full w-full overflow-hidden">
      <Image
        src={'/bg-gradient-bottom.svg'}
        alt="Background Gradient"
        width={1000}
        height={1000}
        className="absolute bottom-0 left-0"
      />
      <Image
        src={'/bg-gradient-top.svg'}
        alt="Background Gradient"
        width={1000}
        height={1000}
        className="absolute top-0 right-0"
      />
    </div>
  );
};

export default BgGradient;
