import {
    CardElement,
    PaymentElement,
    PaymentRequestButtonElement,
    useElements,
    useStripe,
  } from "@stripe/react-stripe-js";
  import React, { useState, useEffect  } from "react";
  import axios from 'axios';

  const userID_LOCAL = localStorage.getItem('userId');
  
  function PaymentForm({ selectedSubscription }) {
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const stripe = useStripe();
    const elements = useElements();
    const [isEditing, setIsEditing] = useState(false);
    const [user, setUser] = useState(null);
    const [password, setPassword] = useState(null);
    const [city, setCity] = useState(null);
    const [birthday, setbirthday] = useState(null)
    const [phoneNumber, setphoneNumber] = useState(null);
    const [picture, setPicture] = useState('');
    const [pictureA, setPictureA] = useState('');
    const [bio, setBio] = useState("");
    const[ userType, setuserType] = useState("");

    useEffect(() => {
      if(userID_LOCAL){
        fetch(`http://localhost:7070/api/users/${userID_LOCAL}`)
          .then(response => response.json())
          .then(data => {
            setUser(data)
            setName(data.name)
            setBio(data.bio)
            setCity(data.city)
            setEmail(data.email)
            setPicture(`http://localhost:7070/${data.imagePaths}`)
            setPassword(data.password)
            setphoneNumber(data.phoneNumber)
            setbirthday(data.birthday)
                    
          });
      }
      }, []);

  
    const createSubscription = async () => {
      try {
        const paymentMethod = await stripe.createPaymentMethod({
          card: elements.getElement("card"),
          type: "card",
        });
        const response = await fetch("http://localhost:7070/api/subscribe", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            name,
            email,
            paymentMethod: paymentMethod.paymentMethod.id,
            amount : selectedSubscription.price,
          }),
        });
        if (!response.ok) return alert("Payment unsuccessful!");
        const data = await response.json();
        const confirm = await stripe.confirmCardPayment(data.clientSecret);
        if (confirm.error) return alert("Payment unsuccessful!");
        alert("Payment Successful! Subscription active.");
        if(response.ok){
          let formData = new FormData();
          formData.append('name', name);
          formData.append('city', city);
          formData.append('email', email);
          formData.append('phoneNumber', phoneNumber);
          formData.append('password', password);
          formData.append('bio', bio);
          formData.append('birthday', birthday);
          formData.append('userType',selectedSubscription.type)
          formData.append('imagePaths', pictureA);
          console.log(pictureA)
          
          try {
            const response = await axios.put(`http://localhost:7070/api/users/${userID_LOCAL}`, formData);
          } catch (error) {
            console.error(error);
          }
        }
      } catch (err) {
        console.error(err);
        alert("Payment failed! " + err.message);
      }
    };
  
    return (
    <div className="div_payment">
      <div className="left_pay">
              <div id="head"></div>
              <h2>Selected Plan: {selectedSubscription.type}</h2>
              <h2>Only {selectedSubscription.price} RON / {selectedSubscription.billingPeriod}</h2>
            </div>
      <div className="right_pay">
      <label htmlFor="name">Name:</label>
      <input
        id="name"
        type="text"
        value={name}
        onChange={(e) => setName(e.target.value)}
        
      />
      <br />
      <label htmlFor="email">Email:</label>
      <input
        id="email"
        type="email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        
      />
      <br />
      <div style={{ border: "1px solid #ccc", padding: "10px" }}>
        <CardElement options={{ style: { base: { fontSize: "16px" } } }} />
      </div>
      <br />
      <button
        onClick={createSubscription}
      >
        Upgrade
      </button>
    </div>
    </div>
    
    );
  }
  
  export default PaymentForm;