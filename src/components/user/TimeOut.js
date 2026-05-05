import { useEffect, useState } from "react";

const TimeOut = (props) => {
  const [count, setCount] = useState(300);
  const { timeUp } = props;
  const formatTime = (seconds) => {
    const h = Math.floor(seconds / 3600);
    const m = Math.floor((seconds % 3600) / 60);
    const s = seconds % 60;

    return [h, m, s].map((v) => String(v).padStart(2, "0")).join(":");
  };
  useEffect(() => {
    if (count === 0) {
      timeUp();
      return;
    }

    const timer = setInterval(() => {
      setCount(count - 1);
    }, 1000);
    return () => {
      clearInterval(timer);
    };
  }, [count, timeUp]);
  return <div>{formatTime(count)}</div>;
};

export default TimeOut;
