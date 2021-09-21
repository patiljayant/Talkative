import './App.css';
import {BrowserRouter as Router, Redirect, Route, Switch} from 'react-router-dom';
import { useState} from 'react';
import Home from './components/Home';
import Login from './components/Login';
import Register from './components/Register';
import Sidebar from './components/Sidebar';
import Chat from './components/Chat';
import Verify from './components/Verify';
import Find from './components/Find';
import { useSelector } from 'react-redux';
import Notifications from './components/Notifications';
import Profile from './components/Profile';

function App() {
  const [width, setWidth] = useState(window.screen.width);
  const handleResize = () => {
    if((window.screen.width >= 977 && width <=977) || (window.screen.width <= 977 && width >=977))
      setWidth(window.screen.width);
  }
  const token = useSelector(state => state.user.userInfo);
  window.addEventListener("resize",handleResize);
  return (
    <Router>
    <div className="App">
    <Switch>
      {
        token && 
        <Switch>
          <Route exact path='/profile/:id' component={Profile}/>
          <Route exact path='/notifications' component={Notifications}/>
          <Route exact path='/home' component={Find}/>
          <Route exact path='/settings' component={Sidebar}/>
          <Route exact path='/online' component={Sidebar}/>
          <Route exact path='/chat' render={(props) => <Chat props={props} showChats={true} showMessages={width>=977?true:false}/>} />
          <Route exact path='/chat/:id' render={(props) => <Chat props={props} showMessages={true} showChats={width>=977?true:false}/>}/>
          <Route path='*'>
            <Redirect to='/home' />
          </Route>
        </Switch>
      }
      
      <Route exact path="/login" component={Login}/> 
      <Route exact path="/" component={Home}/>
      <Route exact path="/signup" component={Register}/>
      <Route exact path='/verify/:_id/:verificationLink/login' component={Verify} />
      <Route path='*'>
          <Redirect to='/login' />
      </Route>
    </Switch>
    </div>
    </Router>
  );
}

export default App;
