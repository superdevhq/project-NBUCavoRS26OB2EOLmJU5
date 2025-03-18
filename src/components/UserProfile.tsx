
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { CalendarDays, MapPin, Link2, Twitter, Github } from "lucide-react";

interface UserProfileProps {
  user: {
    id: string;
    name: string;
    username: string;
    avatar: string;
    bio: string;
    location?: string;
    website?: string;
    twitter?: string;
    github?: string;
    joinedDate: string;
    postCount: number;
    commentCount: number;
    badges: string[];
  };
}

const UserProfile = ({ user }: UserProfileProps) => {
  return (
    <Card className="overflow-hidden">
      <div className="h-32 bg-gradient-to-r from-primary/20 to-primary/40"></div>
      <CardContent className="relative pt-0">
        <div className="-mt-16 flex justify-between">
          <Avatar className="h-32 w-32 border-4 border-background">
            <AvatarImage src={user.avatar} alt={user.name} />
            <AvatarFallback className="text-4xl">{user.name.charAt(0)}</AvatarFallback>
          </Avatar>
          <Button className="mt-16">Follow</Button>
        </div>
        
        <div className="mt-4 space-y-4">
          <div>
            <h2 className="text-2xl font-bold">{user.name}</h2>
            <p className="text-muted-foreground">@{user.username}</p>
          </div>
          
          <p>{user.bio}</p>
          
          <div className="flex flex-wrap gap-2">
            {user.badges.map((badge) => (
              <Badge key={badge} variant="secondary">
                {badge}
              </Badge>
            ))}
          </div>
          
          <div className="grid gap-2 text-sm text-muted-foreground">
            {user.location && (
              <div className="flex items-center gap-2">
                <MapPin className="h-4 w-4" />
                <span>{user.location}</span>
              </div>
            )}
            
            {user.website && (
              <div className="flex items-center gap-2">
                <Link2 className="h-4 w-4" />
                <a 
                  href={user.website} 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="text-primary hover:underline"
                >
                  {user.website.replace(/^https?:\/\//, '')}
                </a>
              </div>
            )}
            
            {user.twitter && (
              <div className="flex items-center gap-2">
                <Twitter className="h-4 w-4" />
                <a 
                  href={`https://twitter.com/${user.twitter}`} 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="text-primary hover:underline"
                >
                  @{user.twitter}
                </a>
              </div>
            )}
            
            {user.github && (
              <div className="flex items-center gap-2">
                <Github className="h-4 w-4" />
                <a 
                  href={`https://github.com/${user.github}`} 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="text-primary hover:underline"
                >
                  {user.github}
                </a>
              </div>
            )}
            
            <div className="flex items-center gap-2">
              <CalendarDays className="h-4 w-4" />
              <span>Joined {new Date(user.joinedDate).toLocaleDateString()}</span>
            </div>
          </div>
          
          <div className="flex gap-6 border-t pt-4">
            <div>
              <p className="text-2xl font-bold">{user.postCount}</p>
              <p className="text-sm text-muted-foreground">Posts</p>
            </div>
            <div>
              <p className="text-2xl font-bold">{user.commentCount}</p>
              <p className="text-sm text-muted-foreground">Comments</p>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default UserProfile;
