import React, { useState } from 'react';
import '../style/index.css';
import axios from 'axios';
import IconButton from '@mui/material/IconButton';
import ModeEditIcon from '@mui/icons-material/ModeEdit';
import Delete from '@mui/icons-material/Delete';

function MedicalRecordsList(props) {
  const { medicalRecords, setIsRecordDeleted } = props;
  const [records, setRecords] = useState([]);
  console.log(medicalRecords)
  
  const handleEdit = (id) =>{
    window.location.href = `/editMedicalRecord/${id}`;
  }

  const handleDelete = (id) => {
    console.log(id);
    axios
      .delete(`http://localhost:7070/api/medicalRecord/${id}`)
      .then(() => {
        setIsRecordDeleted(true);
      })
      .catch((error) => {
        console.error(error);
      });
  };
  

  return (
    <div className="medical_records_list">
      {medicalRecords.length > 0 ? (
        medicalRecords.map(record => (
          <div className='record' key={record._id}>
            
             <div> <p>Title: {record.title}</p>
            <p>Description: {record.content}</p>
            <p>Date: {record.date}</p>
            <p> {record.repeat ? "Yes" : "No"}</p> </div>
             {record.repeat === true ? (
              <p>{record.dateRepeat}, times: {record.repeatTimes}</p>
              
             ) : (
              <p></p>
             ) }
               <div className="editButton" >

               <IconButton size="small" onClick={(event) => handleEdit(event)} style={{ borderRadius: '50%' }} >
                 <ModeEditIcon fontSize="small" />
               </IconButton>

               <IconButton size="small" onClick={(event) => handleDelete(record._id)}  style={{ borderRadius: '50%' }} >
                 <Delete fontSize="small" />
               </IconButton>
             </div>
          </div>
          
        ))
      ) : (
        <div className="records_container"> 
        <p>No medical records available</p></div>
        
      )}
      
    </div>
  );
}

export default MedicalRecordsList;