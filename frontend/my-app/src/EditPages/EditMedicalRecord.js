import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import '../style/index.css';
import axios from 'axios';

function EditMedicalRecord() {
  const userId = localStorage.getItem('userId');
  const { medicalRecord } = useParams();
  console.log("recordID",medicalRecord)
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [date, setDate] = useState('');
  const [repeat, setRepeat] = useState(false);
  const [dateRepeat, setDateRepeat] = useState('');
  const [repeatTimes, setRepeatTimes] = useState('');
  const [initialRecord, setInitialRecord] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(`http://localhost:7070/api/medicalRecord/${medicalRecord}`);
        const data = await response.json();
        setInitialRecord(data);
        setTitle(data.title);
        setContent(data.content);
        setDate(data.date);
        setRepeat(data.repeat);
        setDateRepeat(data.dateRepeat);
        setRepeatTimes(data.repeatTimes);
      } catch (error) {
        console.error('Error fetching medical record:', error);
      }
    };
  
    if (medicalRecord) {
        fetchData();
      }
  }, [medicalRecord]);

  const handleSave = async (event) => {
    event.preventDefault();
    const updatedRecord = {
      animalId: initialRecord.animalId,
      title,
      content,
      repeat,
      date,
      dateRepeat,
      repeatTimes,
    };

    try {
        const response = await axios.put(
          `http://localhost:7070/api/medicalRecord/${medicalRecord}`,
          updatedRecord
        );
        console.log(response);
        if (response.status === 200) {
    
            window.location.href = '/myAnimals';
          } else {
            toast.error('Internal server error', {
              position: toast.POSITION.TOP_RIGHT,
              autoClose: 3000,
              style: {
                marginTop: '5rem',
              },
            });
          }
      } catch (error) {
        console.error(error);
      }
  };

  return (
    <div className="add-new-animal">
      <ToastContainer />
      <div className="container_add_new_animal">
        <div className="Animals_details_container_border">
          <h3>Edit Medical Record</h3>
          <button className="save_button" onClick={handleSave}>Save</button>
        </div>
        <div className="container_add_new_animal_">
          <div className="container_add_new_animal_a">
            <label htmlFor="title">Title:</label>
            <input type="text" id="title" name="title" value={title} onChange={(e) => setTitle(e.target.value)} />
            <label htmlFor="content">Content:</label>
            <textarea style={{ height: '200px' }} id="content" name="content" value={content} onChange={(e) => setContent(e.target.value)} />
            <label htmlFor="date">Date:</label>
            <input type="date" id="date" name="date" value={date} onChange={(e) => setDate(e.target.value)} />
          </div>
          <div className="container_add_new_animal_a">
            <label htmlFor="repeat">Repeat?</label>
            <input type="checkbox" id="repeat" name="Repeat" checked={repeat} onChange={(e) => setRepeat(e.target.checked)} />
            {repeat && (
              <>
                <label htmlFor="dateRepeat">When:</label>
                <input type="date" id="dateRepeat" name="dateRepeate" value={dateRepeat} onChange={(e) => setDateRepeat(e.target.value)} />
                <label htmlFor="times">Times:</label>
                <input type="number" id="times" name="times" value={repeatTimes} onChange={(e) => setRepeatTimes(e.target.value)} />
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default EditMedicalRecord;
