import React from "react";
import PropTypes from "prop-types";
import { useState } from "react";
import { useEffect } from "react";
import useClock from "../../hooks/useClock";

Clock.propTypes = {};

function Clock() {
  const { timeString } = useClock();

  return <p>{timeString}</p>;
}

export default Clock;
