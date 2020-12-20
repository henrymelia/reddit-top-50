import React from "react";
import PropTypes from "prop-types";

const ByAuthor = ({ author, includeLink = false }) => {
  return (
    <span className="author">
      by{" "}
      {includeLink ? (
        <a rel="author" target="blank" href={`/author/${author}`}>
          {author}
        </a>
      ) : (
        author
      )}
    </span>
  );
};

ByAuthor.defaultProps = {
  includeLink: false,
};

ByAuthor.propTypes = {
  author: PropTypes.string.isRequired,
  includeLink: PropTypes.bool,
};

export default ByAuthor;
