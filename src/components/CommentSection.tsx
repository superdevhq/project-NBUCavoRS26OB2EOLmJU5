
import { useState } from "react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Textarea } from "@/components/ui/textarea";
import { ThumbsUp, Reply } from "lucide-react";
import { cn } from "@/lib/utils";

export interface CommentProps {
  id: string;
  content: string;
  author: {
    name: string;
    avatar: string;
    username: string;
  };
  createdAt: string;
  likes: number;
  replies?: CommentProps[];
}

interface CommentSectionProps {
  comments: CommentProps[];
  postId: string;
  onAddComment: (postId: string, comment: string) => void;
}

const CommentItem = ({ comment }: { comment: CommentProps }) => {
  const [liked, setLiked] = useState(false);
  const [likes, setLikes] = useState(comment.likes);
  const [showReplyForm, setShowReplyForm] = useState(false);
  const [replyContent, setReplyContent] = useState("");

  const handleLike = () => {
    if (liked) {
      setLikes(likes - 1);
    } else {
      setLikes(likes + 1);
    }
    setLiked(!liked);
  };

  const handleReply = () => {
    // In a real app, this would submit the reply
    console.log("Reply submitted:", replyContent);
    setReplyContent("");
    setShowReplyForm(false);
  };

  return (
    <div className="space-y-4">
      <div className="flex gap-4">
        <Avatar className="h-10 w-10">
          <AvatarImage src={comment.author.avatar} alt={comment.author.name} />
          <AvatarFallback>{comment.author.name.charAt(0)}</AvatarFallback>
        </Avatar>
        
        <div className="flex-1 space-y-2">
          <div className="flex items-center gap-2">
            <span className="font-medium">{comment.author.name}</span>
            <span className="text-sm text-muted-foreground">
              @{comment.author.username}
            </span>
            <span className="text-xs text-muted-foreground">
              {new Date(comment.createdAt).toLocaleDateString()}
            </span>
          </div>
          
          <p className="text-sm">{comment.content}</p>
          
          <div className="flex items-center gap-4">
            <Button 
              variant="ghost" 
              size="sm" 
              className={cn("px-2", liked && "text-primary")}
              onClick={handleLike}
            >
              <ThumbsUp className="mr-1 h-4 w-4" />
              <span>{likes}</span>
            </Button>
            
            <Button 
              variant="ghost" 
              size="sm" 
              className="px-2"
              onClick={() => setShowReplyForm(!showReplyForm)}
            >
              <Reply className="mr-1 h-4 w-4" />
              <span>Reply</span>
            </Button>
          </div>
          
          {showReplyForm && (
            <div className="mt-4 space-y-2">
              <Textarea
                placeholder="Write a reply..."
                value={replyContent}
                onChange={(e) => setReplyContent(e.target.value)}
                className="min-h-[80px]"
              />
              <div className="flex justify-end gap-2">
                <Button 
                  variant="outline" 
                  size="sm"
                  onClick={() => setShowReplyForm(false)}
                >
                  Cancel
                </Button>
                <Button 
                  size="sm"
                  onClick={handleReply}
                  disabled={!replyContent.trim()}
                >
                  Reply
                </Button>
              </div>
            </div>
          )}
          
          {comment.replies && comment.replies.length > 0 && (
            <div className="mt-4 space-y-4 border-l-2 border-muted pl-4">
              {comment.replies.map((reply) => (
                <CommentItem key={reply.id} comment={reply} />
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

const CommentSection = ({ comments, postId, onAddComment }: CommentSectionProps) => {
  const [newComment, setNewComment] = useState("");

  const handleSubmitComment = () => {
    if (newComment.trim()) {
      onAddComment(postId, newComment);
      setNewComment("");
    }
  };

  return (
    <div className="space-y-6">
      <h3 className="text-xl font-semibold">Comments ({comments.length})</h3>
      
      <Card>
        <CardContent className="p-4">
          <div className="flex gap-4">
            <Avatar className="h-10 w-10">
              <AvatarFallback>U</AvatarFallback>
            </Avatar>
            <div className="flex-1 space-y-2">
              <Textarea
                placeholder="Add a comment..."
                value={newComment}
                onChange={(e) => setNewComment(e.target.value)}
                className="min-h-[100px]"
              />
              <div className="flex justify-end">
                <Button 
                  onClick={handleSubmitComment}
                  disabled={!newComment.trim()}
                >
                  Comment
                </Button>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
      
      <div className="space-y-6">
        {comments.map((comment) => (
          <CommentItem key={comment.id} comment={comment} />
        ))}
      </div>
    </div>
  );
};

export default CommentSection;
