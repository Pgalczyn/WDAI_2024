import { useState } from "react";

interface user {
  id: number;
  username: string;
  fullName: string;
}

interface Props {
  id: number;
  body: string;
  postId: number;
  likes: number;
  disLikes: number;
  user: user;
}

function Komentarz(props: Props) {
  const [currentlikes, setLikes] = useState(props.likes);

  const handleLikeEvent = () => {
    setLikes((prev) => prev + 1);
  };

  const handleDisLikeEvent = () => {
    setLikes((prev) => prev - 1);
  };

  return (
    <div className="card mb-4 shadow-sm">
      <div className="card-body">
        <div className="d-flex justify-content-between align-items-center mb-3">
          <div>
            <h5 className="card-title">{props.user.username}</h5>
            <h6 className="card-subtitle text-muted">{props.user.fullName}</h6>
          </div>
        </div>
        <p className="card-text">{props.body}</p>
        <div className="d-flex justify-content-start">
          <button className="btn btn-success mr-3" onClick={handleLikeEvent}>
            👍 Like
          </button>

          <button className=" btn btn-danger  " onClick={handleDisLikeEvent}>
            👎 Dislike
          </button>
          <p className="p-3 text-center fs-4 align-items-center">
            {currentlikes}
          </p>
        </div>
      </div>
    </div>
  );
}

export default Komentarz;
