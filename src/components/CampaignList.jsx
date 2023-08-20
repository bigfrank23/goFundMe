import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import CampaignCreationForm from './CampaignCreationForm';
import ProofImg from '../images/screenshot.png'
import './CampaignList.css';

const CampaignList = () => {
  const [campaigns, setCampaigns] = useState([]);
  const [isLoading, setIsLoading] = useState(true)

  const targetDate = new Date('August 31, 2023 23:59:59'); // Change to your target date
  const [timeLeft, setTimeLeft] = useState(targetDate - new Date());

  useEffect(() => {
    const interval = setInterval(() => {
      const currentTime = new Date();
      const updatedTimeLeft = targetDate - currentTime;
      setTimeLeft(updatedTimeLeft);

      if (updatedTimeLeft <= 0) {
        clearInterval(interval);
      }
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  const days = Math.floor(timeLeft / (1000 * 60 * 60 * 24));
  const hours = Math.floor((timeLeft % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
  const minutes = Math.floor((timeLeft % (1000 * 60 * 60)) / (1000 * 60));
  const seconds = Math.floor((timeLeft % (1000 * 60)) / 1000);

  useEffect(() => {
    fetchCampaigns();
  }, []);

  const fetchCampaigns = async () => {
    try {
      const response = await axios.get('https://gofundme.onrender.com/api/campaigns');
      setCampaigns(response.data);
      setIsLoading(false)
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="campaign-list">
      {/* <h2>Campaigns</h2> */}
      {/* <CampaignCreationForm fetchCampaigns={fetchCampaigns} /> */}
        <div className='campaign-list-countdown'>
        <h2>Campaign Ends In:</h2>
        <p>
        {days} days {hours} hours {minutes} minutes {seconds} seconds
      </p>
      </div>
      <div>{isLoading ? (<p style={{padding: '1rem'}}>Please wait. Loading contents...</p>) : (
        <div className="campaigns">
          {campaigns.map((campaign) => (
            <div className="campaign-card" key={campaign._id}>
              <h3>{campaign.title}</h3>
              <p>{campaign.description}</p>
              <div className='campaign-price-box'>
                <div className="campaign-price">
                <p>Goal: <strong>NGN</strong> {campaign.goalAmount}</p>
                <p>Current: <strong>NGN</strong> {campaign.currentAmount}</p>
                </div>
              </div>
              <Link to={`/donate/${campaign._id}`}>Donate</Link>
            </div>
          ))}
        </div>

      )}</div>
      {/* <div className="proof-img">
        {!campaigns ? '' : 
        <img src={ProofImg} alt="" style={{width: '100%'}} />
        }
      </div> */}
    </div>
  );
};

export default CampaignList;
