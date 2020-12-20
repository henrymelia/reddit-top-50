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

const singleColMediaQuery = "(max-width: 60rem)";

const SideBar = ({ onHideSidebar, ...props }) => {
  const [posts, isFetching, selectedPost] = useSelector((state) => [
    state.posts.postList,
    state.posts.pending,
    state.posts.selectedPost,
  ]);
  const dispatch = useDispatch();
  const isSingleColumnMode = useMediaQuery(singleColMediaQuery);

  useEffect(() => {
    dispatch(fetchPosts());
  }, []);

  useEffect(() => {
    if (selectedPost && isSingleColumnMode) {
      onHideSidebar();
    }
  }, [selectedPost, isSingleColumnMode]);

  const onPostSelect = (post) => dispatch(selectPost(post));
  const onPostDismiss = (post) => dispatch(dismissPost(post));
  const onDismissAll = () => dispatch(dismissAllPosts());

  const mainContent = isFetching ? (
    <span>Retrieving posts...</span>
  ) : (
    <PostList>
      {posts.map((post) => {
        const { id, readed, type } = post;
        console.log("type: ", type);
        return (
          <PostListItem
            key={id}
            post={post}
            onPostSelect={onPostSelect}
            onPostDismiss={onPostDismiss}
            className={classNames({ readed })}
          />
        );
      })}
    </PostList>
  );

  return (
    <aside {...props}>
      <header>
        <button type="button" style={{ float: "left" }} onClick={onHideSidebar}>
          ✖️
        </button>
        <h1>Top Posts {isSingleColumnMode ? "(SC)" : "(DC)"}</h1>
        <button type="button" onClick={onDismissAll}>
          Dismiss All
        </button>
      </header>
      {mainContent}
    </aside>
  );
};

SideBar.propTypes = {
  onHideSidebar: PropTypes.func.isRequired,
};

export default SideBar;
