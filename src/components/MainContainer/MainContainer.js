import React from "react";
import PropTypes from "prop-types";
import ShowSidebarButton from "./ShowSidebarButton";
import PostContent from "../PostContent";

import "./MainContainer.scss";

const MainContainer = ({
  post,
  isSidebarVisible,
  onShowSidebar,
  markPostAsReaded,
  ...otherProps
}) => {
  return (
    <section {...otherProps}>
      <header className="postHeader">
        {!isSidebarVisible ? (
          <ShowSidebarButton onShowSidebar={onShowSidebar} />
        ) : null}
      </header>
      <PostContent
        className="postContent"
        markPostAsReaded={markPostAsReaded}
        post={post}
      />
    </section>
  );
};

MainContainer.propTypes = {
  post: PropTypes.shape({
    author: PropTypes.string.isRequired,
    commentCount: PropTypes.number,
    createdUTC: PropTypes.number.isRequired,
    url: PropTypes.string,
    thumbnail: PropTypes.string,
    title: PropTypes.string.isRequired,
    type: PropTypes.string,
  }),
  isSidebarVisible: PropTypes.bool,
  onShowSidebar: PropTypes.func.isRequired,
  markPostAsReaded: PropTypes.func.isRequired,
};

export default MainContainer;
