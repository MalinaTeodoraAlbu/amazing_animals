import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { purple } from '@mui/material/colors';
import { toast } from 'react-toastify';
import IconButton from '@mui/material/IconButton';
import DeleteIcon from '@mui/icons-material/Delete';
import Button from '@mui/material/Button';
import ButtonGroup from '@mui/material/ButtonGroup';
import EditIcon from '@mui/icons-material/Edit';
import DoneIcon from '@mui/icons-material/Done';
import { format } from 'timeago.js';

import '../style/index.css';

const userID_LOCAL = localStorage.getItem('userId');

function ListComments(props) {
  const [currentText, setCurrentText] = useState('');
  const [comments, setComments] = useState([]);
  const [user, setUser] = useState(null);
  const { postId } = props;
  const [text, setTextComment] = useState('');
  const [selectedPostId, setSelectedPostId] = useState(null);
  const [updatedText, setUpdatedText] = useState('');
  const [editMode, setEditMode] = useState(null);

  useEffect(() => {
    axios
      .get(`http://localhost:7070/api/comments/${postId}/post`)
      .then((res) => setComments(res.data))
      .catch((err) => console.error(err));
  }, [postId, comments]); 

  useEffect(() => {
    axios
      .get(`http://localhost:7070/api/users/${userID_LOCAL}`)
      .then((res) => setUser(res.data))
      .catch((err) => console.error(err));
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
  };
  

  const handleCommentUpdate = async (commentId, updatedText) => {
    try {
      if (updatedText === currentText) {
        setEditMode(null);
        return;
      }
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
      postID: postId,
      userid: userID_LOCAL,
    };
  
    try {
      const res = await axios.post('http://localhost:7070/api/comments', comment);
      if (res.status === 200) {
        
        const newComment = { ...comment, _id: new Date().getTime() };
  
        setComments((prevComments) => [newComment, ...prevComments]);
        setTextComment("");
        setSelectedPostId(postId); 
        toast.success('Successfully added a new medical record!', {
          position: toast.POSITION.TOP_RIGHT,
          autoClose: 1000,
          style: {
            marginTop: '5rem',
          },
        });
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
      toast.error('Failed to add a new comment', {
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
      <div className="list_of_comments">
        {comments.map((comment) => (
          <div key={comment._id} className="comment">
            {comment.userid ? (
              <div className="comment-user">
                <User userid={comment.userid} />
                <div className='comm_time'>
               <div className="comment-time"> {format(comment.createdAt)}</div>
                </div>
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
                  <IconButton
                    aria-label="delete"
                    color="secondary"
                    onClick={() => handleCommentUpdate(comment._id, updatedText)}
                    disableRipple
                  >
                    <DoneIcon fontSize="small" variant="text" sx={{ color: purple[300] }} />
                  </IconButton>
                </div>
              ) : (
                <div>
                  <div>
                <p className="comment-text">{comment.text}</p>
               
              </div>
                  {comment.userid === userID_LOCAL && (
                    <div className="comment-actions">
                      <IconButton
                        aria-label="delete"
                        color="secondary"
                        onClick={() => handleCommentDelete(comment._id)}
                        disableRipple
                      >
                        <DeleteIcon fontSize="small" variant="text" sx={{ color: purple[300] }} />
                      </IconButton>
                      <IconButton
                        aria-label="edit"
                        color="primary"
                        onClick={() => {
                          setEditMode(comment._id);
                          setUpdatedText(comment.text); 
                        }}
                        disableRipple
                      >
                        <EditIcon fontSize="small" variant="text" sx={{ color: purple[300] }} />
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
        <textarea className="textarea_comment" value={text} onChange={(e) => setTextComment(e.target.value)}></textarea>
        <button
          className="btn btn-primary"
          type="button"
          onClick={() => {
            setSelectedPostId(postId);
            handleCommentSubmit();
          }}
        >
          Comment
        </button>
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

  const handleLooKProfile = () => {
    window.location.href = `/user/${user._id}`;
  };

  return (
    <div className="user-info_comment">
      <img src={`http://localhost:7070/${user.imagePaths}`} alt="Profile Picture" className="profile-picture_user-img_comment" onClick={handleLooKProfile} />
      <p className="user-name">{user.name}</p>
    </div>
  );
}

export default ListComments;
