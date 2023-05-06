import '../index.css';
import { useState, useEffect } from 'react';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { ToastContainer } from 'react-toastify';


function AddNewComment() {
  const userId = localStorage.getItem('userId');


  return (
    <div className="add-new-animal">
        <ToastContainer />
  
  </div>
  );
}
  
export default AddNewComment;