import React from 'react';
import { getAbout } from '../actions/getAbout';

const About = async () => {
  const about = await getAbout();

  return (
    <p className="px-8 text-center md:px-20 md:text-xl">{about.data?.bio}</p>
  );
};

export default About;
