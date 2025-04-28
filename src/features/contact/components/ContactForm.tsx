'use client';

import React, { ReactNode } from 'react';
import { MenuType } from './Menu';
import TwitchForm from './TwitchForm';
import DiscordForm from './DiscordForm';
import { useSearchParams } from 'next/navigation';
import QueryForm from './QueryForm';
import OtherForm from './OtherForm';

const forms: Record<MenuType, ReactNode> = {
  twitch: <TwitchForm />,
  discord: <DiscordForm />,
  query: <QueryForm />,
  other: <OtherForm />,
};

const ContactForm = () => {
  const params = useSearchParams();
  const type = params.get('type') as MenuType | null;

  if (!type) {
    return null;
  }

  return <div>{forms[type]}</div>;
};

export default ContactForm;
