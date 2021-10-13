import React from 'react';
import {BrowserRouter as Router, Switch, Route} from 'react-router-dom'
import './App.css';

//Importing Components
import Navigation from './components/Navigation/Navigation';
import DefaultPage from './components/DefaultPage/DefaultPage';
import Home from './components/Home/Home';
import Balance from './components/Balance/Balance';
import Transactions from './components/Transactions/Transactions';


function App() {
  
  return (
    <Router>
      <Navigation/>
      <Switch>
        <Route path="/" exact component={Home}/>
        <Route path="/balance" exact component={Balance}/>
        <Route path="/transactions" exact component={Transactions}/>
        <Route component={DefaultPage}/>
      </Switch>
    </Router>
  );
}

export default App;
