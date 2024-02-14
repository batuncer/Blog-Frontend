import React, { useEffect, useState } from "react";
import { styled } from "@mui/material/styles";
import Card from "@mui/material/Card";
import CardHeader from "@mui/material/CardHeader";
import CardContent from "@mui/material/CardContent";
import CardActions from "@mui/material/CardActions";
import Collapse from "@mui/material/Collapse";
import Avatar from "@mui/material/Avatar";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import FavoriteIcon from "@mui/icons-material/Favorite";
import CommentIcon from "@mui/icons-material/Comment";
import Skeleton from "@mui/material/Skeleton";
import { Box } from "@mui/material";
import Comment from "../../types/CommentTypes";
import commentService from "../../services/commentService";
import CommentCard from "../comment/CommentCard";
import { Post } from "../../types/PostTypes"; // Post arayüzünü import ettik
import CreateCommentForm from "../comment/CreateComment";

interface PostProps {
  post: Post;
}

interface ExpandMoreProps {
  expand: boolean;
}

const ExpandMore = styled((props: ExpandMoreProps) => {
  const { expand, ...other } = props;
  return <IconButton {...other} />;
})(({ theme, expand }) => ({
  transform: !expand ? "rotate(0deg)" : "rotate(180deg)",
  marginLeft: "auto",
  transition: theme.transitions.create("transform", {
    duration: theme.transitions.duration.shortest,
  }),
}));

const PostCardSkeleton = () => {
  return (
    <Box sx={{ width: "100%" }}>
      <Card sx={{ width: "100%", backgroundColor: "#f0c692" }}>
        <CardHeader
          avatar={
            <Skeleton
              animation="wave"
              variant="circular"
              width={40}
              height={40}
            />
          }
          title={<Skeleton animation="wave" height={10} />}
        />

        <CardContent>
          <Typography variant="body2" color="text.secondary">
            <Skeleton
              animation="wave"
              height={10}
              style={{ marginBottom: 6 }}
            />
            <Skeleton
              animation="wave"
              height={10}
              style={{ marginBottom: 6 }}
            />
            <Skeleton
              animation="wave"
              height={10}
              style={{ marginBottom: 6 }}
            />
          </Typography>
        </CardContent>
        <CardActions disableSpacing>
          <IconButton aria-label="likes">
            <Skeleton
              animation="wave"
              variant="circular"
              width={24}
              height={24}
            />
          </IconButton>
          <ExpandMore expand={false} />
        </CardActions>
        <Collapse in={true} timeout="auto" unmountOnExit>
          <CardContent>
            <Typography paragraph>
              <Skeleton
                animation="wave"
                height={10}
                style={{ marginBottom: 6 }}
              />
              <Skeleton
                animation="wave"
                height={10}
                style={{ marginBottom: 6 }}
              />
              <Skeleton
                animation="wave"
                height={10}
                style={{ marginBottom: 6 }}
              />
            </Typography>
          </CardContent>
        </Collapse>
      </Card>
    </Box>
  );
};

const PostCard: React.FC<PostProps> = ({ post }) => {
  const [username, setUsername] = useState<string | null>(null);
  const [expanded, setExpanded] = useState(false);
  const [isLiked, setIsLiked] = useState(false);
  const [postLikesCount, setPostLikesCount] = useState<number[]>(
    post.postLikes ?? []
  );
  const [isLoading, setIsLoading] = useState(false);
  const [comments, setComments] = useState<Comment[]>([]);

  const fetchComments = async () => {
    try {
      setIsLoading(true);
      const commentsDataForPost = await commentService.getAllComments(post.id);
      setComments(commentsDataForPost);
      setIsLoading(false);
    } catch (error) {
      console.error(`Error fetching comments for post ${post.title}:`, error);
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchComments();
  }, []);

  const handleLike = () => {
    if (!isLiked) {
      setPostLikesCount((prevLikes) => [...prevLikes, post.userId ?? 0]);
    } else {
      setPostLikesCount((prevLikes) =>
        prevLikes.filter((like) => like !== post.userId)
      );
    }
    setIsLiked(!isLiked);
  };

  const handleExpandClick = () => {
    setExpanded(!expanded);
  };

  const createComment = (newComment: Comment) => {
    fetchComments();
  };

  return (
    <>
      {isLoading ? (
        <PostCardSkeleton />
      ) : (
        <Box sx={{ width: "100%" }}>
          <Card sx={{ width: "100%", backgroundColor: "#E7E3E4" }}>
            <CardHeader
              avatar={
                <Avatar sx={{ bgcolor: "#5A6C73" }} aria-label="recipe">
                  {username?.charAt(0)}
                </Avatar>
              }
              title={post.title}
            />

            <CardContent>
              <Typography variant="body2" color="text.secondary">
                {post.text}
              </Typography>
            </CardContent>
            <CardActions
              disableSpacing
              sx={{ justifyContent: "space-between" }}
            >
              <IconButton onClick={handleLike} aria-label="likes">
                <FavoriteIcon
                  style={{ color: postLikesCount.length > 0 ? "red" : "grey" }}
                />
                <Typography variant="body2" color="text.secondary">
                  {postLikesCount.length > 0 && postLikesCount.length}
                </Typography>
              </IconButton>
              <IconButton
                onClick={handleExpandClick}
                aria-expanded={expanded}
                aria-label="Comments"
              >
                <CommentIcon />
              </IconButton>
            </CardActions>
            <Collapse in={expanded} timeout="auto" unmountOnExit>
              <CardContent>
                <Typography paragraph>Comments:</Typography>
                <CreateCommentForm onSubmit={createComment} postId={post.id} />
                {comments.map((comment) => (
                  <CommentCard
                    key={comment.id}
                    text={comment.text}
                    user_name={comment.userName}
                  />
                ))}
              </CardContent>
            </Collapse>
          </Card>
        </Box>
      )}
    </>
  );
};

export default PostCard;
