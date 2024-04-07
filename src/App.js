import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import Home from './Home';
import ParkingSpaceList from './ParkingSpaceList';
import ParkingSpaceForm from './ParkingSpaceForm';
import Payment from './Payment';
import SignupForm from './SignupForm'; // Import the SignupForm component
import LoginForm from './LoginForm'; // Import the LoginForm component
import Dashboard from './Dashboard';
import './style.css';

function App() {
  return (
    <Router>
      <div>
        <Switch>
          <Route path="/" exact component={Home} />
          <Route path="/see-parking-spaces" component={ParkingSpaceList} />
          <Route path="/add-parking-space" component={ParkingSpaceForm} />
          <Route path="/payment" component={Payment} />
          <Route path="/signup" component={SignupForm} />
          <Route path="/login" component={LoginForm} /> 
          <Route path="/dashboard" component={Dashboard} />
        </Switch>
      </div>
    </Router>
  );
}

export default App;
