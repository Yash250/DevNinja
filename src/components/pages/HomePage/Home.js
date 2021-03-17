import React from 'react';
import Section from '../../section/Section';
import { homeObjOne, homeObjTwo, homeObjThree, homeObjFour, homeObjFive, homeObjSix } from './Data';
// import Pricing from '../../Pricing';

const Home = () => {
  return (
    <>
      <Section {...homeObjOne} />
      <Section {...homeObjTwo} />
      <Section {...homeObjFive} />
      <Section {...homeObjThree} />
      <Section {...homeObjFour} />
      <Section {...homeObjSix} />
      {/* <Pricing /> */}
    </>
  );
}

export default Home;
