import React, { useState } from "react";
import PropTypes from "prop-types";
import classNames from "classnames";

import "./ImagePost.scss";

const ImagePost = ({ imageUrl, alt, ...otherProps }) => {
  const [isImageLoaded, setIsImageLoaded] = useState(false);
  return (
    <img
      src={imageUrl}
      alt={alt}
      onLoad={() => {
        setIsImageLoaded(true);
      }}
      className={classNames({
        postImage: true,
        visible: isImageLoaded,
      })}
      {...otherProps}
    />
  );
};

ImagePost.propTypes = {
  imageUrl: PropTypes.string.isRequired,
  alt: PropTypes.string.isRequired,
};

export default ImagePost;
