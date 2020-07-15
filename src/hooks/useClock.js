import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";

function FormatDate(date) {
  const HH = `0${date.getHours()}`.slice(-2);
  const MM = `0${date.getMinutes()}`.slice(-2);
  const SS = `0${date.getSeconds()}`.slice(-2);
  return `${HH}:${MM}:${SS}`;
}

function useClock() {
  const [timeString, setTimeString] = useState("");

  useEffect(() => {
    const clockIterval = setInterval(() => {
      const now = new Date();

      const newTimeString = FormatDate(now);

      setTimeString(newTimeString);
    }, 1000);

    return () => {
      clearInterval(clockIterval);
    };
  });

  return { timeString };
}

export default useClock;
