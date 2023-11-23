import { useEffect } from "react";

function Timer({ secRemaining, dispatch }) {
  const min = Math.floor(secRemaining / 60);
  const sec = secRemaining % 60;

  useEffect(() => {
    const interval = setInterval(() => {
      dispatch({ type: "sec" });
    }, 1000);
    return () => clearInterval(interval);
  }, [dispatch]);

  return (
    <div className="timer">
      {min < 10 && "0"}
      {min} : {sec < 10 && "0"}
      {sec}
    </div>
  );
}

export default Timer;
