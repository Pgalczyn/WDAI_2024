import { useEffect, useState } from "react";
import Komentarz from "./Komentarz";

interface user {
  id: number;
  username: string;
  fullName: string;
}

interface Comment {
  id: number;
  body: string;
  postId: number;
  likes: number;
  disLikes: number;
  user: user;
}

function Komentarze() {
  const [comments, setComments] = useState<Comment[]>([]);

  useEffect(() => {
    fetch("https://dummyjson.com/comments")
      .then((responese) => responese.json())
      .then((data) => {
        setComments(data.comments);
      });
  }, []);

  return (
    <>
      {comments.map((comment) => (
        <Komentarz
          key={comment.id}
          id={comment.id}
          body={comment.body}
          postId={comment.postId}
          likes={comment.likes}
          disLikes={comment.disLikes}
          user={comment.user}
        ></Komentarz>
      ))}
    </>
  );
}

export default Komentarze;
