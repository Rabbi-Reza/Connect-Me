import React, { useState, useContext } from "react";
import "./style.css";
import { Comment } from "../../components";
import { storage, db } from "../../firebase";
import CommentInput from "../../components/comment-input";
import { UserContext } from "../../contexts/user";
import ThumbUpAltIcon from '@material-ui/icons/ThumbUpAlt';
import DeleteForeverIcon from '@material-ui/icons/DeleteForever';

export default function Post({
    profileUrl,
    username,
    id,
    photoURl,
    caption,
    comments,
    timestamp,
    likeNum,
    isClick
  }) {

    const [user, setUser] = useContext(UserContext).user;

    const deletePost = () => {
        //1 delete the image from firebase storage
        // get ref to the image file we like to delete
        var imageRef = storage.refFromURL(photoURl);
    
        // delete the file
        imageRef
          .delete()
          .then(function () {
            console.log("Photo delete successfull");
          })
          .catch(function (error) {
            console.log(`Error: ${error}`);
          });
    
        //2 delete the post info from firebase firestore
        db.collection("posts")
          .doc(id)
          .delete()
          .then(function () {
            console.log("Deleted post info successfully");
          })
          .catch(function (error) {
            console.log(`Error post info delete ${error}`);
          });
      };

      const likePost = () => {
        db.collection("posts").doc(id)
        .update({
          likeNum: likeNum + 1,
          isClick: username +"-true"  
        });
      };

    return (
       
        <div className="post">
            <div className="post_header">
                <div className="post_headerLeft">
                    <img className="post_profilePic" src={profileUrl} alt="profileUrl" />
                    <p style={{ marginLeft: "8px" }}>{username}</p>
                </div>

             {/* { console.log((user.email == `${username}@gmail.com`))} */}
                { user ?
                <button 
                onClick={deletePost}
                className="post_delete" style={{ color: "red" }} >
                    <p style={{ display : (user.email == `${username}@gmail.com`) ? "" : "none" }} ><DeleteForeverIcon/></p>
                </button> :
                <></>}
            </div>

            <div className="post_center">
                <img className="post_photoUrl" src={photoURl} alt="photoURl"/>
            </div>

            <hr/>
            <div>
                <p>
                    <span 
                    style={{ 
                        fontWeight: "600", 
                        marginRight: "8px", 
                        color:"#3679ff"
                        }}>
                        ' {caption} ' 
                    </span>
                    {/* Edit */}
                </p>

                <label className="post_like" onClick={likePost}>
                { user ? 
                      <i> {`${likeNum} People liked `}{(user.email == `${username}@gmail.com`) ? "your" : "the" } {`post`}</i> :
                      <i> {`${likeNum} People liked the post`}</i> }

                      { user ? 
                      <ThumbUpAltIcon 
                      style={{ 
                        display : (user.email == `${username}@gmail.com`)  ? "none" : "", 
                        cursor: "pointer", 
                        fontSize: "20px",
                        color: "#944dff" }} /> :
                        <> </> }
                </label>
            </div>
            <hr/>
            {/* <div>
               {console.log(timestamp.toDate())}
            </div> */}
            {comments ?  <b>Comments :</b>  : ""}
            {comments ? (
                comments.map((comment) => (
                  <Comment 
                  username={comment.username} 
                  caption={comment.comment}
                  />
                  ))
                  ) : (
                  <></>
            )}
            {
                user ? <CommentInput 
                comments={comments} 
                id={id} 
                /> : <></>
            }
        </div>
    )
}

