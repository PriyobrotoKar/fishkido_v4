'use client';

import React, { useEffect } from 'react';
import StatusBadge, { Status, statusConfig } from './StatusBadge';
import Image from 'next/image';

const Activity = () => {
  const [status, setStatus] = React.useState<Status>('offline');

  useEffect(() => {
    const ws = new WebSocket('wss://api.lanyard.rest/socket');

    ws.onopen = () => {
      console.log('WebSocket connection opened');
    };

    ws.onmessage = (event) => {
      const data = JSON.parse(event.data);

      if (data.op === 1) {
        const heartbeatInterval: number = data.d.heartbeat_interval;

        ws.send(
          JSON.stringify({
            op: 2,
            d: {
              subscribe_to_id: '534064040788492295',
            },
          })
        );

        setInterval(() => {
          ws.send(
            JSON.stringify({
              op: 3,
            })
          );
        }, heartbeatInterval);
      }

      if (data.op === 0) {
        const status = data.d.discord_status;
        setStatus(status);
      }
    };
  }, []);

  return (
    <div className="space-y-1.5 text-sm">
      <div className="space-x-5">
        <StatusBadge status={status} />
        <span>Currently {statusConfig[status].description} on Discord</span>
      </div>
      <div className="space-x-5">
        <span>
          <Image
            src={'/music.svg'}
            alt="Music Waveform"
            width={25}
            height={10}
            className="inline-block"
          />
        </span>
        <span>Not listening to Spotify</span>
      </div>
    </div>
  );
};

export default Activity;
