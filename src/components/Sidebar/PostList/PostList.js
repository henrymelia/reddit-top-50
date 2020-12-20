import React from "react";
import PropTypes from "prop-types";

import "./PostList.scss";

const PostList = ({ children, ...otherProps }) => {
  return <ul {...otherProps}>{children}</ul>;
};

PostList.propTypes = {
  children: PropTypes.arrayOf(PropTypes.element).isRequired,
};

export default PostList;
