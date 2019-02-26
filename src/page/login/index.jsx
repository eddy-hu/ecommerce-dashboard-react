import React from "react";
import Header from "../../component/header";
import "./index.scss";
import User from "../../service/user-service";
import Util from "../../util";

const util = new Util();
const user = new User();

class Login extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      username: "",
      password: "",
      redirect: util.getUrlParam("redirect") || "/"
    };
  }

  componentWillMount(){
      document.title='Login - E-Commerce dashboard'
  }

  //input username and password
  onInputChange(e) {
    let inputValue = e.target.value,
      inputName = e.target.name;
    // console.log(inputName,inputValue);
    this.setState({
      [inputName]: inputValue
    });
  }

  onInputKeyUp(e){
    if(e.keyCode === 13){
      this.onSubmit();
    }
  }
  //click login button
  onSubmit(e) {
    let loginInfo = {
      username: this.state.username,
      password: this.state.password
    };
    let checkResult = user.checkLoginInfo(loginInfo);
    //valid login info
    if (checkResult.status) {
      user.login(loginInfo).then(
        res => {
          //console.log(this.state.redirect);
          util.setStorage('userInfo',res);
          this.props.history.push(this.state.redirect);
        },
        errMsg => {
          util.errorTips(errMsg);
        }
      );
    } else { // invalid login info
       util.errorTips(checkResult.msg);
    }
  }

  render() {
    return (
      <div>
        <div className="panel panel-default login-card">
          <h3>LOGIN - E-Commerce Dashboard</h3>
          <br />
          <div className="panel-body">
            <div>
              <div className="form-group">
                <label htmlFor="username">Username</label>
                <input
                  type="text"
                  name="username"
                  className="form-control"
                  id="username"
                  placeholder="Username"
                  onKeyUp={e => this.onInputKeyUp(e)}
                  onChange={e => this.onInputChange(e)}
                />
              </div>
              <div className="form-group">
                <label htmlFor="password">Password</label>
                <input
                  type="password"
                  name="password"
                  className="form-control"
                  id="password"
                  placeholder="Password"
                  onKeyUp={e => this.onInputKeyUp(e)}
                  onChange={e => this.onInputChange(e)}
                />
              </div>
              <button
                className="btn btn-block btn-primary"
                onClick={e => this.onSubmit(e)}
              >
                LOGIN
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default Login;
