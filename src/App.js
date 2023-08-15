import React from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import DonationForm from './components/DonationForm';
import CampaignList from './components/CampaignList';
import './App.css';
import { Link } from 'react-router-dom/cjs/react-router-dom';

function App() {
  return (
    <Router>
      <div className="App">
        <Link to='/' className='links'>
        <header className="App-header">
          <h1>SaveAFriend</h1>
        </header>
        </Link>
        <Route path="/" exact component={CampaignList} />
        <Route path="/donate/:id" component={DonationForm} />
      </div>
    </Router>
  );
}

export default App;
