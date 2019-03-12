import React, { Component } from 'react';
import './category-selector.scss';
import ProductService from "../../../service/product-service";
import Util from "../../../util/index";

const productService = new ProductService();
const util = new Util();

class CategorySelector extends Component {

    constructor(props){
        super(props);
        this.state={
            firstCategoryList : [],
            firstCategoryId : 0,
            secondCategoryList : [],
            secondCategoryId: 0,
        }
    }

    componentWillReceiveProps(nextProps){
        let categoryIdChange = this.props.categoryId !== nextProps.categoryId;
        let parentCategoryIdChange = this.props.parentCategoryId !== nextProps.parentCategoryId;
        //ids didn't change
        if(!categoryIdChange && !parentCategoryIdChange){
            return;
        }

        if(nextProps.parentCategoryId === 0){
            this.setState({
                firstCategoryId: nextProps.categoryId,
                secondCategoryId: 0,
            })
        }else{
            this.setState({
                firstCategoryId: nextProps.firstCategoryId,
                secondCategoryId: nextProps.categoryId
            }, ()=> {
                parentCategoryIdChange && this.loadSecondCategory();
            })

        }




    }

    componentDidMount(){
        this.loadFirstCategory();
    }

    loadFirstCategory(){
        productService.getCategoryList().then(res => {
            this.setState({
                firstCategoryList : res
            });
        }, errMsg => {
            util.errorTips(errMsg);
        });
    }

    loadSecondCategory(){
        productService.getCategoryList(this.state.firstCategoryId).then(res => {
            this.setState({
                secondCategoryList : res
            });
        }, errMsg => {
            util.errorTips(errMsg);
        });
    }
    onFirstCategoryChange(e){
        if(this.props.readOnly){
            return;
        }
        let newValue = e.target.value || 0;
        this.setState({
            firstCategoryId : newValue,
            secondCategoryId : 0,
            secondCategoryList : [],
        }, ()=> {
            //load second category
            this.loadSecondCategory();
            this.onPropsCategoryChange();
        });
    }

    onSecondCategoryChange(e){
        if(this.props.readOnly){
            return;
        }
        let newValue = e.target.value || 0;
        this.setState({
            secondCategoryId : newValue,
        }, ()=> {
            this.onPropsCategoryChange();
        });
    }

    //passing selected result to super component
    onPropsCategoryChange(){
        //check function exist in props
        let categoryChangeable = typeof this.props.onCategoryChange === 'function';
        if(this.state.secondCategoryId){//if it has second category id
            categoryChangeable && this.props.onCategoryChange(this.state.secondCategoryId,this.state.firstCategoryId);
        }else{
            categoryChangeable && this.props.onCategoryChange(this.state.firstCategoryId,0);
        }
    }



    render() {

        let options = this.state.firstCategoryList === null ? null : this.state.firstCategoryList.map(
            (category,index) => <option value={category.id} key={index}>{category.name}</option> );

      return (
        <div className="col-md-10">
        <select className="form-control category-select"
        readOnly={this.props.readOnly}
        value={this.state.firstCategoryId}
        onChange= {(e) => this.onFirstCategoryChange(e)}
        >
           <option value="">Select category</option>
           {options}
          
        </select>
        {  this.state.secondCategoryList.length ?  //if the length equals 0, return null;
        <select name=""   className="form-control category-select"
          readOnly={this.props.readOnly}
          value={this.state.secondCategoryId}
          onChange= {(e) => this.onSecondCategoryChange(e)}
          >
           <option value="">Select sub-category</option>
           {
               this.state.secondCategoryList.map(
                   (category,index) => <option value={category.id} key={index}>{category.name}</option> )
           }
      </select> : null
        }
       </div>
      );
    }
  }
  
  export default CategorySelector;