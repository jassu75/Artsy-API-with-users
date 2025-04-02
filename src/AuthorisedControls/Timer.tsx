import { useEffect, useState } from "react";
import { handleInterval } from "../utils/handleFavorites.utils";
import styles from "./timer.module.css";

const Timer = ({ createdAt }: { createdAt: Date }) => {
  const [timer, setTimer] = useState<string | null>(null);
  useEffect(() => {
    const updateTime = () => {
      const time = handleInterval(createdAt);
      setTimer(time);
    };
    updateTime();
    const intervalId = setInterval(updateTime, 1000);
    return () => clearInterval(intervalId);
  }, [createdAt]);
  return <span className={styles.time_interval_text}>{timer}</span>;
};

export default Timer;
