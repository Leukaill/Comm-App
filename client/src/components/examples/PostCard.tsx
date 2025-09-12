import PostCard from '../PostCard';

export default function PostCardExample() {
  const samplePosts = [
    {
      id: "1",
      author: {
        name: "Sarah Wilson",
        title: "Marketing Director at TechCorp",
        avatar: undefined
      },
      content: "Just completed an amazing project with the BPN community! The collaboration and support from fellow professionals has been incredible. Looking forward to sharing insights at next week's networking event.",
      timestamp: "2 hours ago",
      likes: 24,
      comments: 8,
      isLiked: false,
      expiresIn: "28 days",
      onLike: () => {},
      onComment: () => {},
      onShare: () => {}
    },
    {
      id: "2", 
      author: {
        name: "Michael Chen",
        title: "Senior Consultant",
        avatar: undefined
      },
      content: "Excited to announce that our team just secured a major partnership! Thanks to the connections made through BPN. Networking really works when you put in the effort.",
      timestamp: "5 hours ago", 
      likes: 42,
      comments: 15,
      isLiked: true,
      expiresIn: "27 days",
      onLike: () => {},
      onComment: () => {},
      onShare: () => {}
    }
  ];

  return (
    <div className="p-4 space-y-4 max-w-md">
      {samplePosts.map((post) => (
        <PostCard key={post.id} {...post} />
      ))}
    </div>
  );
}