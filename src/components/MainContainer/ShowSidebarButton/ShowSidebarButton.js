import React from "react";
import PropTypes from "prop-types";

const ShowSidebarButton = ({ onShowSidebar, ...otherProps }) => {
  return (
    <button
      type="button"
      onClick={() => {
        onShowSidebar();
      }}
      {...otherProps}
    >
      Show Posts
    </button>
  );
};

ShowSidebarButton.propTypes = {
  onShowSidebar: PropTypes.func,
};

export default ShowSidebarButton;
