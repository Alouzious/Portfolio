import { useState, useEffect } from 'react';

function AnimatedProgressProvider({ valueStart, valueEnd, duration, easingFunction, children }) {
  const [value, setValue] = useState(valueStart);

  useEffect(() => {
    let start = null;
    let animationId;

    function animate(timestamp) {
      if (!start) start = timestamp;
      const elapsed = timestamp - start;
      const progress = Math.min(elapsed / (duration * 1000), 1);
      
      // Use easingFunction if provided, otherwise use linear
      const easedProgress = easingFunction ? easingFunction(progress) : progress;
      const easedValue = valueStart + (valueEnd - valueStart) * easedProgress;
      
      setValue(easedValue);
      
      if (progress < 1) {
        animationId = requestAnimationFrame(animate);
      }
    }
    
    animationId = requestAnimationFrame(animate);
    
    // Cleanup function
    return () => {
      if (animationId) {
        cancelAnimationFrame(animationId);
      }
    };
  }, [valueStart, valueEnd, duration, easingFunction]);

  return children(value);
}

export default AnimatedProgressProvider;