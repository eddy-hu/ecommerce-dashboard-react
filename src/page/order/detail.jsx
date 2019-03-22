import React, { Component } from "react";
import Header from "../../component/header";
import TableList from "../../util/table-list/index.jsx";
import Util from "../../util/index";
import OrderService from "../../service/order-service";
import './detail.scss';


const orderService = new OrderService();
const util = new Util();

class OrderDetail extends Component {
  constructor(props) {
    super(props);
    this.state = {
      orderNumber: this.props.match.params.orderNumber,
      orderInfo: {}
    };
  }

  componentDidMount(){
    this.loadOrderDetail();
  }
  //loading order detail
  loadOrderDetail(){
      orderService.getOrderDetail(this.state.id).then((res)=> {
        this.setState({
            orderInfo: res
        });
      }, (errMsg)=> {
        util.errorTips(errMsg);
      })
  }

  onShip(e){
    if(window.confirm('The order has been shipped?')){
        orderService.ship(this.state.orderNumber).then((res) => {
            util.successTips('Shipped succesfully');
            this.loadOrderDetail();
        }, (errMsg) =>{
            util.errorTips(errMsg);
        })
    }

  }

  render() {

    let receiverInfo = this.state.orderInfo.shippingVo || {};
    let productList =  this.state.orderInfo.orderItemVoList || [];
    let tableHeads = [
                     {name: 'Image', width: '10%'},
                     {name: 'Description', width: '45%'},
                     {name: 'Price', width: '15%'},
                     {name: 'Quantity', width: '15%'},
                     {name: 'Amount', width: '15%'},
                     ];
    return (
      <div id="page-wrapper">
        <Header title="Order Detail" />
        <div>
          <div className="form-group row">
            <label className="col-md-2 col-form-label">Order No</label>
            <div className="col-md-5">
                <p className="form-control-static">{this.state.orderInfo.orderNo}</p>
            </div>
          </div>

          <div className="form-group row">
            <label className="col-md-2 col-form-label">Created Time</label>
            <div className="col-md-8">
            <p className="form-control-static">{this.state.orderInfo.createTime}</p>
            </div>
          </div>

          <div className="form-group row">
            <label className="col-md-2 col-form-label">Receipient</label>
            <div className="col-md-8">
            <p className="form-control-static">
            {receiverInfo.receiverName}, 
            {receiverInfo.receiverProvince}
            {receiverInfo.receiverCity}
            {receiverInfo.receiverAddress}
            {receiverInfo.receiverMobile || receiverInfo.receiverPhone}
            </p>
            </div>
          </div>

          <div className="form-group row">
            <label className="col-md-2 col-form-label">Status</label>
            <div className="col-md-8">
            <p className="form-control-static">
            {this.state.orderInfo.statusDesc}
            {
                this.state.orderInfo.status === 20
                ?<button className="btn btn-default btn-sm btn-ship"
                onClick={(e) =>{this.onShip(e)}}
                > Ship</button>
                : null
            }
            </p>
            </div>
          </div>

          <div className="form-group row">
            <label className="col-md-2 col-form-label">Payment</label>
            <div className="col-md-8">
            <p className="form-control-static">{this.state.orderInfo.paymentTypeDesc}</p>
            </div>
          </div>

          <div className="form-group row">
            <label className="col-md-2 col-form-label">Amount</label>
            <div className="col-md-8">
            <p className="form-control-static">${this.state.orderInfo.payment}</p>
            </div>
          </div>

          <div className="form-group row">
            <label className="col-md-2 col-form-label">Product List</label>
            <div className="col-md-10">
                 <TableList tableHeads={tableHeads}>
                  {productList.map((product, index) => {
                    return (
                    <tr key={index}>
                        <td>
                            <img className="p-img" alt={product.productName}
                            src={`${this.state.orderInfo.imageHost}${product.productImage}`} />
                        </td>
                        <td>{product.productName}</td>
                        <td>${product.currentUnitPrice}</td>
                        <td>{product.quantity}</td>
                        <td>${product.totalPrice}</td>
                    </tr>
                    );
                  })}
                </TableList>
            </div>
          </div>

        </div>
      </div>
    );
  }
}

export default OrderDetail;