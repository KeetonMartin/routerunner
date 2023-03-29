import React from 'react';
import { useSpring, animated } from 'react-spring';

function WelcomeMessage() {
  const fadeAnimation = useSpring({
    from: { opacity: 0 },
    to: { opacity: 1 },
    delay: 500,
  });

  return (
    <animated.div style={fadeAnimation}>
      <h1 className='text-5xl font-bold'>Welcome to RouteRunner</h1>
      <p className="py-6">You tell us which city-pair you fly the most, we'll tell you which credit card to get to optimize your points or miles.</p>
    </animated.div>
  );
}

export default WelcomeMessage;
