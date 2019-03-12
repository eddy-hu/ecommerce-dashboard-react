import React, { Component } from "react";
import Header from "../../../component/header";
import Util from "../../../util/index";
import ProductService from "../../../service/product-service";
import CategorySelector from "./category-selector";
import FileUploader from "../../../util/file-uploader/index";
import MyEditor from "../../../util/rich-editor/index";
import "./save.scss";

const productService = new ProductService();
const util = new Util();

class ProductDetail extends Component {
  constructor(props) {
    super(props);
    this.state = {
      id: this.props.match.params.pid,
      title:'',
      description:'',
      price:'',
      quantity:'',
      detail:'',
      status: 1, //1 means available
      categoryId: 0,
      parentCategoryId: 0,
      subImages: [],
    };
  }

  componentDidMount(){
    this.loadProduct();
  }
  //loading product detail
  loadProduct(){
    if(this.state.id){// if state has id means that edit button has been clicked
      productService.getProduct(this.state.id).then((res)=> {
        let images = res.subImages.split(',');
        res.subImages = images.map((imgUri) => {
          return{
            uri: imgUri,
            url: res.imageHost+imgUri,
          }
        });
        this.setState(res);
      }, (errMsg)=> {
        util.errorTips(errMsg);
      })
    }
  }

  render() {
    return (
      <div id="page-wrapper">
        <Header title="Add Product" />
        <div>
          <div className="form-group row">
            <label className="col-md-2 col-form-label">Title</label>
            <div className="col-md-5">
                <p className="form-control-static">{this.state.title}</p>
            </div>
          </div>

          <div className="form-group row">
            <label className="col-md-2 col-form-label">Description</label>
            <div className="col-md-8">
            <p className="form-control-static">{this.state.description}</p>
            </div>
          </div>

          <div className="form-group row">
            <label className="col-md-2 col-form-label">Category</label>
            <CategorySelector
              readOnly
              categoryId={this.state.categoryId}
              parentCategoryId={this.state.parentCategoryId}
            />
          </div>

          <div className="form-group row">
            <label className="col-md-2 col-form-label">Price</label>
            <div className="col-md-3">
              <div className="input-group-prepend">
                <span className="input-group-text">$</span>
                <input
                  type="number"
                  readOnly
                  value={this.state.price}
                />
              </div>
            </div>
          </div>

          <div className="form-group row">
            <label className="col-md-2 col-form-label">Quantity</label>
            <div className="col-md-3">
              <input
                readOnly
                type="number"
                className="form-control"
                value={this.state.quantity}
                onChange={(e) =>this.onValueChange(e)}
              />
            </div>
          </div>

          <div className="form-group row">
            <label className="col-md-2 col-form-label">Images</label>
            <div className="col-md-10">
              {this.state.subImages.length ? (
                this.state.subImages.map((image, index) => (
                  <div className="img-con" key={index}>
                    <img className="img" src={image.url} />
                  </div>
                ))
              ) : (
                <div>No image</div>
              )}
            </div>
          </div>

          <div className="form-group row" >
            <label className="col-md-2 col-form-label">Detail</label>
            <div className="col-md-10" dangerouslySetInnerHTML= {{__html:this.state.detail}}>
              
            </div>
          </div>

        </div>
      </div>
    );
  }
}

export default ProductDetail;
