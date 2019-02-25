import React from 'react';
import { Link } from 'react-router-dom';

class NavTop extends React.Component{

    constructor(props){
        super(props);
    }

    onLogout(){
        
    }
    render(){
        return(
            <div className="navbar navbar-default top-navbar">
            <div className="navbar-header">
         
                <Link className="navbar-brand" to="index.html"><b>E</b>Commerce</Link>
            </div>

            <ul className="nav navbar-top-links navbar-right">
 
                <li className="dropdown">
                    <a className="dropdown-toggle" href="javascript:;" >
                        <i className="fa fa-user fa-fw"></i>
                        <span>Welcome, Admin</span>
                    </a>
                    <ul className="dropdown-menu dropdown-user">
                        <li>
                            <span onClick={() => {this.onLogout()}}>
                            <i className="fa fa-sign-out fa-fw">
                            </i> Logout
                            </span>
                        </li>
                    </ul>
                </li>
            </ul>
            </div>);
    }
}

export default NavTop;