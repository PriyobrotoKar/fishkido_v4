import React from 'react';

interface StatusBadgeProps {
  status: 'online' | 'offline' | 'away' | 'dnd';
}

const StatusBadge = ({ status }: StatusBadgeProps) => {
  return (
    <span className="bg-destructive rounded-full px-1.5 py-0.5 text-xs font-bold">
      {status.toUpperCase()}
    </span>
  );
};

export default StatusBadge;
