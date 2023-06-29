import './App.css';

import React, { Component } from 'react'
import Navbar from './components/Navbar';
import News from './components/News';
import {BrowserRouter as Router, Routes, Route } from "react-router-dom";

export default class App extends Component {

  render() {
    return (
      <div>
      <Router>
       <Navbar/>
       
       <Routes>
          <Route exact path="/" element={<News key="general" pageSize={9} country="in" category="general"/>}> </Route>
          <Route exact path="/general" element={<News key="general" pageSize={9} country="in" category="general"/>}> </Route>
          <Route exact path="/business" element={<News key="business" pageSize={9} country="in" category="business"/>}> </Route>
          <Route exact path="/entertainment" element={<News key="entertainment" pageSize={9} country="in" category="entertainment"/>}> </Route>
          <Route exact path="/health" element={<News key="health" pageSize={9} country="in" category="health"/> }></Route>
          <Route exact path="/science" element={<News key="science" pageSize={9} country="in" category="science"/>}> </Route>
          <Route exact path="/sports" element={<News key="sports" pageSize={9} country="in" category="sports"/>}> </Route>
          <Route exact path="/tachnology"element={<News key="technology" pageSize={9} country="in" category="technology"/>}> </Route>
        </Routes>
      </Router>
      </div>
    )
  }
}
