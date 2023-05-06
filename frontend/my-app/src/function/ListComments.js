import React from 'react';
import axios from 'axios';
import { useState, useEffect } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import IconButton from '@mui/material/IconButton';
import DeleteIcon from '@mui/icons-material/Delete';
import Button from '@mui/material/Button';
import ButtonGroup from '@mui/material/ButtonGroup';
import EditIcon from '@mui/icons-material/Edit';
import DoneIcon from '@mui/icons-material/Done';

const userID_LOCAL = localStorage.getItem('userId');
console.log('userID_LOCAL',userID_LOCAL)
function ListComments(props) {
  const [comments, setComments] = useState([]);
  const [user, setUser] = useState(null);
  const { postId } = props;
  const [text, setTextComment] = useState("");
  const [selectedPostId, setSelectedPostId] = useState(null); 
  const [updatedText, setUpdatedText] = useState("");
  const [editMode, setEditMode] = useState(null);

  useEffect(() => {
    axios
      .get(`http://localhost:7070/api/comments/${postId}/post`)
      .then((res) => setComments(res.data))
      .catch((err) => console.error(err));
  }, [postId]);

  useEffect(() => {
    axios.get(`http://localhost:7070/api/users/${userID_LOCAL}`)
      .then(res => setUser(res.data))
      .catch(err => console.error(err));
  }, [userID_LOCAL]);


const handleCommentDelete = async (commentId) => {
  try {
    await axios.delete(`http://localhost:7070/api/comments/${commentId}`);
    setComments((prevComments) => prevComments.filter((comment) => comment._id !== commentId));
    toast.success('Successfully deleted comment!', {
      position: toast.POSITION.TOP_RIGHT,
      autoClose: 1000,
      style: {
        marginTop: '5rem',
      },
    });
  } catch (err) {
    console.error(err);
    toast.error('Failed to delete comment', {
      position: toast.POSITION.TOP_RIGHT,
      autoClose: 3000,
      style: {
        marginTop: '5rem',
      },
    });
  }
   setComments((prevComments) => prevComments.filter(comment => comment._id !== commentId));
};

const handleCommentUpdate = async (commentId, updatedText) => {
  try {
    const res = await axios.put(`http://localhost:7070/api/comments/${commentId}`, { text: updatedText });
    if (res.status === 200) {
      setComments((prevComments) =>
        prevComments.map((comment) => {
          if (comment._id === commentId) {
            return { ...comment, text: updatedText };
          }
          return comment;
        })

      );
      toast.success('Successfully updated comment!', {
        position: toast.POSITION.TOP_RIGHT,
        autoClose: 1000,
        style: {
          marginTop: '5rem',
        },
      });
      setEditMode(null);
    } else {
      toast.error('Internal server error', {
        position: toast.POSITION.TOP_RIGHT,
        autoClose: 3000,
        style: {
          marginTop: '5rem',
        },
      });
    }
  } catch (err) {
    console.error(err);
    toast.error('Failed to update comment', {
      position: toast.POSITION.TOP_RIGHT,
      autoClose: 3000,
      style: {
        marginTop: '5rem',
      },
    });
  }
};

  const handleCommentSubmit = async () => {
   const comment = {
    text,
    postID:postId,
    userid:userID_LOCAL
   }
   console.log(comment)

   const res = await fetch(`http://localhost:7070/api/comments`, {
        method: "post",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(comment),
      });
      if (res.status === 200) {
        const newComment = { ...comment, _id: new Date().getTime() };
        setComments((prevComments) => [newComment, ...prevComments]);

        toast.success('Successfully added a new medical record!', {
          position: toast.POSITION.TOP_RIGHT,
          autoClose: 1000,
          style: {
            marginTop: '5rem',
          },
          
        }
        );
      } else {
        toast.error('Internal server error', {
          position: toast.POSITION.TOP_RIGHT,
          autoClose: 3000,
          style: {
            marginTop: '5rem',
          },
        });
      }
  };

  return (
    <div className="comments-section">

      <h3 className="comments-title">Comments</h3>
      <div className='list_of_comments'>
      {comments.map((comment) => (
  <div key={comment._id} className="comment">
  {comment.userid ? (
    <div className="comment-user">
      <User userid={comment.userid} />
    </div>
  ) : (
    <p></p>
  )}
  <div className="comment-content">
    {editMode === comment._id ? (
      <div>
        <input
          type="text"
          className="comment-text-input"
          value={updatedText}
          onChange={(e) => setUpdatedText(e.target.value)}
        />
        <IconButton aria-label="delete" color="secondary"  onClick={() => handleCommentUpdate(comment._id, updatedText)}>
              <DoneIcon fontSize="small" variant="text"   />
            </IconButton>
      </div>
    ) : (
      <div>
        <p className="comment-text">{comment.text}</p>
        {comment.userid === userID_LOCAL && (
          <div className="comment-actions">
            <IconButton aria-label="delete" color="secondary"  onClick={() => handleCommentDelete(comment._id)} >
              <DeleteIcon fontSize="small" variant="text"  />
            </IconButton>
            <IconButton aria-label="edit" color="primary" onClick={() => setEditMode(comment._id)}>
              <EditIcon fontSize="small" variant="text" />
            </IconButton>
          </div>
        )}
      </div>
    )}
  </div>
</div>
))}
      </div>
       <div className="d-flex flex-row add-comment-section mt-4 mb-4">
       {user && user.picture && <img className="img_comment_add" src={user.picture} />}
        <textarea className='textarea_comment' value={text} onChange={(e) => setTextComment(e.target.value)}></textarea>
        <button className="btn btn-primary" type="button"
         onClick={() => {
          setSelectedPostId(postId);
          handleCommentSubmit(); }}>Comment</button>
        </div>
    </div>
     
    
  );
}

function User({ userid }) {
  const [user, setUser] = useState(null);

  useEffect(() => {
    axios
      .get(`http://localhost:7070/api/users/${userid}`)
      .then((res) => setUser(res.data))
      .catch((err) => console.error(err));
  }, [userid]);

  if (!user) {
    return <p>Loading...</p>;
  }

  return (
    <div className="user-info_comment">
      <img src={user.picture} alt="Profile Picture" className="profile-picture_user-img_comment" />
      <p className="user-name">{user.name}</p>
    </div>
  );
}

export default ListComments;
