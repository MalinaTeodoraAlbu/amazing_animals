import Navbar from "./Navbar";
import './style/index.css';
import moment from 'moment';
import axios from 'axios';
import { useState, useEffect } from 'react';
import AnimalProfile from "./function/AnimalProfile";
import MedicalRecordsList from "./function/MedicalRecordsList";
import ModeEditIcon from '@mui/icons-material/ModeEdit';
import ArticleIcon from '@mui/icons-material/Article';
import { jsPDF } from "jspdf";
import { IconButton } from '@mui/material';
import { amber } from '@mui/material/colors';
import AddIcon from '@mui/icons-material/Add';
import imgData from './media/Amzing_logo.png';
import Vet from "./function/Vet";
import Delete from '@mui/icons-material/Delete';

function MyAnimals() {
  const userId = localStorage.getItem('userId');
  const [user, setUser] = useState(null);
  const [animals, setAnimals] = useState([]);
  const [medicalRecords, setMedicalRecords] = useState([]);
  const [selectedAnimal, setSelectedAnimal] = useState(null);
  const [clients, setClients] = useState([])
  const picture = animals ? `http://localhost:7070/${animals.imagePaths}` : '';
  

  useEffect(() => {
    axios.get(`http://localhost:7070/api/users/${userId}`)
      .then(res => setUser(res.data))
      .catch(err => console.error(err));

    axios.get(`http://localhost:7070/api/users/${userId}/animals`)
      .then(res => setAnimals(res.data))
      .catch(err => console.error(err));
      
  }, []);


  
  useEffect(() => {
    if(user && user.userType === 'Vet'){
      axios.get(`http://localhost:7070/api/pacients/${userId}`)
      .then(res => setClients(res.data))
      .catch(err => console.error(err));
    }

  }, []);

  const handleAnimalClick = (animalID) => {
    axios.get(`http://localhost:7070/api/animals/${animalID}`)
      .then(res => setSelectedAnimal(res.data))
      .catch(err => console.error(err));
  
    axios.get(`http://localhost:7070/api/animals/${animalID}/medicalR`)
      .then(res => setMedicalRecords(res.data))
      .catch(err => console.error(err));
  };
  
  const addAnimal = async (event) => {
    event.preventDefault();
    window.location.href = '/addNewAnimal' ;
  }

  const addNewMedicalRecord = async (event) => {
    event.preventDefault();
    
    window.location.href = `/addNewMedicalRecord/${selectedAnimal._id}`;
  }
  
 


  const generateReport = () => {
    console.log("selected Animal", selectedAnimal.name);
    let doc = new jsPDF();
    let pageHeight = doc.internal.pageSize.height;
    let startY = 15;
  
    // Define styles for the report
  const reportTitleStyle = { fontSize: 14, fontWeight: 'bold', textAlign: 'left' };
  const reportInfoStyle = { fontSize: 8, textAlign: 'right' };
  const sectionTitleStyle = { fontSize: 12, fontWeight: 'bold', margin: { top: 10 } };
  const itemStyle = { fontSize: 10, margin: { top: 4 } };

  
    // Function to check if there is enough space on the page
    const checkIfNewPageNeeded = (y, spaceNeeded) => {
      return y + spaceNeeded > pageHeight - 15;
    };
  
    doc.addImage(imgData, 'JPEG', 160, 25, 40, 40);

    // Add title
    doc.setFontSize(reportTitleStyle.fontSize);
    doc.setFont(reportTitleStyle.fontWeight);
    doc.text('Animal Report', 15, startY);
  
    // Add date and unique number
    const currentDate = new Date().toLocaleDateString();
    const uniqueNumber = Math.floor(Math.random() * 1000000) + 1;
    doc.setFontSize(reportInfoStyle.fontSize);
    doc.setFont(reportInfoStyle.fontWeight);
    doc.text(`Report Date: ${currentDate}`, doc.internal.pageSize.getWidth() - 15, startY, { align: 'right' });
    doc.text(`Report Number: ${uniqueNumber}`, doc.internal.pageSize.getWidth() - 15, startY + 5, { align: 'right' });
  
    startY += 30;
  
    // Add user-specific information
    doc.setFontSize(sectionTitleStyle.fontSize);
    doc.setFont(sectionTitleStyle.fontWeight);
    doc.text('Owner', 15, startY);
    startY += 10;
  
    doc.setFontSize(itemStyle.fontSize);
    doc.setFont(itemStyle.fontWeight);
    doc.text(`Name: ${user.name}`, 15, startY);
    startY += 10;
    doc.text(`Birthday: ${moment(user.birthday).format('YYYY-MM-DD')}`, 15, startY);
    startY += 5;
  
    // Add section separator line
    doc.setDrawColor(0);
    doc.setLineWidth(0.5);
    doc.line(15, startY, doc.internal.pageSize.getWidth() - 15, startY);
    startY += 10;
  
    // Add Animal details
    doc.setFontSize(sectionTitleStyle.fontSize);
    doc.setFont(sectionTitleStyle.fontWeight);
    doc.text('Animal Details', 15, startY);
    startY += 10;
  
    doc.setFontSize(itemStyle.fontSize);
    doc.setFont(itemStyle.fontWeight);
    doc.text(`Name: ${selectedAnimal.name}`, 15, startY);
    startY += 10;
    doc.text(`Species: ${selectedAnimal.species}`, 15, startY);
    startY += 10;
    doc.text(`Sex: ${selectedAnimal.sex}`, 15, startY);
    startY += 10;
    doc.text(`Color: ${selectedAnimal.color}`, 15, startY);
    startY += 10;
    doc.text(`Birthday: ${moment(selectedAnimal.birthday).format('YYYY-MM-DD')}`, 15, startY);
    startY += 10;
    doc.text(`Weight: ${selectedAnimal.weight}`, 15, startY);
    startY += 10;
    if (selectedAnimal.sterilizer === true) {
      doc.text(`Sterilizer: Yes`, 15, startY);
      startY += 5;
    } else {
      doc.text(`Sterilizer: No`, 15, startY);
      startY += 5;
    }
  
    // Add section separator line
    doc.setDrawColor(0);
    doc.setLineWidth(0.5);
    doc.line(15, startY, doc.internal.pageSize.getWidth() - 15, startY);
    startY += 10;
  
    // Add medical records section title
    doc.setFontSize(sectionTitleStyle.fontSize);
    doc.setFont(sectionTitleStyle.fontWeight);
    doc.text('Medical Records', 15, startY);
    startY += 10;
  
    let page = 1;
    let recordsPerPage = 3; // Number of medical records to show per page
    let currentRecordIndex = 0;
    const spaceBetweenRecords = 10; // Space between medical records
  
    while (currentRecordIndex < medicalRecords.length) {
      let currentPageHeight = pageHeight - startY - 15;
      let remainingRecords = medicalRecords.length - currentRecordIndex;
      let recordsToShow = Math.min(recordsPerPage, remainingRecords);
  
      // Calculate the total height needed for the records and the space between them
      const totalRecordsHeight = recordsToShow * 75;
      const totalSpaceHeight = (recordsToShow - 1) * spaceBetweenRecords;
  
      // Check if there is enough space on the current page for the records
      if (currentPageHeight >= totalRecordsHeight + totalSpaceHeight) {
        // Render the records on the current page
        let currentY = startY;
  
        for (let i = currentRecordIndex; i < currentRecordIndex + recordsToShow; i++) {
          const record = medicalRecords[i];
  
          doc.setFontSize(itemStyle.fontSize);
          doc.setFont(itemStyle.fontWeight);
  
          // Calculate the height needed for the record details
          const recordDetailsLines = doc.splitTextToSize(record.content, doc.internal.pageSize.getWidth() - 50);
          const recordDetailsHeight = recordDetailsLines.length * 7;
  
          // Check if a new page is needed for the current record
          if (checkIfNewPageNeeded(currentY, 60 + recordDetailsHeight + spaceBetweenRecords)) {
            doc.addPage();
            page++;
            currentY = startY;
  
            // Add medical records section title on the new page
            doc.setFontSize(sectionTitleStyle.fontSize);
            doc.setFont(sectionTitleStyle.fontWeight);
            doc.text('Medical Records', 15, currentY);
            currentY += 10;
          }
  
          // Add border to the medical record
          doc.setDrawColor(0);
          doc.setLineWidth(0.2);
  
          const recordBoxHeight = 51 + recordDetailsHeight; // Total height of the box
  
          // Add the border to the medical record with the calculated dimensions
          doc.rect(15, currentY - 3, doc.internal.pageSize.getWidth() - 30, recordBoxHeight);
          doc.text('', 20, currentY);
          currentY += 7;
          doc.text(`Title: ${record.title}`, 20, currentY);
          currentY += 7;
          doc.text(`Record Date: ${record.date}`, 20, currentY);
          currentY += 7;
          doc.text('Record Details:', 20, currentY);
          currentY += 7;
          for (let line of recordDetailsLines) {
            doc.text(line, 20, currentY);
            currentY += 7;
          }
          if (record.repeat === false) {
            doc.text(`Repeat: No `, 20, currentY);
            currentY += 17;
          } else {
            doc.text(`Date: ${record.dateRepeat}`, 20, currentY);
            currentY += 7;
            doc.text(`Times to Repeat: ${record.repeatTimes}`, 20, currentY);
            currentY += 10;
          }
          currentY += 20;
        }
  
        currentRecordIndex += recordsToShow;
  
        // Check if there are more records to render
        if (currentRecordIndex < medicalRecords.length) {
          doc.addPage();
          page++;
          startY = 15;
  
          // Add medical records section title on the new page
          doc.setFontSize(sectionTitleStyle.fontSize);
          doc.setFont(sectionTitleStyle.fontWeight);
          doc.text('Medical Records', 15, startY);
          startY += 10;
        }
      } else {
        // Not enough space on the current page, move to the next page
        doc.addPage();
        page++;
        startY = 20;
      }
    }
  
    // Save the PDF
    doc.save('AnimalReport.pdf');
  };
  
  
  return (
    <div className="Animals_container">
{user && user.userType !=='Vet' ? (
  <>
   <div className="list_of_animals">
   <div className="Animals_details_container_border">
     <h3>My animals</h3>
     <div className="button_container">
       <IconButton  onClick={addAnimal} disableRipple>
            <AddIcon fontSize="small" sx={{ color: amber[50] }} />
          </IconButton>
          
     </div>
   </div>
   <div className="list_of_animals_">
           {animals.map(animal => (
         <img key={animal._id} src={`http://localhost:7070/${animal.imagePaths}`} alt={animal.name} className="animal_photo" onClick={() => handleAnimalClick(animal._id)} />
         ))}</div>
     </div>
             <AnimalProfile selectedAnimal = {selectedAnimal}></AnimalProfile>


     {selectedAnimal ? (
        <div className="medical_details"> 
        <div className="medical_details_container"> 
        <div className="Animals_details_container_border">
     <h3>Medical Records</h3>
     <div className="button_container">
     <IconButton  onClick={generateReport} disableRipple>
            <ArticleIcon fontSize="small" sx={{ color: amber[50] }} />
          </IconButton>
     <IconButton  onClick={addNewMedicalRecord} disableRipple>
            <AddIcon fontSize="small" sx={{ color: amber[50] }} />
          </IconButton>
      
     </div>
    
   </div> 

           <div className="records_container">
           <MedicalRecordsList medicalRecords={medicalRecords} />
           </div>
           </div>
        <div className="medical_details_container_remind"> 
        <div className="Animals_details_container_border">
             <h3>Remind</h3>
           </div>
             <div className="records_container" >
             <MedicalRecordsList medicalRecords={medicalRecords.filter(record => record.repeat)} />

            </div>
        </div>
      </div>

     ):(
       <div className="medical_details"> 
        <div className="medical_details_container"> 
        
        <div className="Animals_details_container_border">
     <h3>Medical Records</h3>
     
     <div className="button_container">
    
     </div>
   </div> 

           <div className="records_container">
           <h3>0 medical records</h3>
           </div>
           </div>
        <div className="medical_details_container_remind"> 
        <div className="Animals_details_container_border">
             <h3>Remind</h3>
           </div>
             <div className="records_container" >
            </div>
        </div>
      </div>


     )}
</>
) : (
  <div >
   <Vet></Vet>
  </div>
)}
   
         </div>
 
  );
}

export default MyAnimals;