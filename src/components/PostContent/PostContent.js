import React, { useEffect } from "react";
import PropTypes from "prop-types";
import ByAuthor from "../ByAuthor";
import TimeElapsed from "../TimeElapsed";
import ImagePost from "../ImagePost";

import "./PostContent.scss";

const getPostContent = (post) => {
  const { thumbnail, type, url } = post;

  switch (type) {
    case "image":
      return url ? <ImagePost key={url} imageUrl={url} /> : null;
    case "link":
      return (
        <a href={url} target="_blank" rel="noreferrer">
          <img key={thumbnail} alt="" src={thumbnail} />
          {url}
        </a>
      );
    default:
      return <span>Post content not supported yet.</span>;
  }
};

const PostContent = ({ post, markPostAsReaded, ...otherProps }) => {
  if (!post) {
    return <section className="noPostSelectedMsg">👈 Pick a post</section>;
  }

  const { author, createdUTC, title } = post;

  useEffect(() => {
    markPostAsReaded(post); // This fn can be called using a cancellable debounce.
  });

  return (
    <article {...otherProps}>
      <h1>{title}</h1>
      <small>
        <ByAuthor author={author} />, <TimeElapsed sinceDate={createdUTC} />
      </small>
      <article>{getPostContent(post)}</article>
    </article>
  );
};

PostContent.propTypes = {
  post: PropTypes.shape({
    author: PropTypes.string,
    createdUTC: PropTypes.number,
    title: PropTypes.string,
  }),
  markPostAsReaded: PropTypes.func,
};

export default PostContent;
