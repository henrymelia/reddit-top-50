const getThumbnail = (url) => {
  return url && (url.startsWith("http") || url.startsWith("https"))
    ? url
    : null;
};

const postAdapter = ({ data: post }) => {
  const {
    title,
    author,
    created_utc: createdUTC,
    num_comments: commentCount,
    name: id,
    post_hint: postHint,
    thumbnail,
    url,
  } = post;
  return {
    author,
    createdUTC,
    commentCount,
    id,
    thumbnail: getThumbnail(thumbnail),
    type: postHint,
    title,
    url,
  };
};

export default async (response) => {
  const parsedResponse = await response.json();
  const posts = parsedResponse?.data?.children;
  return posts.map(postAdapter);
};
