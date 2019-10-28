import React,{Component} from 'react';
import './App.css';
import axios from 'axios';
import { BrowserRouter as Router, Route, Link, Redirect } from "react-router-dom";
import Login from './components/Login/Login';
import posts from './components/posts/posts';
import Auth from './components/Auth/Auth';

class App extends Component {

  render(){
    return (
      <Router>
        <Route path="/" exact component={Login} />
        {/* <Route path="/aboutmyapp" component={About} /> */}
        <PrivateRoute path="/posts" component={posts} />
        {/* <PrivateRoute path="/cars" component={Cars} />
        <PrivateRoute path="/tables" component={Tables} /> */}
      </Router>
  
    )
  }
}




const PrivateRoute = ({ component: MyComp, ...rest }) => (
  <Route {...rest} render={(props) => (
    Auth.getAutenticate() === true ? <MyComp {...props} /> : <Redirect to='/' />
  )} />
)

export default App;
