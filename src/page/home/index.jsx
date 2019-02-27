import React from 'react';
import './index.scss';
import Header from '../../component/header';
import { Link } from 'react-router-dom';
import Util from '../../util';
import StatisticService from '../../service/statistic-service';

const util = new Util();
const statisticService = new StatisticService();
class Home extends React.Component{
    constructor(props){
        super(props);
        this.state ={
            userCount: '-',
            productCount: '-',
            orderCount: '-',
        }
    }
    //DidMount is safer than will mount
    componentDidMount(){
        this.loadCount();
    }
    loadCount(){
        statisticService.getHomeCount().then(res => {
            this.setState(res);
        },errMsg => {
            util.errorTips(errMsg);
        });
    }
    render(){
        return(
            <div id="page-wrapper">
           <Header title="HOME">

           </Header>
           <div className="row">
           <div className="col-md-4">
               <Link to= "/user" className="color-box brown">
                <p className="count">{this.state.userCount}</p>
                <p className="description">
                    <i className="fa fa-user-o"></i>
                    <span>Users</span> </p>
               </Link>
                
           </div>

           <div className="col-md-4">
               <Link to= "/product"  className="color-box green" >
                <p className="count">{this.state.productCount}</p>
                <p className="description"> 
                    <i className="fa fa-list"></i>
                    <span>Products</span></p>
               </Link>
                
           </div>
           <div className="col-md-4">
               <Link to= "/order"  className="color-box blue">
                <p className="count">{this.state.orderCount}</p>
                <p className="description"> 
                    <i className="fa fa-check-square-o"></i>
                    <span>Orders</span></p>
               </Link>
                
           </div>

           </div>

            </div>
        );
    }
}

export default Home;