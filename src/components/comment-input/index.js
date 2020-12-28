import React, { useState, useContext } from "react";
import "./style.css";
import { UserContext } from "../../contexts/user";
import { db } from "../../firebase";
import CommentIcon from '@material-ui/icons/Comment';

export default function CommentInput({ comments, id }) {
  const [user, setUser] = useContext(UserContext).user;
  const [comment, setComment] = useState("");
  const [commentArray, setCommentArray] = useState(
    comments ? comments : []
    );

  const addComment = () => {
    if (comment != "") {
      // add comment to the post info
      commentArray.push({
        comment: comment,
        username: user.email.replace("@gmail.com", "").toLowerCase(),
      });

      db.collection("posts")
        .doc(id)
        .update({
          comments: commentArray,
        })
        .then(function () {
          setComment("");
          console.log("comment added");
        })
        .catch(function (error) {
          console.log(`Error ${error}`);
        });
    }
  };

  return (
    <div className="commentInput">
      <textarea
        className="commentInput_textarea"
        rows="1"
        placeholder="Write a comment ..."
        value={comment}
        onChange={(e) => setComment(e.target.value)}
      ></textarea>

      <button 
      onClick={addComment} 
      className="commentInput_btn"
      style={{  cursor: "pointer"}}>
       <b><CommentIcon style={{ fontSize:"30px"}}/></b>
      </button>
    </div>
  );
}