import '../style/index.css';
import '../style/settings.css';
import { Elements } from "@stripe/react-stripe-js";
import IconButton from '@mui/material/IconButton';
import { amber } from '@mui/material/colors';
import ClearIcon from '@mui/icons-material/Clear';
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { loadStripe } from "@stripe/stripe-js";
import subscriptionOptions from '../setari/subscriptionData';
import PaymentForm from './PaymentForm';

const userID_LOCAL = localStorage.getItem('userId');

function Subscriptions(props) {
  const [selectedSubscription, setSelectedSubscription] = useState(null);
  const [isPaymentSectionVisible, setIsPaymentSectionVisible] = useState(false);
  const stripePromise = loadStripe('pk_test_51NMT5oCsRhJHu0Rx6dZHEklZxwbKXvcdMbjw5QQED8enFgudVbZsOnqxqKL96nXNkYgcoEoynpNlHzJyiPQ0zuXv00UgAibzWC' );

  const handleClosePopupSub = () => {
    props.handleClosePopupSub();
    setIsPaymentSectionVisible(false);
  };

  const handleUpgrade = (subscription) => {
    setSelectedSubscription(subscription);
    setIsPaymentSectionVisible(true);
    // You can perform any other necessary actions here
  };


  return (
    <div className={`popup_container_sub ${props.isPopupOpenSub ? 'open' : ''}`}>
      <div className="dialog_sub">
        {isPaymentSectionVisible ? (
          <div className='payment_plan_section'>
            
            <div className='sub_border_chose_plan'>
              <IconButton aria-label="notif"  onClick={handleClosePopupSub}>
              <ClearIcon sx={{ color: amber[50] }} />
            </IconButton>
            </div>
            
            <div className='div_payment'> 
            <Elements stripe={stripePromise}>
        <PaymentForm selectedSubscription = {selectedSubscription}> </PaymentForm>
      </Elements>
            </div>
          </div>
        ) : (
          <div className='choose_plan_section'>
            <IconButton aria-label="notif"  onClick={handleClosePopupSub}>
              <ClearIcon sx={{ color: amber[50] }} />
            </IconButton>
            <div className='sub_border_chose_plan'>
            </div>
            {subscriptionOptions.map((option) => {
              return (
                <div className='cards_sub' key={option.type}>
                  {option.type === 'Premium' && (
                    <div className={`cards_sub_premium ${selectedSubscription === option ? 'selected' : ''}`}>
                      <h2>{option.type}</h2>
                      <div className='benefits'>
                        <h3>Benefits:</h3>
                        <ul>
                          {option.benefits.map((benefit, index) => (
                            <li key={index}>{benefit}</li>
                          ))}
                        </ul>
                      </div>
                      <p>{option.price} RON / {option.billingPeriod}</p>
                      <button className="button_sub" onClick={() => handleUpgrade(option)}>Upgrade</button>
                    </div>
                  )}
                  {option.type === 'Vet' && (
                    <div className={`cards_sub_vet ${selectedSubscription === option ? 'selected' : ''}`}>
                      <h2>{option.type}</h2>
                      <div className='benefits'>
                        <h3>Benefits:</h3>
                        <ul>
                          {option.benefits.map((benefit, index) => (
                            <li key={index}>{benefit}</li>
                          ))}
                        </ul>
                      </div>
                      <p>{option.price} RON / {option.billingPeriod}</p>
                      <button className="button_sub" onClick={() => handleUpgrade(option)}>Upgrade</button>
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
}

export default Subscriptions;
