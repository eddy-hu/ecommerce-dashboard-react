import React from "react";
import Header from "../../component/header";
import { Link } from "react-router-dom";
import Pagination from "../../util/pagination";
import Util from "../../util/index";
import OrderService from "../../service/order-service";
import TableList from "../../util/table-list/index";
import ListSearch from './index-list-search';

const orderService = new OrderService();
const util = new Util();
class OrderList extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      list: [],
      pageNum: 1,
      listType: 'list',
    };
  }
  componentDidMount() {
    this.loadOrderList();
  }

  loadOrderList() {
    let listParam = {
    };
    listParam.listType =this.state.listType;
    listParam.pageNum = this.state.pageNum
    if(this.state.listType === 'search'){
      listParam.orderNo =this.state.orderNumber;
    }

    orderService.getOrderList(listParam).then(
      res => {
        this.setState(res);
      },
      errMsg => {
        this.setState({
          list: []
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
        this.loadOrderList();
      }
    );
  }

  onSearch(orderNumber){
    let listType = orderNumber === '' ? 'list' : 'search';
    this.setState({
      listType : listType,
      pageNum : 1,
      orderNumber : orderNumber,
    }, ()=> {
      this.loadOrderList();
    });
  }

  render() {
    let tableHeads = ['ID','Recipient','Status','Amount','Orderd Time','Edit'];
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
        <Header title="Order List" >
        <div className="page-header-right"/>
        </Header>
        <ListSearch onSearch={(orderNumber) => { this.onSearch(orderNumber)} }/>
        <TableList tableHeads={tableHeads}>
          {this.state.list.map((order, index) => {
            return (
              <tr key={index}>
                <td>
                <Link className="opear" to={`/order/detail/${order.orderNo}`}>        
                {order.orderNo}
                </Link>
                </td>
                <td>{order.receiveName}</td>
                <td>{order.statusDesc}</td>
                <td>${order.payment}</td>
                <td>{order.createTime}</td>
                <td>
                  <Link className="opear" to={`/order/detail/${order.orderNo}`}>
                    Detail
                  </Link>
                </td>
              </tr>
            );
          })}
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

export default OrderList;
