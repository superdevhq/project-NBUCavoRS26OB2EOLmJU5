
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Plus, TrendingUp, Clock, Star } from "lucide-react";
import Navbar from "@/components/Navbar";
import CategoryList from "@/components/CategoryList";
import PostCard, { PostProps } from "@/components/PostCard";
import CreatePostForm from "@/components/CreatePostForm";
import { toast } from "@/hooks/use-toast";

// Mock data for posts
const mockPosts: PostProps[] = [
  {
    id: "1",
    title: "Add dark mode support to the dashboard",
    content: "It would be great to have a dark mode option for the dashboard to reduce eye strain when working late at night. This has been requested by many users and would improve the overall user experience.",
    author: {
      name: "Sarah Johnson",
      avatar: "https://i.pravatar.cc/150?img=1",
      username: "sarahj"
    },
    category: "feature",
    createdAt: "2023-06-15T10:30:00Z",
    upvotes: 42,
    downvotes: 3,
    commentCount: 12
  },
  {
    id: "2",
    title: "Bug: Unable to save changes in profile settings",
    content: "When trying to update my profile information, the save button doesn't respond. I've tried multiple browsers and devices with the same result. This is blocking me from updating my contact information.",
    author: {
      name: "Michael Chen",
      avatar: "https://i.pravatar.cc/150?img=2",
      username: "mikechen"
    },
    category: "bug",
    createdAt: "2023-06-14T15:45:00Z",
    upvotes: 28,
    downvotes: 0,
    commentCount: 8
  },
  {
    id: "3",
    title: "Improve loading times for the analytics page",
    content: "The analytics page takes too long to load, especially when viewing data for longer time periods. Optimizing this would make the product much more usable for data analysis tasks.",
    author: {
      name: "Alex Rivera",
      avatar: "https://i.pravatar.cc/150?img=3",
      username: "alexr"
    },
    category: "improvement",
    createdAt: "2023-06-13T09:15:00Z",
    upvotes: 35,
    downvotes: 2,
    commentCount: 15
  },
  {
    id: "4",
    title: "What metrics do you find most valuable for tracking user engagement?",
    content: "I'm curious what metrics other users are finding most valuable for tracking engagement. Are you looking at time on site, feature usage, or something else? Would love to hear different perspectives.",
    author: {
      name: "Jamie Smith",
      avatar: "https://i.pravatar.cc/150?img=4",
      username: "jamies"
    },
    category: "discussion",
    createdAt: "2023-06-12T14:20:00Z",
    upvotes: 19,
    downvotes: 1,
    commentCount: 24
  }
];

const Index = () => {
  const [posts, setPosts] = useState<PostProps[]>(mockPosts);
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [sortOption, setSortOption] = useState("trending");
  const [createDialogOpen, setCreateDialogOpen] = useState(false);

  const filteredPosts = posts.filter(post => 
    selectedCategory === "all" || post.category === selectedCategory
  );

  const sortedPosts = [...filteredPosts].sort((a, b) => {
    if (sortOption === "trending") {
      return (b.upvotes - b.downvotes) - (a.upvotes - a.downvotes);
    } else if (sortOption === "newest") {
      return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime();
    } else if (sortOption === "most-discussed") {
      return b.commentCount - a.commentCount;
    }
    return 0;
  });

  const handleCreatePost = (newPost: { title: string; content: string; category: string }) => {
    const post: PostProps = {
      id: `${posts.length + 1}`,
      title: newPost.title,
      content: newPost.content,
      author: {
        name: "Current User",
        avatar: "https://i.pravatar.cc/150?img=5",
        username: "currentuser"
      },
      category: newPost.category,
      createdAt: new Date().toISOString(),
      upvotes: 0,
      downvotes: 0,
      commentCount: 0
    };
    
    setPosts([post, ...posts]);
    setCreateDialogOpen(false);
    
    toast({
      title: "Post created",
      description: "Your post has been published successfully",
    });
  };

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      
      <main className="container mx-auto px-4 py-6">
        <div className="flex flex-col gap-6 md:flex-row">
          {/* Sidebar */}
          <div className="w-full md:w-64 lg:w-72">
            <div className="sticky top-20 space-y-6">
              <Dialog open={createDialogOpen} onOpenChange={setCreateDialogOpen}>
                <DialogTrigger asChild>
                  <Button className="w-full">
                    <Plus className="mr-2 h-4 w-4" />
                    Create Post
                  </Button>
                </DialogTrigger>
                <DialogContent className="sm:max-w-[600px]">
                  <CreatePostForm 
                    onSubmit={handleCreatePost}
                    onCancel={() => setCreateDialogOpen(false)}
                  />
                </DialogContent>
              </Dialog>
              
              <CategoryList 
                selectedCategory={selectedCategory}
                onSelectCategory={setSelectedCategory}
              />
            </div>
          </div>
          
          {/* Main content */}
          <div className="flex-1 space-y-6">
            <div className="flex items-center justify-between">
              <h1 className="text-2xl font-bold">
                {selectedCategory === "all" 
                  ? "All Posts" 
                  : `${selectedCategory.charAt(0).toUpperCase() + selectedCategory.slice(1)} Posts`}
              </h1>
              
              <Tabs 
                defaultValue="trending" 
                value={sortOption}
                onValueChange={setSortOption}
                className="w-[400px]"
              >
                <TabsList className="grid w-full grid-cols-3">
                  <TabsTrigger value="trending" className="flex items-center gap-1">
                    <TrendingUp className="h-4 w-4" />
                    <span className="hidden sm:inline">Trending</span>
                  </TabsTrigger>
                  <TabsTrigger value="newest" className="flex items-center gap-1">
                    <Clock className="h-4 w-4" />
                    <span className="hidden sm:inline">Newest</span>
                  </TabsTrigger>
                  <TabsTrigger value="most-discussed" className="flex items-center gap-1">
                    <Star className="h-4 w-4" />
                    <span className="hidden sm:inline">Most Discussed</span>
                  </TabsTrigger>
                </TabsList>
              </Tabs>
            </div>
            
            {sortedPosts.length > 0 ? (
              <div className="space-y-4 animate-fade-in">
                {sortedPosts.map((post) => (
                  <PostCard key={post.id} {...post} />
                ))}
              </div>
            ) : (
              <div className="flex h-60 flex-col items-center justify-center rounded-lg border border-dashed p-8 text-center">
                <h3 className="text-lg font-medium">No posts found</h3>
                <p className="text-muted-foreground">
                  {selectedCategory === "all"
                    ? "Be the first to create a post!"
                    : `No posts found in the ${selectedCategory} category.`}
                </p>
                <Button 
                  className="mt-4"
                  onClick={() => setCreateDialogOpen(true)}
                >
                  <Plus className="mr-2 h-4 w-4" />
                  Create Post
                </Button>
              </div>
            )}
          </div>
        </div>
      </main>
    </div>
  );
};

export default Index;
