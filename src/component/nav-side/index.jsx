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

                    <li className="dashboard-menu">
                        <NavLink exact activeClassName="active-menu" to="/">
                        <i className="fa fa-dashboard"></i> 
                        <span>Dashboard</span>
                        </NavLink>
                    </li>

                    <li className="active dashboard-menu">
                        <Link to="/product"><i className="fa fa-list">
                        </i>
                        <span>
                         Products
                         </span>
                         <span className="fa arrow"> </span>
                         </Link>
                        <ul className="nav nav-second-level collapse-in dashboard-menu">
                            <li>
                                <NavLink to="/product"  className="dashboard-menu" activeClassName="active-menu dashboard-menu"> &nbsp; &nbsp; Products</NavLink>
                            </li>
                            <li>
                                <NavLink to="/product-category"  className="dashboard-menu" activeClassName="active-menu dashboard-menu"> &nbsp; &nbsp;  Catogories</NavLink>
                            </li>
                            
                        </ul>
                    </li>
                    <li className="active dashboard-menu">
                        <Link to="/order"><i className="fa fa-check-square-o">
                        </i>
                        <span>
                         Orders
                         </span>
                         <span className="fa arrow"> </span>
                         </Link>
                        <ul className="nav nav-second-level collapse-in dashboard-menu">
                            <li>
                                <NavLink  className="dashboard-menu" activeClassName="active-menu dashboard-menu" to="/order"> &nbsp; &nbsp;  Orders</NavLink>
                            </li>
                            
                        </ul>
                    </li>
                    
                    <li className="active dashboard-menu">
                        <Link to="/user"><i className="fa fa-user-o">
                        </i>
                        <span>
                         Users
                         </span>
                         <span className="fa arrow"> </span>
                         </Link>
                        <ul className="nav nav-second-level collapse-in dashboard-menu">
                            <li>
                                <NavLink  className="dashboard-menu" activeClassName="active-menu" to="/user"> &nbsp; &nbsp; Users</NavLink>
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