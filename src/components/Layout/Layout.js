import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import classNames from "classnames";
import SideBar from "../Sidebar";
import MainContainer from "../MainContainer";
import { setReadedPost } from "../../actions/posts-actions";

import "./Layout.scss";

const Layout = () => {
  const [shouldDisplaySidebar, setShouldDisplaySidebar] = useState(true);
  const selectedPost = useSelector((state) => state.posts.selectedPost);
  const dispatch = useDispatch();

  return (
    <>
      <SideBar
        className={classNames({
          sidebar: true,
          "is-collapsed": !shouldDisplaySidebar,
        })}
        onHideSidebar={() => setShouldDisplaySidebar(false)}
      />
      <MainContainer
        className={classNames({
          content: true,
          "is-full-width": !shouldDisplaySidebar,
        })}
        post={selectedPost}
        isSidebarVisible={shouldDisplaySidebar}
        onShowSidebar={() => setShouldDisplaySidebar(true)}
        markPostAsReaded={(post) => {
          dispatch(setReadedPost(post));
        }}
        aria-label="Main Content"
      />
    </>
  );
};

export default Layout;
