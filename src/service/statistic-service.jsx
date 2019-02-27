import Util from "../util";
import $ from "jquery";
const util = new Util();

class StatisticService {

  getHomeCount() {
    return util.request({
      url: "http://admintest.happymmall.com/manage/statistic/base_count.do"
    });
  }
}

export default StatisticService;
