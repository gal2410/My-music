import React,{Component} from 'react';
import axios from 'axios';
import './Login.css';
import { BrowserRouter as Router, Route, Link,Redirect,withRouter } from "react-router-dom";
import Auth from '../Auth/Auth';

class Login extends Component{
    state = {
        username:"Admin",
        password:"123456"
    }
    render(){
        return(
            <div>
                <div className="login-frame">
                    <h4 className='login-title'>Hello User Please Login</h4>
                    <div className="form-group">
                        <label>Username</label>
                        <input className="form-control" type="text" id="username" onChange={this.handleChange} value={this.state.username} placeholder="Username..." />
                    </div>
                    <div className="form-group">
                        <label>Password</label>
                        <input className="form-control" type="password" onChange={this.handleChange} value={this.state.password} id="password" placeholder="Password..." />
                    </div>
                    <div className="btn btn-danger" onClick={this.login.bind(this)} >Login</div>
                </div>
            </div>
        )
    }

    handleChange = (event) => {
        this.setState({
          [event.target.id]: event.target.value
        });
    }

    login(){
        console.log(Auth.getAutenticate());
        axios.post('/users/login', {username:this.state.username,password:this.state.password})
        .then((response) => {
            if( response.data.success ){
              Auth.authenticate();
              this.props.history.push('/posts');
            //   window.location.href = "/posts";
            }else{
              Auth.signout();
              alert("Error!!");
            }
        })
        .catch(function(error){
            console.log(error);
            //Perform action based on error
        });
    }
}

export default Login;