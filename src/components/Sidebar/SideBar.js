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
                selectedPost: selectedPost.id === post.id,
              })}
            />
          );
        })}
      </PostList>
    ) : (
      <>
        <span>No posts to show.</span>
        <button type="button" onClick={onCheckForUpdates}>
          Check Updates
        </button>
      </>
    );

  const mainContent = isFetching ? <span>Retrieving posts...</span> : postList;

  return (
    <aside {...props}>
      <header>
        <div className="topButtonsContainer">
          <button
            type="button"
            onClick={onHideSidebar}
            className="closeSidebarButton"
          >
            ✖️
          </button>
          <button
            type="button"
            onClick={onDismissAll}
            className="dimissAllButton"
          >
            Dismiss All
          </button>
        </div>

        <h1>Top Posts {isSingleColumnMode ? "(SC)" : "(DC)"}</h1>
      </header>
      {mainContent}
    </aside>
  );
};

Sidebar.propTypes = {
  onHideSidebar: PropTypes.func.isRequired,
};

export default Sidebar;
