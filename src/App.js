
import './App.css';

import React, { Component } from 'react'
import Navbar from './COMPONENTS/Navbar';
import News from './COMPONENTS/News';
import {
  BrowserRouter as Router,
  Routes,
  Route,
} from "react-router-dom";
export default class App extends Component {
  state={
    Progress:0
  }
  setProgress=(Progress)=>{
    this.setState({Progress:Progress});
  }
  render() {
    return (
      <div>
        <Router>
            <Navbar/>
            {/* <LoadingBar
            color='#f11946'
            Progress={this.state.Progress}
            />             */}
         <Routes>
                <Route exact path="/"element={<News setProgress={this.setProgress}  key='general' pagesize={5} country='in' category="general"/>}></Route> 
                <Route exact path="/Business" element={<News setProgress={this.setProgress}  key='Business' pagesize={5} country='in' category="Business"/>}></Route>
                <Route exact path="/Entertainment" element={<News setProgress={this.setProgress}  key='Entertainment' pagesize={5} country='in' category="Entertainment"/>}></Route>  
                <Route exact path="/Health" element={<News setProgress={this.setProgress}  key='Health' pagesize={5} country='in' category="Health"/>}></Route>
                <Route exact path="/Science" element={<News setProgress={this.setProgress}  key='Science' pagesize={5} country='in' category="Science"/>}></Route>
                <Route exact path="/Technology" element={<News setProgress={this.setProgress}  key='Technology' pagesize={5} country='in' category="Technology"/>}></Route>
                <Route exact path="/Sport" element={<News setProgress={this.setProgress}  key='Sport' pagesize={5} country='in' category="sport"/>}></Route>
         </Routes> 
      </Router>
      </div>
    )
  }
}


