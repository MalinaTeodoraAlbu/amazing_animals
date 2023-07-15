import {
    CardElement,
    PaymentElement,
    PaymentRequestButtonElement,
    useElements,
    useStripe,
  } from "@stripe/react-stripe-js";
  import React, { useState, useEffect  } from "react";
  import axios from 'axios';
  import { amber } from '@mui/material/colors';
  import picturePayment from '../media/payment.png'
  const userID_LOCAL = localStorage.getItem('userId');
  
  function PaymentForm({ selectedSubscription }) {
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [subscription, setsubscription] = useState(null);
    const [subscriptionID, setsubscriptionID] = useState("");
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
    const [currentSection, setCurrentSection] = useState("payment");
    const [isLoading, setIsLoading] = useState(false);

    

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

          fetch(`http://localhost:7070/api/users/${userID_LOCAL}/subscription`)
          .then((response) => response.json())
          .then((data) => {
            setsubscription(data);
            setsubscriptionID(data._id);

          });
      }
    }, []);

    
    const handleIsLoading = async () =>{
      setIsLoading(true)
    }
  
      const createSubscription = async () => {
        handleIsLoading();
        try {
          const paymentMethod = await stripe.createPaymentMethod({
            card: elements.getElement("card"),
            type: "card",
          });
      
          const paymentResponse = await fetch("http://localhost:7070/api/subscribe", {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              name,
              email,
              paymentMethod: paymentMethod.paymentMethod.id,
              amount: selectedSubscription.price,
            }),
          });
      
          if (!paymentResponse.ok) {
            return alert("Payment unsuccessful!");
          }
      
          const paymentData = await paymentResponse.json();
          const confirm = await stripe.confirmCardPayment(paymentData.clientSecret);
          if (confirm.error) {
            return alert("Payment unsuccessful!");
          }
      
          const currentDate = new Date();
          const nextBillingDate = new Date(currentDate.getTime() + 30 * 24 * 60 * 60 * 1000);

          const subscriptionData = {
            subscriptionType: selectedSubscription.type,
            startDate: currentDate,
            price: selectedSubscription.price,
            userid: userID_LOCAL,
            status: "Active",
            nextBillingDate:nextBillingDate
          };


          console.log("sub ", subscriptionData)

            if (user && subscription) {
              console.log("upgrade")
              try {
                const response = await axios.put(
                  `http://localhost:7070/api/subscription/${subscriptionID}`,
                  subscriptionData
                );
                console.log(response);
              } catch (error) {
                console.error(error);
              }
            } else {
              console.log("create")
              try {
                const response = await axios.post(
                  "http://localhost:7070/api/ADDsubscription",
                  subscriptionData
                );
                console.log(response);
              } catch (error) {
                console.error(error);
              }
            }
      
          let formData = new FormData();
          formData.append("name", name);
          formData.append("city", city);
          formData.append("email", email);
          formData.append("phoneNumber", phoneNumber);
          formData.append("password", password);
          formData.append("bio", bio);
          formData.append("birthday", birthday);
          formData.append("userType", selectedSubscription.type);
          formData.append("imagePaths", pictureA);
          console.log(pictureA);
      
          try {
            const updateUserResponse = await axios.put(
              `http://localhost:7070/api/users/${userID_LOCAL}`,
              formData
            );
          } catch (error) {
            console.error(error);
          }
        } catch (err) {
          console.error(err);
          alert("Payment failed! " + err.message);
        }

        setCurrentSection("success");
      };
    
  
    return (
    <div className="div_payment">
      {currentSection === "payment" && (
        <>
      <div className="left_pay">
              <div className="head">
              <h2>Selected Plan: {selectedSubscription.type}</h2>
              <h2>Only {selectedSubscription.price} RON / {selectedSubscription.billingPeriod}</h2>
              </div>
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
      {isLoading === true ? (
        <div className="hamster_"> 
        <div aria-label="Orange and tan hamster running in a metal wheel" role="img" class="wheel-and-hamster">
        <div class="wheel"></div>
        <div class="hamster">
          <div class="hamster__body">
            <div class="hamster__head">
              <div class="hamster__ear"></div>
              <div class="hamster__eye"></div>
              <div class="hamster__nose"></div>
            </div>
            <div class="hamster__limb hamster__limb--fr"></div>
            <div class="hamster__limb hamster__limb--fl"></div>
            <div class="hamster__limb hamster__limb--br"></div>
            <div class="hamster__limb hamster__limb--bl"></div>
            <div class="hamster__tail"></div>
          </div>
        </div>
        <div class="spoke"></div>
      </div>
      </div>
      ):(
        <button
        onClick={createSubscription}
      >
        Upgrade
      </button>
      )}
     
    </div>
    </>
      )}

      {currentSection === "success" && (
        <>
        <div className="succes_payment">
        <img className="success_image" src={picturePayment} alt="Payment Success" />
          </div>
        </>
      )}
    </div>
    
    );
  }
  
  export default PaymentForm;