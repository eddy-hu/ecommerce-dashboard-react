import Util from "../util";
import $ from "jquery";
const util = new Util();

class User {
  login(loginInfo) {
    return util.request({
      type: "post",
      url: "http://admintest.happymmall.com/manage/user/login.do",
      data: loginInfo
    });
  }

  logout(){
    return util.request({
        type: "post",
        url: "http://admintest.happymmall.com/user/logout.do",
      });
  }

  //validate login Info
  checkLoginInfo(loginInfo) {
    let username = $.trim(loginInfo.username);
    let password = $.trim(loginInfo.password);
    //validate username
    if (typeof username !== "string" || username.length === 0) {
      return {
        status: false,
        msg: "Please enter the username"
      };
    }
    //validate password
    if (typeof password !== "string" || password.length === 0) {
      return {
        status: false,
        msg: "Please enter the password"
      };
    }

    return {
        status: true,
        msg: 'username and password are valid',
    }
  }
}

export default User;
