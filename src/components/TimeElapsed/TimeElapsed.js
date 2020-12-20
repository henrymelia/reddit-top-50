import React from "react";
import PropTypes from "prop-types";
import { readableElapsedTimeUTC } from "../../utils/time";

const TimeElapsed = ({ sinceDate }) => {
  return (
    <time dateTime="2008-02-14 20:00">
      {readableElapsedTimeUTC(sinceDate * 1000)}
    </time>
  );
};

TimeElapsed.propTypes = {
  sinceDate: PropTypes.number.isRequired,
};

export default TimeElapsed;
