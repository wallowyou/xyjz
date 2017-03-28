Page({
  data:{
    tarr:[],
    tdate:"",
  },
  onLoad: function (option) { 
    this.setData({
        tdate:option.tdate,
    })
    console.log(option.tdate);
  },
  onShow:function(options){
      var that=this;
      wx.request({
     url: 'https://icashbook.applinzi.com/data/daylist.php',
       data: {day:that.data.tdate},
        method: 'GET', // OPTIONS, GET, HEAD, POST, PUT, DELETE, TRACE, CONNECT
        // header: {}, // 设置请求的 header
        success: function(res){
          // success
          var arr=res.data;
          that.setData({
              tarr:arr,
          })
        },
        fail: function() {
          // fail
        },
        complete: function() {
          // complete
        }
      })
 
  },
  onShareAppMessage: function() {
    // 用户点击右上角分享
    return {
      title: 'title', // 分享标题
      desc: 'desc', // 分享描述
      path: 'path' // 分享路径
    }
  }
})