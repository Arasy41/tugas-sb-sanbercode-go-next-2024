import React, { useState, useEffect } from "react";

function TugasHooks() {
  const [time, setTime] = useState(new Date().toLocaleTimeString());
  const [countdown, setCountdown] = useState(100);

  useEffect(() => {
    const intervalID = setInterval(() => {
      setTime(new Date().toLocaleTimeString());
      setCountdown((prevCountdown) => (prevCountdown > 0 ? prevCountdown - 1 : 0));
    }, 1000);

    return () => clearInterval(intervalID);
  }, []);

  if (countdown === 0) {
    return null;
  }

  return (
    <div className="container-hooks">
      <h1>Now At - {time}</h1>
      <p>Countdown: {countdown}</p>
    </div>
  );
}

export default TugasHooks;