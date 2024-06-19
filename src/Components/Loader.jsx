import React, { useEffect } from 'react';


function Loader({ setLoading }) {
  useEffect(() => {
    // Set a timeout to hide the loader after 3 seconds (3000 milliseconds)
    const timer = setTimeout(() => {
      setLoading(false);
    }, 3000);

    // Clear the timer if the component is unmounted
    return () => clearTimeout(timer);
  }, [setLoading]);

  return (
    <div className="loader">
      <div className="spinner"></div>
    </div>
  );
}

export default Loader;
