import { useRef, useState } from "react";
import TimerChallenge from "./components/TimerChallenge";

export default function App() {
  const [playerName, setPlayerName] = useState("");
  const playerNameRef = useRef();

  function onSubmitted(): void {
    setPlayerName(playerNameRef.current.value);
  }

  return (
    <main>
      <section>
        <div>
          <h1>The Almost Final Countdown</h1>
          <p>stop the timer once you estimate that the time is (almost) up</p>
        </div>

        <div>
          <h3>Welcome {playerName ? playerName : "unknown entity"}</h3>
          <div>
            <input
              className="border-2 rounded-sm"
              type="text"
              ref={playerNameRef}
            />
            <button onClick={onSubmitted}>Set Name</button>
          </div>
        </div>
        <TimerChallenge title="Easy" targetTime={1} />
        <TimerChallenge title="Mediam" targetTime={4} />
        <TimerChallenge title="Hard" targetTime={8} />
        <TimerChallenge title="Very Hard" targetTime={12} />
      </section>
    </main>
  );
}
