import React from 'react';
import Header from '../../component/header';
import { Link } from 'react-router-dom';
import Pagination from '../../util/pagination';
import Util from '../../util';
import UserService from '../../service/user-service';

const userService = new UserService();
const util = new Util();
class UserList extends React.Component{
    constructor(props){
        super(props);
        this.state ={
            isLoggedIn: false,
            pageNum : 0
        }
    }
    componentDidMount(){
        this.loadUserList();
    }

    loadUserList(){
        console.log("Loading user list")
        userService.getUserList(this.state.pageNum).then(res => {
            this.setState(res);
        }, errMsg => {
            util.errorTips(errMsg);
        });
    }
   
    render(){
        return(
            <div id="page-wrapper">
            <Header title="User List"/>
            <div className="row">
            <div className="col-md-12">
                    <table className="table table-striped table-bordered">
                        <thead>
                            <tr>
                                <th>ID</th>
                                <th>ID</th>
                                <th>ID</th>
                                <th>ID</th>
                                <th>ID</th>
                            </tr>

                        </thead>
                        <tbody>
                            <tr>
                                <td>aa</td>
                                <td>aa</td>
                                <td>aa</td>
                                <td>aa</td>
                                <td>aa</td> 
                            </tr>
                        </tbody>

                    </table>
               
                </div>
            
            </div>
            <Pagination current={11} total={200} />
           
            </div>
        );
    }
}

export default UserList;