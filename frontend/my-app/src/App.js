import Navbar from "./Navbar";
import React, { useState, useEffect } from 'react';
import { Routes, Route , useLocation } from 'react-router-dom';
import { loadStripe } from "@stripe/stripe-js";
import Feed  from'./Feed'
import Favourites  from'./Favourites'
import MyAnimals  from'./MyAnimals'
import MyProfile  from'./MyProfile'
import Settings  from'./Settings'
import Header from "./Header";
import UserProfile from "./UserProfile "
import Login from "./Login";
import AddNewAnimal from "./AddPage/AddNewAnimal"
import AddNewMedicalRecord from "./AddPage/AddNewMedicalRecord"
import EditAnimal from "./EditPages/EditAnimal"
import EditPost from "./EditPages/EditPost"
import AddNewPost from "./AddPage/AddNewPost"
import AddAdvertising from "./AddPage/AddNewAdvertising"
import EditAdvertising from "./EditPages/EditAdvertising"
import EditMedicalRecord from "./EditPages/EditMedicalRecord"
import ViewPost from "./ViewPost";
import Messanger from "./messanger/messanger";
import NotificationsContainer from "./NotificationsContainer";
import Popup from "./Popup";
import SearchPopup from "./function/SearchPopup";
import Subscriptions from "./setari/Subscriptions";
import { Elements } from "@stripe/react-stripe-js";
import PaymentForm from "./setari/PaymentForm";
import FriendsList from "./Popups/FriendsList";


function App() {
  const location = useLocation();
  const isLoginPage = location.pathname === '/';
  const [isPopupOpen, setIsPopupOpen] = useState(false);
  const [isPopupOpenSub, setIsPopupOpenSub] = useState(false);
  const [isSearchPopupOpen, setIsSearchPopupOpen] = useState(false);
  const [isFriendPopupOpen, setisFriendPopupOpen] = useState(false);
  const [hasUnreadNotifications, setHasUnreadNotifications] = useState(false);

  const stripePromise = loadStripe('pk_test_51NMT5oCsRhJHu0Rx6dZHEklZxwbKXvcdMbjw5QQED8enFgudVbZsOnqxqKL96nXNkYgcoEoynpNlHzJyiPQ0zuXv00UgAibzWC' );

  const handleClosePopup = () => {
    setIsPopupOpen(false);
  };

  const handleClosePopupSub = () => {
    setIsPopupOpenSub(false);
  };

  const handleCloseSearchPopup = () => {
    setIsSearchPopupOpen(false);
  };
  
  const handleCloseFriendPopup = () => {
    setisFriendPopupOpen(false);
  };
  
  return (
    <div className="App">
    {}
    { <Header setIsPopupOpen={setIsPopupOpen} setIsSearchPopupOpen={setIsSearchPopupOpen} 
    setisFriendPopupOpen={setisFriendPopupOpen} setHasUnreadNotifications={setHasUnreadNotifications} />
}
    <div className="content">
      {}
      {!isLoginPage && <Navbar />}
      {!isLoginPage && <Subscriptions isPopupOpenSub={isPopupOpenSub} handleClosePopupSub={handleClosePopupSub} />}
      {!isLoginPage &&  <Popup isPopupOpen={isPopupOpen} handleClosePopup={handleClosePopup} setHasUnreadNotifications={setHasUnreadNotifications} />}
      {!isLoginPage &&  <SearchPopup isSearchPopupOpen={isSearchPopupOpen} handleCloseSearchPopup={handleCloseSearchPopup} />}
      {!isLoginPage &&  <FriendsList isFriendPopupOpen={isFriendPopupOpen} handleCloseFriendPopup={handleCloseFriendPopup} />}

      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/feed" element={<Feed />} />
        <Route path="/editAdvertising/:id" element={< EditAdvertising/>} />
        <Route path="/addAdvertising" element={<AddAdvertising />} />
        <Route path="/favourites" element={<Favourites />} />
        <Route path="/myAnimals" element={<MyAnimals />} />
        <Route path="/myProfile" element={<MyProfile setisFriendPopupOpen={setisFriendPopupOpen} />} />
        <Route path="/user/:userID" element={<UserProfile setisFriendPopupOpen={setisFriendPopupOpen} />} />
        <Route path="/settings" element={<Settings setIsPopupOpenSub={setIsPopupOpenSub} />} />
        <Route path="/AddNewPost" element={<AddNewPost />} />
        <Route path="/addNewAnimal" element={<AddNewAnimal />} />
        <Route path="/addNewMedicalRecord/:animalId" element={<AddNewMedicalRecord />} />
        <Route path="/editAnimal/:animalId" element={<EditAnimal />} />
        <Route path="/editPost/:postID" element={<EditPost />} />
        <Route path="/editMedicalRecord/:medicalRecord" element={<EditMedicalRecord />} />
        <Route path="/viewPost/:postID" element={<ViewPost />} />
        <Route path="/messanger" element={<Messanger />} />
      </Routes>

     
    </div>
  </div>
  );
}


export default App;
