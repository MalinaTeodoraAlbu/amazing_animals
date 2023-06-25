import React from 'react';
import '../style/index.css';
function MedicalRecordsList(props) {
  const { medicalRecords } = props;
  console.log(medicalRecords)
  
  
  return (
    <div className="medical_records_list">
      {medicalRecords.length > 0 ? (
        medicalRecords.map(record => (
          <div className='record' key={record._id}>
            <p>Title: {record.title}</p>
            <p>Description: {record.content}</p>
            <p>Date: {record.date}</p>
            <p>Repeat: {record.repeat ? "Yes" : "No"}</p>
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