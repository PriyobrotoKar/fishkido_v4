import { cn } from '@/lib/utils';
import React from 'react';

export type Status = 'online' | 'offline' | 'away' | 'dnd' | 'idle';

type StatusConfig = {
  color: string;
  description: string;
};

export const statusConfig: Record<Status, StatusConfig> = {
  online: { color: 'bg-green-700', description: 'online' },
  offline: { color: 'bg-gray-500', description: 'offline' },
  away: { color: 'bg-yellow-500', description: 'away' },
  dnd: { color: 'bg-red-500', description: 'do not disturb' },
  idle: { color: 'bg-blue-500', description: 'idle' },
};

interface StatusBadgeProps {
  status: Status;
}

const StatusBadge = ({ status }: StatusBadgeProps) => {
  return (
    <span
      className={cn(
        'bg-destructive rounded-full px-1.5 py-0.5 text-xs font-bold',
        statusConfig[status].color
      )}
    >
      {status.toUpperCase()}
    </span>
  );
};

export default StatusBadge;
