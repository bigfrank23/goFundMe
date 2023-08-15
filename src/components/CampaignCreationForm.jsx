import React, { useState } from 'react';
import axios from 'axios';
import './CampaignCreationForm.css';

const CampaignCreationForm = ({ fetchCampaigns }) => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [goalAmount, setGoalAmount] = useState('');

  const handleCreateCampaign = async (e) => {
    e.preventDefault();

    try {
      await axios.post('https://gofundme.onrender.com/api/campaigns', {
        title,
        description,
        goalAmount: parseFloat(goalAmount),
      });

      // Fetch campaigns again after creating a new one
      fetchCampaigns();

      // Reset form values
      setTitle('');
      setDescription('');
      setGoalAmount('');
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="campaign-creation-form">
      <h2>Create a New Campaign</h2>
      <form onSubmit={handleCreateCampaign}>
        <input
          type="text"
          placeholder="Title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          required
        />
        <textarea
          placeholder="Description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          required
        />
        <input
          type="number"
          placeholder="Goal Amount"
          value={goalAmount}
          onChange={(e) => setGoalAmount(e.target.value)}
          required
        />
        <button className="create-button" type="submit">
          Create
        </button>
      </form>
    </div>
  );
};

export default CampaignCreationForm;
