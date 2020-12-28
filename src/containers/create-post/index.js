import React, { useContext, useState } from "react";
import "./style.css";
import { SignInBtn } from "../../components";
import { UserContext } from "../../contexts/user";

import AddAPhotoIcon from "@material-ui/icons/AddAPhoto";
import { storage, db } from "../../firebase";
import makeid from "../../helper/functions";

import firebase from "firebase";

export default function CreatePost() {
  const [user, setUser] = useContext(UserContext).user;
  const [caption, setCaption] = useState("");

  const [image, setImage] = useState(null);

  const [progress, setProgress] = useState(0);

  const handleChange = (e) => {
    if (e.target.files[0]) {
      setImage(e.target.files[0]);

      var selectedImageSrc = URL.createObjectURL(e.target.files[0]);

      var imagePreview = document.getElementById("image-preview");
      imagePreview.src = selectedImageSrc;
      imagePreview.style.display = "block";
    }
  };

  const handleUpload = () => {
    if (image) {
      var imageName = makeid(10);
      const uploadTask = storage.ref(`images/${imageName}.jpg`).put(image);

      uploadTask.on(
        "state_changed",
        (snapshot) => {
          // progress function 1%,2%...

          const progress = Math.round(
            (snapshot.bytesTransferred / snapshot.totalBytes) * 100
          );

          setProgress(progress);
        },
        (error) => {
          console.log(error);
        },
        () => {
          // get download url and upload the post info

          storage
            .ref("images")
            .child(`${imageName}.jpg`)
            .getDownloadURL()
            .then((imageUrl) => {
              db.collection("posts").add({
                timestamp: firebase.firestore.FieldValue.serverTimestamp(),
                caption: caption,
                photoUrl: imageUrl,
                username: user.email.replace("@gmail.com", ""),
                profileUrl: user.photoURL,
                likeNum: 0,
                isClick: user.email.replace("@gmail.com", "")+"-true"
              });
            });
          setCaption("");
          setProgress(0);
          setImage(null);

          document.getElementById("image-preview").style.display = "none";
        }
      );
    }
  };

  const handleClear = () => {
      setCaption("");
      setProgress(0);
      setImage(null);
      document.getElementById("image-preview").style.display = "none";
  };

  return (
    
    <div className="createPost">
      {user ? (
        <div className="createPost_loggedIn">
          <div className="createPost_head">
          <p style={{ fontSize: "30px" }}>Create a post</p>
          <button 
            className="createPost_clearBtn"
            style={{ cursor: "pointer", fontSize: "15px" }}
            onClick={handleClear}>
                Clear
            </button>
          </div>
          
          <div className="createPost_loggedInCenter">
            <textarea
              className="createPost_textarea"
              rows="3"
              placeholder=" Enter Caption here ..."
              value={caption}
              onChange={(e) => setCaption(e.target.value)}
            ></textarea>

            <div className="createPost__imagePreview">
              <img id="image-preview" alt="" />
            </div>
          </div>
          <div className="createPost_loggedInBottom">
            <div className="createPost_imageUpload">
              <label htmlFor="fileInput">
                <AddAPhotoIcon
                  style={{ cursor: "pointer", fontSize: "30px" }}
                />
              </label>
              <input
                id="fileInput"
                type="file"
                accept="image/*"
                onChange={handleChange}
              />
            </div>
            
            <button
              className="createPost_uploadBtn"
              onClick={handleUpload}
              style={{ color: caption ? "blue" : "lightgrey", cursor: "pointer" ,fontSize: "20px", display: caption ? "block" : "none" }}
            >
              <b>{`Upload`}</b> <p>{`${progress != 0 ? progress : ""}`}</p>
            </button>
          </div>
        </div>
      ) : (
        <div>
          {/* <SignInBtn /> */}
          <b><p style={{ marginLeft: "12px" , color: "white" }}> Sign In to Post & Comment</p></b>
        </div>
      )}
    </div>
  );
}