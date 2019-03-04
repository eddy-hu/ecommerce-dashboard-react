import React from "react";
import Header from "../../../component/header";
import { Link } from "react-router-dom";
import Pagination from "../../../util/pagination";
import Util from "../../../util/index";
import ProductService from "../../../service/product-service";
import TableList from "../../../util/table-list/index";
import "./index.scss";
import ListSearch from './index-list-search';

const productService = new ProductService();
const util = new Util();
class ProductList extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      list: [],
      pageNum: 1,
      listType: 'list',
    };
  }
  componentDidMount() {
    this.loadProductList();
  }

  loadProductList() {
    let listParam = {
    };
    listParam.listType =this.state.listType;
    listParam.pageNum = this.state.pageNum
    if(this.state.listType === 'search'){
      listParam.listType =this.state.searchType;
      listParam.keyword =this.state.keyword;
    }

    productService.getProductList(listParam).then(
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
        this.loadProductList();
      }
    );
  }

  onSearch(searchType, searchKeyword){
    let listType = searchKeyword === '' ? 'list' : 'search';
    this.setState({
      listType : listType,
      pageNum : 1,
      searchType : searchType,
      searchKeyword : searchKeyword, 
    }, ()=> {
      this.loadProductList();
    });
  }

  onSetProductStatus(e, productId, currentStatus) {
    let newStatus = currentStatus === 1 ? 2 : 1;
    let confirmTips =
      currentStatus === 1
        ? "Are you sure you want to make this product unavailable?"
        : "Are you sure you want to make this product available?";
    if (window.confirm(confirmTips)) {
      productService
        .setProductStatus({
          productId: productId,
          status: newStatus
        })
        .then(
          res => {
            util.successTips(res);
            this.loadProductList();
          },
          errMsg => {
            util.errorTips(errMsg);
          }
        );
    }
  }

  render() {
    let tableHeads = [
      { name: "ID", width: "10%" },
      { name: "Product Info", width: "50%" },
      { name: "Price", width: "10%" },
      { name: "Status", width: "15%" },
      { name: "Edit", width: "15%" }
    ];
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
        <Header title="Product List" >
        <div className="page-header-right">
        
          <Link to="/product-save" className="btn btn-primary">  
          <i className="fa fa-plus"></i>
          <span>Add</span>
          </Link>
        </div>
        </Header>
        <ListSearch onSearch={(searchType, searchKeyword) => { this.onSearch(searchType, searchKeyword)} }/>
        <TableList tableHeads={tableHeads}>
          {this.state.list.map((product, index) => {
            return (
              <tr key={index}>
                <td>{product.id}</td>
                <td>
                  <p> {product.name}</p>
                  <p> {product.subtitle}</p>
                </td>
                <td>${product.price}</td>
                <td>
                  <p>{product.status === 1 ? "Available" : "Unavailable"}</p>
                  <button
                    className="btn btn-warning btn-xs"
                    onClick={e => {
                      this.onSetProductStatus(e, product.id, product.status);
                    }}
                  >
                    {product.status === 1 ? "Unavailable" : "Available"}
                  </button>
                </td>
                <td>
                  <Link className="opear" to={`/product/detail/${product.id}`}>
                    Detail
                  </Link>
                  <Link className="opear" to={`/product/save/${product.id}`}>
                    Edit
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

export default ProductList;
