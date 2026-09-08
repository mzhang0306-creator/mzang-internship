import React, { useCallback, useState } from "react";
import useCountdown from "../../hooks/useCountdown";

// Reusable auction countdown badge (h/m/s). Hides itself when there is no
// expiry date or once the countdown has completed.
const CountdownTimer = ({ expiryDate }) => {
  const [expired, setExpired] = useState(false);
  const handleComplete = useCallback(() => setExpired(true), []);
  const { timerDays, timerHours, timerMinutes, timerSeconds } = useCountdown(
    expiryDate,
    handleComplete
  );

  if (!expiryDate || expired) return null;

  // Fold any days into the hours so the badge stays in h/m/s form.
  const hours = timerDays * 24 + timerHours;

  return (
    <div className="de_countdown">
      {hours}h {timerMinutes}m {timerSeconds}s
    </div>
  );
};

export default CountdownTimer;
