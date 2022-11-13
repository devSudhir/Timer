import React from "react";
export const Timer = ({ hours = 0, minutes = 0, seconds = 0, milisec = 0 }) => {
  const [paused, setPaused] = React.useState(true);
  const [milisecs, setMiliSecs] = React.useState(0);
  const [time, setTime] = React.useState({
    hours: hours,
    minutes: minutes,
    seconds: seconds,
    milisec: milisec
  });

  const tick = () => {
    if (paused) return;
    if (
      time.hours === 0 &&
      time.minutes === 0 &&
      time.seconds === 0 &&
      time.milisec === 0
    ) {
      setPaused(true);
      return;
    } else if (time.minutes === 0 && time.seconds === 0 && time.seconds === 0) {
      if (time.hours >= 1)
        setTime({
          hours: time.hours - 1,
          minutes: 59,
          seconds: 59,
          milisec: 999
        });
      else
        setTime({
          hours: 0,
          minutes: 0,
          seconds: 0,
          milisec: 0
        });
    } else if (time.seconds === 0)
      setTime({
        hours: time.hours,
        minutes: time.minutes - 1,
        seconds: 60,
        milisec: 999
      });
    else if (time.milisec === 0)
      setTime({
        hours: time.hours,
        minutes: time.minutes,
        seconds: time.seconds - 1,
        milisec: 999
      });
    else
      setTime({
        hours: time.hours,
        minutes: time.minutes,
        seconds: time.seconds,
        milisec: time.milisec - 1
      });
  };

  const reset = () => {
    setTime({
      hours: 0,
      minutes: 0,
      seconds: 0,
      milisec: 0
    });
    setPaused(true);
  };

  React.useEffect(() => {
    let timerID = setInterval(() => tick(), 1);
    return () => clearInterval(timerID);
  });

  const handleChange = (e) => {
    setMiliSecs(e.target.value);
  };
  React.useEffect(() => {
    convertMilisecsToHRMMSEC();
  }, [milisecs]);

  const convertMilisecsToHRMMSEC = () => {
    const y = 60 * 60 * 1000;
    const h = Math.floor(milisecs / y);
    const m = Math.floor((milisecs - h * y) / (y / 60));
    const s = Math.floor((milisecs - h * y - m * (y / 60)) / 1000);
    const mi = Math.floor(milisecs - h * y - m * (y / 60) - s * 1000);
    console.log("hr", h, "mm", m, "sec", s, "mi", mi);
    setTime({
      hours: h,
      minutes: m,
      seconds: s,
      milisec: mi
    });
  };

  return (
    <div>
      <p>{`${time.hours
        .toString()
        .padStart(2, "0")}:${time.minutes
        .toString()
        .padStart(2, "0")}:${time.seconds
        .toString()
        .padStart(2, "0")}:${time.milisec.toString().padStart(3, "0")}`}</p>

      <input type="number" onChange={(e) => handleChange(e)} />
      <br />
      <button onClick={() => setPaused(!paused)}>
        {paused ? "Start" : "Pause"}
      </button>

      <button onClick={() => reset()}>Restart</button>
    </div>
  );
};
