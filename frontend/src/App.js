import React from 'react'
import { BrowserRouter as BR, Route, Switch } from 'react-router-dom'
import PrivateRoute from './components/private/PrivateRoute';
//components
import Navigation from './components/Navigation';
import Homepage from './components/Homepage';
import Forms from './components/Forms'
import ViewStudent from './components/ViewStudent';
import Login from './components/Login';
import Register from './components/Register';
import { useSelector } from 'react-redux';

function App() {

  const user = useSelector(state => state.users.data)

  return (
    <BR>
    <Navigation/>
    <Switch>
      <Route path="/" exact component={Login}/>
      <Route path="/register" component={Register}/>
      <PrivateRoute path ="/students" component={Homepage} isLogged = {user.isLogged} />
      <PrivateRoute path ="/add-student" component={Forms} isLogged = {user.isLogged} />
      <PrivateRoute path ="/view/:studentID" component={ViewStudent} isLogged = {user.isLogged} />
    </Switch>
    </BR>
  );
}

export default App;
