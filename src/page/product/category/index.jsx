import React from "react";
import Header from "../../../component/header";
import { Link } from "react-router-dom";
import Util from "../../../util";
import ProductService from "../../../service/product-service";
import TableList from "../../../util/table-list";

const productService = new ProductService();
const util = new Util();
class CategoryList extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      list: [],
      parentCategoryId: this.props.match.params.categoryId || 0,
    };
  }
  componentDidMount() {
    this.loadCategoryList();
  }

  componentDidUpdate(prevProps, prevState){
    let oldPath = prevProps.location.pathname;
    let newPath = this.props.location.pathname;
    let newId = this.props.match.params.categoryId || 0;
    if(oldPath !== newPath){
        this.setState({
            parentCategoryId : newId
        },()=>{
            this.loadCategoryList();
        })
    }
  }

  loadCategoryList() {
    console.log("Loading user list");
    productService.getCategoryList(this.state.parentCategoryId).then(
      res => {
        this.setState({
            list : res
        });
      },
      errMsg => {
          this.setState({
            list : []
          });
        util.errorTips(errMsg);
      }
    );
  }

  onUpdateName(categoryId, categoryName){
    let newName = window.prompt('Enter new category name',categoryName);
    if(newName){
        productService.updateCategoryName({
            categoryId: categoryId,
            categoryName: newName,
        }).then(res => {
            util.successTips(res);
            this.loadCategoryList();
        }, errMsg => {
            util.errorTips(errMsg);
        });
    }
  }

  render() {
    let listBody = this.state.list.map((category, index) => {
      return (
        <tr key={index}>
          <td>{category.id}</td>
          <td>{category.name}</td>
          <td>
          <a className="opear"
          onClick={(e) => this.onUpdateName(category.id, category.name)}
          >Edit Name</a>
          {
              category.parentId  === 0 
              ? <Link to={`/product-category/index/${category.id}`}>Sub Categories</Link>
              : null
          }
          </td>
        </tr>
      );
    });

    return (
      <div id="page-wrapper">
        <Header title={this.state.id? 'Edit' : 'Add'} />
        <div className="row">
            <div className="col-md-12">
                <p>Parent Category ID:{this.state.parentCategoryId}</p>
            </div>
        </div>
        <TableList tableHeads={['ID','Name','Edit']}>
          {listBody}
        </TableList>
      </div>
    );
  }
}

export default CategoryList;
