Page({
  data:{
      dayarr:[],
      dayincome:0,
      dayoutcome:0,
      date:'',
  },
  onLoad: function() {
   
   
//    获取当前日期
    var date = new Date();
    var month=date.getMonth()+1;
    var d=date.getDate();
    if(d<10){
      d="0"+d;
    }
    if(month<10){
      month="0"+month;
    }
//    格式化日期为"YYYY-mm-dd"
    var dateStr = date.getFullYear() + "-" + month + "-" + d;
    console.log(dateStr);
//    存回data，以渲染到页面
    this.setData({
    	date: dateStr
    })
  },
 onShow:function(options){
     var that=this;
     wx.request({
       url: 'https://icashbook.applinzi.com/data/daylist.php',
       data: {day:that.data.date},
       method: 'GET', // OPTIONS, GET, HEAD, POST, PUT, DELETE, TRACE, CONNECT
       // header: {}, // 设置请求的 header
       success: function(res){
         // success
         console.log("获取今天数据成功");
         var today=res.data;
         console.log(today);
         console.log(that.data.date)
         that.setData({
             dayarr:today
         });
         var tincome=[];
         var toutcome=[];
         today.forEach(function(val,idx){
             if(val.cate=="+"){
                 tincome.push(parseFloat(val.account));
                 console.log(val.account);
             }else if(val.cate=="-"){
                 toutcome.push(parseFloat(val.account));
             }
         });
          //求和函数
            function sum(arr){
                for(var i=0,sum=0;i<arr.length;i++){
                    sum+=arr[i];
                }
                return sum;
            }
         //计算总和
         var sumincome=sum(tincome);
         var sumoutcome=sum(toutcome);
         console.log(sumincome);
         console.log(sumoutcome);
         that.setData({
               dayincome:sumincome,
                 dayoutcome:sumoutcome,
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
  //跳转到详情页面
  lookmore:function(){
     
      var tdate=this.data.date;
   
      wx.navigateTo({
        url: '../detail/detail?tdate='+tdate,
        success: function(res){
          // success
          console.log("跳转成功");
      
        },
        fail: function() {
          // fail
        },
        complete: function() {
          // complete
        }
      })
  }
 
  
})