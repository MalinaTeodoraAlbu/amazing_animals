import { useState } from 'react';
import { useParams } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import '../index.css';

function AddNewMedicalRecord() {
  const userId = localStorage.getItem('userId');
  const { animalId } = useParams();
  console.log('Animal ID ',animalId)
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [date, setDate] = useState('');
  const [repeat, setRepeat] = useState(false);
  const [dateRepeat, setDateRepeat] = useState('');
  const [repeatTimes, setrepeatTimes] = useState('');

  const handleSave = async (event) => {
    event.preventDefault();
    const medicalRecord = {
      animalId,
      title,
      content,
      repeat,
      date,
      dateRepeat,
      repeatTimes,
    };

    if (title === '') {
      toast.error('Empty title', {
        position: toast.POSITION.TOP_RIGHT,
        autoClose: 3000,
        style: {
          marginTop: '5rem',
        },
      });
      return;
    }

    if (content === '') {
      toast.error('Empty content', {
        position: toast.POSITION.TOP_RIGHT,
        autoClose: 3000,
        style: {
          marginTop: '5rem',
        },
      });
      return;
    }

    if (date === '-') {
      toast.error('Empty date', {
        position: toast.POSITION.TOP_RIGHT,
        autoClose: 3000,
        style: {
          marginTop: '5rem',
        },
      });
      return;
    }
    console.log(medicalRecord);
    const res = await fetch('http://localhost:7070/api/medicalRecord', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(medicalRecord),
    });

    if (res.status === 200) {
      toast.success('Successfully added a new medical record!', {
        position: toast.POSITION.TOP_RIGHT,
        autoClose: 1000,
        style: {
          marginTop: '5rem',
        },
        
      }
      );
      window.location.href = '/myAnimals' ;
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
    <div className="add-new-animal">
      <ToastContainer />
      <div className="container_add_new_animal">
        <div className="Animals_details_container_border">
          <h3>Add New Medical Record</h3>
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
                <input type="number" id="times" name="times" value={repeatTimes} onChange={(e) => setrepeatTimes(e.target.value)}/>
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default AddNewMedicalRecord;