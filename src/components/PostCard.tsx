
import { useState } from "react";
import { Link } from "react-router-dom";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { 
  MessageSquare, 
  ThumbsUp, 
  ThumbsDown, 
  Share, 
  Bookmark
} from "lucide-react";
import { cn } from "@/lib/utils";

export interface PostProps {
  id: string;
  title: string;
  content: string;
  author: {
    name: string;
    avatar: string;
    username: string;
  };
  category: string;
  createdAt: string;
  upvotes: number;
  downvotes: number;
  commentCount: number;
}

const PostCard = ({
  id,
  title,
  content,
  author,
  category,
  createdAt,
  upvotes,
  downvotes,
  commentCount,
}: PostProps) => {
  const [votes, setVotes] = useState({ up: upvotes, down: downvotes });
  const [userVote, setUserVote] = useState<'up' | 'down' | null>(null);
  const [saved, setSaved] = useState(false);

  const handleVote = (type: 'up' | 'down') => {
    if (userVote === type) {
      // Remove vote
      setVotes(prev => ({
        ...prev,
        [type]: prev[type] - 1
      }));
      setUserVote(null);
    } else {
      // Add/change vote
      setVotes(prev => ({
        up: type === 'up' ? prev.up + 1 : userVote === 'up' ? prev.up - 1 : prev.up,
        down: type === 'down' ? prev.down + 1 : userVote === 'down' ? prev.down - 1 : prev.down
      }));
      setUserVote(type);
    }
  };

  const getCategoryColor = (category: string) => {
    const categories: Record<string, string> = {
      "feature": "bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-300",
      "bug": "bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-300",
      "improvement": "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300",
      "discussion": "bg-purple-100 text-purple-800 dark:bg-purple-900 dark:text-purple-300"
    };
    
    return categories[category] || "bg-gray-100 text-gray-800 dark:bg-gray-700 dark:text-gray-300";
  };

  return (
    <Card className="overflow-hidden transition-all hover:shadow-md">
      <CardContent className="p-6">
        <div className="flex items-start justify-between gap-4">
          <div className="flex-1 space-y-2">
            <div className="flex items-center gap-2">
              <Badge className={cn("capitalize", getCategoryColor(category))}>
                {category}
              </Badge>
              <span className="text-xs text-muted-foreground">
                {new Date(createdAt).toLocaleDateString()}
              </span>
            </div>
            
            <Link to={`/post/${id}`} className="group">
              <h3 className="text-xl font-semibold group-hover:text-primary transition-colors">
                {title}
              </h3>
            </Link>
            
            <p className="text-muted-foreground line-clamp-2">{content}</p>
            
            <div className="flex items-center gap-2 pt-2">
              <Avatar className="h-6 w-6">
                <AvatarImage src={author.avatar} alt={author.name} />
                <AvatarFallback>{author.name.charAt(0)}</AvatarFallback>
              </Avatar>
              <span className="text-sm font-medium">{author.name}</span>
              <span className="text-sm text-muted-foreground">@{author.username}</span>
            </div>
          </div>
        </div>
      </CardContent>
      
      <CardFooter className="border-t bg-muted/50 px-6 py-3">
        <div className="flex w-full items-center justify-between">
          <div className="flex items-center gap-4">
            <div className="flex items-center">
              <Button 
                variant="ghost" 
                size="sm" 
                className={cn(userVote === 'up' && "text-primary")}
                onClick={() => handleVote('up')}
              >
                <ThumbsUp className="mr-1 h-4 w-4" />
                <span>{votes.up}</span>
              </Button>
              
              <Button 
                variant="ghost" 
                size="sm"
                className={cn(userVote === 'down' && "text-destructive")}
                onClick={() => handleVote('down')}
              >
                <ThumbsDown className="mr-1 h-4 w-4" />
                <span>{votes.down}</span>
              </Button>
            </div>
            
            <Button variant="ghost" size="sm" asChild>
              <Link to={`/post/${id}`}>
                <MessageSquare className="mr-1 h-4 w-4" />
                <span>{commentCount}</span>
              </Link>
            </Button>
          </div>
          
          <div className="flex items-center gap-1">
            <Button variant="ghost" size="sm">
              <Share className="h-4 w-4" />
            </Button>
            
            <Button 
              variant="ghost" 
              size="sm" 
              onClick={() => setSaved(!saved)}
              className={cn(saved && "text-primary")}
            >
              <Bookmark className="h-4 w-4" />
            </Button>
          </div>
        </div>
      </CardFooter>
    </Card>
  );
};

export default PostCard;
