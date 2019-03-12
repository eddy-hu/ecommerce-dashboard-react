import Util from "../util";
import $ from "jquery";
const util = new Util();

class ProductService {


  getProductList(listParam){
    let url = '';
    let data = {};
    if(listParam.listType === 'list'){
      url = "http://admintest.happymmall.com/manage/product/list.do";
      data.pageNum =listParam.pageNum;
    }else if(listParam.listType === 'search'){
      url = "http://admintest.happymmall.com/manage/product/search.do";
      data.pageNum =listParam.pageNum;
      data[listParam.searchType] = listParam.keyword;

    }

    return util.request({
      type : 'post',
      url :  url,
      data : data,
    })
  }

  getProduct(id){
    return util.request({
      type : 'post',
      url :  "http://admintest.happymmall.com/manage/product/detail.do",
      data : {
        productId: id || 0,
      },
    });
  }

  checkProduct(product){
    let result = {
      status: true,
      msg: 'Validated'
    };
    if(typeof product.title !== 'string' || product.title.length ===0){
      return {
        status:false,
        msg: 'Product title connot be empty!',
      }
    }

    if(typeof product.description !== 'string' || product.description.length ===0){
      return {
        status:false,
        msg: 'Product description connot be empty!',
      }
    }

    if(typeof product.price !== 'number' || !(product.price >=0)){
      return {
        status:false,
        msg: 'Please enter a valid price!',
      }
    }

    if(typeof product.quantity !== 'number' || !(product.price >=0)){
      return {
        status:false,
        msg: 'Please enter a valid quantity!',
      }
    }
    
    if(typeof product.productId !== 'number' || !(product.price >=0)){
      return {
        status:false,
        msg: 'Please choose a category!',
      }
    }

    return result;

  }


  saveProduct(product){
    return util.request({
      type : 'post',
      url :  "http://admintest.happymmall.com/manage/product/save.do",
      data : product,
    });
  }

  setProductStatus(productInfo){
    return util.request({
      type : 'post',
      url :  "http://admintest.happymmall.com/manage/set_sale_status.do",
      data : productInfo,
    });
  }

  //Category services

  getCategoryList(parentCategoryId){
    return util.request({
      type : 'post',
      url :  "http://admintest.happymmall.com/manage/category/get_category.do",
      data : {
        categoryId : parentCategoryId || 0,
        
      }
    });
  }

}

export default ProductService;
