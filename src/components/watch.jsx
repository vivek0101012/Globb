import { useEffect, useState } from "react";

export default function Watch() {
  const [time, setTime] = useState(new Date());

  useEffect(() => {
    const timer = setInterval(() => {
      setTime(new Date());
    }, 1000);

    return () => clearInterval(timer); // cleanup
  }, []);

  return (
    <div className="text-white p-1 rounded-2xl flex flex-col items-center justify-center">
      <p className="text-[5px] uppercase opacity-50">Current Time</p>
      <h1 className="text-[16px] font-bold tracking-wider">{time.toLocaleTimeString()}</h1>
    </div>
  );
}
