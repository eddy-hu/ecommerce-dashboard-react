import React from 'react';
import { Link, NavLink} from 'react-router-dom';

class NavSide extends React.Component{

    constructor(props){
        super(props);
    }

    render(){
        return(
            <div className="navbar-default navbar-side" >
            <div className="sidebar-collapse">
                <ul className="nav">

                    <li>
                        <NavLink exact activeClassName="active-menu" to="/">
                        <i className="fa fa-dashboard"></i> 
                        <span>Dashboard</span>
                        </NavLink>
                    </li>

                    <li className="active">
                        <Link to="/product"><i className="fa fa-list">
                        </i>
                        <span>
                         Products
                         </span>
                         <span className="fa arrow"> </span>
                         </Link>
                        <ul className="nav nav-second-level collapse-in">
                            <li>
                                <NavLink to="/product" activeClassName="active-menu"> &nbsp; &nbsp; Products</NavLink>
                            </li>
                            <li>
                                <NavLink to="/product-category" activeClassName="active-menu"> &nbsp; &nbsp;  Catogories</NavLink>
                            </li>
                            
                        </ul>
                    </li>
                    <li className="active">
                        <Link to="/order"><i className="fa fa-check-square-o">
                        </i>
                        <span>
                         Orders
                         </span>
                         <span className="fa arrow"> </span>
                         </Link>
                        <ul className="nav nav-second-level collapse-in">
                            <li>
                                <NavLink activeClassName="active-menu" to="/order"> &nbsp; &nbsp;  Orders</NavLink>
                            </li>
                            
                        </ul>
                    </li>
                    
                    <li className="active">
                        <Link to="/user"><i className="fa fa-user-o">
                        </i>
                        <span>
                         Users
                         </span>
                         <span className="fa arrow"> </span>
                         </Link>
                        <ul className="nav nav-second-level collapse-in">
                            <li>
                                <NavLink activeClassName="active-menu" to="/user"> &nbsp; &nbsp; Users</NavLink>
                            </li>
 
                        </ul>
                    </li>
                    
                    
                </ul>

            </div>

        </div>
        );
    }
}

export default NavSide;