import React from 'react';
import Header from '../../component/header';
import { Link } from 'react-router-dom';


class Error extends React.Component{
    constructor(props){
        super(props);
        this.state ={
            userCount: '-',
            productCount: '-',
            orderCount: '-',
        }
    }
   
    render(){
        return(
            <div id="page-wrapper">
            <Header title="Error page"/>
            <div className="row">
                <div className="col-md-12">
                <p className="error">Something is wrong...</p>
                <Link to="/">Go to Home</Link>
                </div>
            
            </div>
           
            </div>
        );
    }
}

export default Error;