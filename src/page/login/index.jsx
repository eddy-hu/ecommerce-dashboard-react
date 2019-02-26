import React from "react";
import Header from "../../component/header";
import "./index.scss";

class Login extends React.Component {
    constructor(props){
        super(props);
        this.state= {
            username: '',
            password: '',
        }

    }

    onUserNameChange(e){
        console.log(e.target.value);
        this.setState({
            username: e.target.value
        });
    }

  render() {
    return (
      <div >
             <div className="panel panel-default login-card">
          <h3>LOGIN - E-Commerce Dashboard</h3>
          <br></br>
          <div className="panel-body">
            <form>
              <div className="form-group">
                <label htmlFor="username">Username</label>
                <input
                  type="text"
                  className="form-control"
                  id="username"
                  placeholder="Username"
                  onChange={ e => this.onUserNameChange(e)}
                />
              </div>
              <div className="form-group">
                <label htmlFor="password">Password</label>
                <input
                  type="password"
                  className="form-control"
                  id="password"
                  placeholder="Password"
                />
              </div>
              <button type="submit" className="btn btn-block btn-primary">
                LOGIN
              </button>
            </form>
          </div>
        </div>
      </div>
    );
  }
}

export default Login;
