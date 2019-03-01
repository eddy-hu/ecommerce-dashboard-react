import React from "react";
import Header from "../../component/header";
import { Link } from "react-router-dom";
import Pagination from "../../util/pagination";
import Util from "../../util";
import UserService from "../../service/user-service";
import TableList from "../../util/table-list";

const userService = new UserService();
const util = new Util();
class UserList extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      list: [],
      pageNum: 1,
    };
  }
  componentDidMount() {
    this.loadUserList();
  }

  loadUserList() {
    console.log("Loading user list");
    userService.getUserList(this.state.pageNum).then(
      res => {
        this.setState(res);
      },
      errMsg => {
          this.setState({
            list : []
          });
        util.errorTips(errMsg);
      }
    );
  }
  onPageNumChange(pageNum) {
    this.setState(
      {
        pageNum: pageNum
      },
      () => {
        this.loadUserList();
      }
    );
  }

  render() {
    let listBody = this.state.list.map((user, index) => {
      return (
        <tr key={index}>
          <td>{user.id}</td>
          <td>{user.username}</td>
          <td>{user.email}</td>
          <td>{user.phone}</td>
          <td>{new Date(user.createTime).toLocaleDateString()}</td>
        </tr>
      );
    });

    return (
      <div id="page-wrapper">
        <Header title="User List" />
        <TableList tableHeads={['ID','Username','Email','Phone','Create Date']}>
          {listBody}
        </TableList>
        <Pagination
          current={this.state.pageNum}
          total={this.state.total}
          onChange={pageNum => {
            this.onPageNumChange(pageNum);
          }}
        />
      </div>
    );
  }
}

export default UserList;
