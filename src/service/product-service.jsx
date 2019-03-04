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
