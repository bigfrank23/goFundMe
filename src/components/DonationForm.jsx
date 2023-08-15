import React, { useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import './DonationForm.css';

const DonationForm = () => {
  const { id } = useParams();
  const [amount, setAmount] = useState(0);
  const [email, setEmail] = useState('');
  const [senderName, setSenderName] = useState('');
const [paymentSuccess, setPaymentSuccess] = useState(false);

const handlePayment = async () => {
  try {
    const amountInKobo = Math.round(amount * 100); // Convert to kobo

    const handler = window.PaystackPop.setup({
      key: process.env.REACT_APP_PAYSTACK_PUBLIC_KEY,
      email: email,
      name: senderName,
      amount: amountInKobo,
      onClose: () => {
        // Handle close action
      },
      callback: (response) => {
        // Handle payment success
        console.log(response);

        // Call the backend to increment currentAmount
        try {
          axios.post(`https://gofundme.onrender.com/api/increment/${id}`, {
            amount: parseFloat(amount),
          });
          setEmail('')
          setSenderName('')
          setAmount('')
          setPaymentSuccess(true)
        } catch (error) {
          console.error('Error incrementing currentAmount:', error);
          // Handle error gracefully, show error message to the user
          alert(`Error incrementing currentAmount: ${error.message}`);
        }
      },
    });

    handler.openIframe();
  } catch (error) {
    console.error('Payment error:', error);
    // Handle error gracefully, show error message to the user
    alert(`Payment error: ${error.message}`);
  }
};




  

  return (
    <div className={`donation-form ${paymentSuccess ? 'payment-success' : ''}`}>
      <h2>Donate to Campaign</h2>
      <div className='donation-input-box'>
      <input
        type="number"
        value={amount}
        onChange={(e) => setAmount(e.target.value)}
      />
      <input
        type="text"
        placeholder="Your Name"
        value={senderName}
        onChange={(e) => setSenderName(e.target.value)}
        />
      <input
        type="email"
        placeholder="Email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />
      <button className="donate-button" onClick={handlePayment}>
        Donate
      </button>

      </div>
      {paymentSuccess && (
        <p className="success-message">Thank you for your donation!</p>
      )}
    </div>
  );
};

export default DonationForm;
