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

class ProductSave extends Component {
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
        res.defaultDetail = res.detail;
        this.setState(res);
      }, (errMsg)=> {
        util.errorTips(errMsg);
      })
    }
  }

  onCategoryChange(categoryId, parentCategoryId) {
    this.setState({
      categoryId: categoryId,
      parentCategoryId: parentCategoryId,
    })
  }
  onValueChange(e){
    let name=e.target.name,
        value=e.target.value.trim();
    this.setState({
      [name]: value
    });
  }

  onDetailValueChange(value){
    console.log(value);
    this.setState({
      detail:value
    });

  }

  getSubImagesString(){
    return this.state.subImages.map((image) => image.url).join(',');
  }

  onSubmit(){
    let product ={
      title: this.state.title,
      description: this.state.description,
      price: parseFloat(this.state.price),
      quantity: parseInt(this.state.quantity),
      detail: this.state.detail,
      status: this.state.status,
      categoryId: parseInt(this.state.categoryId),
      parentCategoryId: this.state.parentCategoryId,
      subImages: this.getSubImagesString(),
    }
    //console.log(product);
    let productCheckResult= productService.checkProduct(product);

    if(this.state.id){
      product.id= this.state.id;
    }

    if(productCheckResult.status){
      productService.saveProduct().then((res) => {
        util.successTips(res);
        this.props.history.push('/product');
      },(errMsg) => {
        util.errorTips(errMsg);
      })
    }else{
      util.errorTips(productCheckResult.msg);
    }
  }

  onUploadSuccess(res) {
    let subImages = this.state.subImages;
    subImages.push(res);
    this.setState({
      subImages: subImages
    });
  }
  onError(errMsg) {
    util.errorTips(errMsg);
  }

  onImageDelete(e) {
    let index = e.target.index;
    let subImages = this.state.subImages;
    subImages.splice(index, 1);
    this.setState({
      subImages: subImages
    });
  }

  onEditorStateChange (editorState) {
    console.log(this);
    this.setState({
      editorState,
    });
  }

  render() {
    return (
      <div id="page-wrapper">
        <Header title="Add Product" />
        <div>
          <div className="form-group row">
            <label className="col-md-2 col-form-label">Title</label>
            <div className="col-md-5">
              <input
                type="text"
                className="form-control"
                placeholder="Enter the product title"
                name="title"
                value={this.state.title}
                onChange={(e) =>this.onValueChange(e)}
              />
            </div>
          </div>

          <div className="form-group row">
            <label className="col-md-2 col-form-label">Description</label>
            <div className="col-md-8">
              <input
                type="text"
                className="form-control"
                placeholder="Enter the product description"
                name="description"
                value={this.state.description}
                onChange={(e) =>this.onValueChange(e)}
              />
            </div>
          </div>

          <div className="form-group row">
            <label className="col-md-2 col-form-label">Category</label>
            <CategorySelector
              categoryId={this.state.categoryId}
              parentCategoryId={this.state.parentCategoryId}
              onCategoryChange={(categoryId, parentCategoryId) =>
                this.onCategoryChange(categoryId, parentCategoryId)
              }
            />
          </div>

          <div className="form-group row">
            <label className="col-md-2 col-form-label">Price</label>
            <div className="col-md-3">
              <div className="input-group-prepend">
                <span className="input-group-text">$</span>
                <input
                  type="number"
                  className="form-control"
                  placeholder="0"
                  name="price"
                  value={this.state.price}
                  onChange={(e) =>this.onValueChange(e)}
                />
              </div>
            </div>
          </div>

          <div className="form-group row">
            <label className="col-md-2 col-form-label">Quantity</label>
            <div className="col-md-3">
              <input
                type="number"
                className="form-control"
                placeholder="0"
                name="quantity"
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
                    <i
                      className="fa fa-close"
                      index={index}
                      onClick={e => this.onImageDelete(e)}
                    />
                  </div>
                ))
              ) : (
                <div>Please upload image</div>
              )}
            </div>
            <div className="col-md-offset-2 col-md-10">
              <FileUploader
                onSuccess={res => {
                  this.onUploadSuccess(res);
                }}
                onError={errMsg => {
                  this.onUploadError(errMsg);
                }}
              />
            </div>
          </div>

          <div className="form-group row">
            <label className="col-md-2 col-form-label">Detail</label>
            <div className="col-md-10">
              <MyEditor 
              detail={this.state.detail}
              defaultDetail={this.state.defaultDetail}
               onChange={(value) =>this.onDetailValueChange(value)}
              />
            </div>
          </div>

          <div className="form-group row">
            <div className="col-md-10">
              <button type="submit" onClick={(e)=>this.onSubmit(e)} className="btn btn-primary">
                Save
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default ProductSave;
