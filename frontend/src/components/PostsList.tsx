import { Post } from "@/types/post.type";
import PostCard from "./PostCard";

interface PostListProps {
  posts: Post[];
  setPosts: (posts: Post[]) => void;
}

export const PostList = ({ posts, setPosts }: PostListProps) => {
  const handleLikeToggle = (postUpdate: Post) => {
    setPosts(
      posts.map((post) =>
        post.id === postUpdate.id ? { ...postUpdate } : post
      )
    );
  };

  const handleCommentAdded = async (postId: string, comments: number) => {
    setPosts(
      posts.map((post) => (post.id === postId ? { ...post, comments } : post))
    );
  };

  return (
    <div className="space-y-6">
      {posts.map((post) => (
        <PostCard
          key={post.id}
          post={post}
          onLikeToggle={handleLikeToggle}
          onCommentAdded={handleCommentAdded}
        />
      ))}
    </div>
  );
};
