import Util from "../util";
import $ from "jquery";
const util = new Util();

class OrderService {


  getOrderList(listParam){
    let url = '';
    let data = {};
    if(listParam.listType === 'list'){
      url = "http://admintest.happymmall.com/manage/order/list.do";
      data.pageNum =listParam.pageNum;
    }else if(listParam.listType === 'search'){
      url = "http://admintest.happymmall.com/manage/order/search.do";
      data.pageNum = listParam.pageNum;
      data.orderNo = listParam.orderNo;
    }

    return util.request({
      type : 'post',
      url :  url,
      data : data,
    })
  }

  getOrderDetail(orderNumber){
    let url = "http://admintest.happymmall.com/manage/order/detail.do";
    return util.request({
      type : 'post',
      url :  url,
      data : {
        orderNo : orderNumber
      }
    })
  }

  ship(orderNumber){
    let url = "http://admintest.happymmall.com/manage/order/send_goods.do";
    return util.request({
      type : 'post',
      url :  url,
      data : {
        orderNo : orderNumber
      }
    })
  }

}

export default OrderService;
