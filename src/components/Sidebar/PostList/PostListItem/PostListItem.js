/* eslint-disable jsx-a11y/interactive-supports-focus */
/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable jsx-a11y/anchor-is-valid */
import React from "react";
import PropTypes from "prop-types";
import ByAuthor from "../../../ByAuthor";

import "./PostListItem.scss";

const PostListItem = ({ post, onPostSelect, onPostDismiss, ...otherProps }) => {
  const { author, commentCount, thumbnail, title } = post;

  return (
    <li {...otherProps}>
      <a role="button" onClick={() => onPostSelect(post)}>
        <figure>
          {thumbnail ? <img alt="Post X" src={thumbnail} /> : null}
        </figure>
        <div>
          <small
            style={{
              display: "flex",
              flexDirection: "row",
              justifyContent: "space-between",
            }}
          >
            <ByAuthor author={author} />
            <button
              type="button"
              onClick={(e) => {
                e.stopPropagation();
                onPostDismiss(post);
              }}
            >
              Dismiss
            </button>
          </small>
          <h2>{title}</h2>
          <small>{commentCount} comments</small>
        </div>
      </a>
    </li>
  );
};

PostListItem.propTypes = {
  className: PropTypes.string,
  post: PropTypes.shape({
    author: PropTypes.string.isRequired,
    commentCount: PropTypes.number,
    id: PropTypes.string.isRequired,
    readed: PropTypes.bool,
    thumbnail: PropTypes.string,
    title: PropTypes.string,
  }),
  onPostSelect: PropTypes.func,
  onPostDismiss: PropTypes.func,
};

export default PostListItem;
