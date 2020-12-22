import React from "react";
import PropTypes from "prop-types";

const NoPostsNotification = ({ onPostsRefresh, ...otherProps }) => (
  <div {...otherProps}>
    <div>
      <span>No posts to show.</span>
    </div>
    <div>
      <button type="button" onClick={onPostsRefresh}>
        Check Updates
      </button>
    </div>
  </div>
);

NoPostsNotification.propTypes = {
  onPostsRefresh: PropTypes.func,
};

export default NoPostsNotification;
