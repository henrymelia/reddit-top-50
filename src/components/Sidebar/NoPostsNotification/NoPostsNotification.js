import React from "react";
import PropTypes from "prop-types";

const NoPostsNotification = ({ onPostsRefresh, ...otherProps }) => (
  <div {...otherProps}>
    <div>
      <span>No posts to show.</span>
    </div>
    {onPostsRefresh ? (
      <div>
        <button type="button" onClick={onPostsRefresh}>
          Check Updates
        </button>
      </div>
    ) : null}
  </div>
);

NoPostsNotification.propTypes = {
  onPostsRefresh: PropTypes.func.isRequired,
};

export default NoPostsNotification;
