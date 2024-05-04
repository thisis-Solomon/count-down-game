import { useRef, useState } from "react";
import ResultModal from "./ResultModal";

type TimerChallengePropsT = {
  title: string;
  targetTime: number;
};

export default function TimerChallenge({
  title,
  targetTime,
}: TimerChallengePropsT): JSX.Element {
  const timer = useRef();
  const dialog = useRef();

  const [timeRemaining, setTimeRemaining] = useState(targetTime * 1000);

  const timerIsActive: boolean =
    timeRemaining > 0 && timeRemaining < targetTime * 1000;

  if (timeRemaining <= 0) {
    clearInterval(timer.current);
    dialog.current.open();
  }

  const handleStartChallenge = () => {
    timer.current = setInterval(() => {
      setTimeRemaining((prevTimeRemaining) => prevTimeRemaining - 10);
    }, 10);
  };

  const onResetTime = (): void => {
    setTimeRemaining(targetTime * 1000);
  };

  const handleStopChallenge = () => {
    clearInterval(timer.current);
    dialog.current.open();
  };

  return (
    <>
      <ResultModal
        timeRemaining={timeRemaining}
        onReset={onResetTime}
        result="Lost"
        targetTime={targetTime}
        ref={dialog}
      />
      <section className="border my-3 mx-2 py-5 shadow max-w-sm flex flex-col gap-2 items-center">
        <h2>{title}</h2>
        <p>
          {targetTime} second{targetTime > 1 ? "s" : ""}
        </p>
        <p>
          <button
            onClick={timerIsActive ? handleStopChallenge : handleStartChallenge}
            className="bg-blue-500 px-4 py-2 rounded-md shadow"
          >
            {timerIsActive ? "Stop" : "Start"} Challenge
          </button>
        </p>
        <p>{timerIsActive ? "Time is running..." : "Timer inactive"}</p>
      </section>
    </>
  );
}
