import { forwardRef, useImperativeHandle, useRef } from "react";
import { createPortal } from "react-dom";

type ResultModalPropsT = {
  targetTime: number;
  timeRemaining: number;
  onReset: () => void;
};

const ResultModal = forwardRef(function ResultModal(
  { targetTime, timeRemaining, onReset }: ResultModalPropsT,
  ref
): JSX.Element {
  const dialog = useRef();

  useImperativeHandle(ref, () => {
    return {
      open() {
        dialog.current.showModal();
      },
    };
  });

  const gameLost = timeRemaining <= 0;
  const formatTimeRemaining = (timeRemaining / 1000).toFixed(2);
  const score = Math.round(1 - timeRemaining / (targetTime * 1000)) * 100;

  return createPortal(
    <dialog ref={dialog} onClose={onReset}>
      {gameLost && <h2>You Lost</h2>}
      {!gameLost && <p>You scored: {score}</p>}
      <p>The target time was {targetTime} seconds.</p>
      <p>You stopped the timer with {formatTimeRemaining} seconds left</p>
      <form method="dialog" onSubmit={onReset}>
        <button>Close</button>
      </form>
    </dialog>,
    document.getElementById("modal")
  );
});

export default ResultModal;
