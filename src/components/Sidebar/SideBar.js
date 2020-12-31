import React, { useEffect } from "react";
import PropTypes from "prop-types";
import { useDispatch, useSelector } from "react-redux";
import classNames from "classnames";
import {
  dismissAllPosts,
  dismissPost,
  fetchPosts,
  selectPost,
} from "../../actions/posts-actions";
import PostList from "./PostList/PostList";
import useMediaQuery from "../../utils/hooks/useMediaQuery";
import PostListItem from "./PostList/PostListItem";
import NoPostsNotification from "./NoPostsNotification";

import "./Sidebar.scss";

const singleColMediaQuery = "(max-width: 60rem)";

const Sidebar = ({ onHideSidebar, ...props }) => {
  const [posts, isFetching, selectedPost] = useSelector((state) => [
    state.posts.postList,
    state.posts.pending,
    state.posts.selectedPost,
  ]);
  const dispatch = useDispatch();
  const isSingleColumnMode = useMediaQuery(singleColMediaQuery);

  useEffect(() => {
    if (posts.length < 1) {
      dispatch(fetchPosts());
    }
  }, []);

  useEffect(() => {
    if (selectedPost && isSingleColumnMode) {
      onHideSidebar();
    }
  }, [selectedPost, isSingleColumnMode]);

  const onPostSelect = (post) => dispatch(selectPost(post));
  const onPostDismiss = (post) => dispatch(dismissPost(post));
  const onDismissAll = () => dispatch(dismissAllPosts());
  const onCheckForUpdates = () => dispatch(fetchPosts());

  const postList =
    posts.length > 0 ? (
      <PostList>
        {posts.map((post) => {
          const { id, readed } = post;
          return (
            <PostListItem
              key={id}
              post={post}
              onPostSelect={onPostSelect}
              onPostDismiss={onPostDismiss}
              className={classNames({
                readed,
                selectedPost: selectedPost?.id === post.id,
              })}
              data-testid={id}
            />
          );
        })}
      </PostList>
    ) : (
      <NoPostsNotification onPostsRefresh={onCheckForUpdates} />
    );

  const mainContent = isFetching ? <span>Retrieving posts...</span> : postList;

  return (
    <aside {...props}>
      <header>
        <div className="topButtonsContainer">
          <div className="leftPanel">
            <button
              type="button"
              onClick={onHideSidebar}
              className="closeSidebarButton"
            >
              ✖️
            </button>
          </div>
          <div className="rightPanel">
            <button type="button" onClick={onCheckForUpdates}>
              Refresh
            </button>
            <button
              type="button"
              onClick={onDismissAll}
              className="dimissAllButton"
            >
              Dismiss All
            </button>
          </div>
        </div>
        <h1>Top Posts</h1>
      </header>
      {mainContent}
    </aside>
  );
};

Sidebar.propTypes = {
  onHideSidebar: PropTypes.func.isRequired,
};

export default Sidebar;
