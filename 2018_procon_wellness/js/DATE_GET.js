var today = new Date(2018,8,30);

function getDate_slash() {

   // var h = new Date(2018,11-1,30);//日付0埋めデバッグ


    console.log(today);

    console.log("年=" + today.getFullYear());
    console.log("月=" + (today.getMonth()+1));
    console.log("日=" + today.getDate());
    console.log("時=" + today.getHours());
    console.log("分=" + today.getMinutes());
    console.log("秒=" + today.getSeconds());

    var now_date=('0'+ String(today.getMonth()+1).slice(-2)+'/'+String(today.getDate()));
    return now_date;
}

function getDate_hifun() {
    var now_date=String(today.getFullYear())+'-'+('0'+ String(today.getMonth()+1) ).slice(-2)+'-'+String(today.getDate());
    return now_date;
}
function getDate_hifun_control_day(control_day) {
    var now_date=String(today.getFullYear())+'-'+('0'+ String(today.getMonth()+1) ).slice(-2)+'-'+String(today.getDate()-control_day);
    return now_date;
}
 function getDate_this_Week(){
  //配列に09/25の形式で格納する
  var this_Week=['0','0','0','0','0','0','0'];
  // var now_day = today.getDay();
  // this_Week[now_day]=String(today.getMonth()+1)+'/'+String(today.getDate());
  // for(var i=now_day,j=1;i>0;i--,j++){
  //   this_Week[i-1]=String(today.getMonth()+1)+'/'+String(today.getDate()-j);
  // }
  // for(var i=now_day,j=1;i<6;i++,j++){
  //   this_Week[i+1]=String(today.getMonth()+1)+'/'+String(today.getDate()+j);
  // }
  var now_day = today.getDay();
  this_Week[now_day]=String(today.getMonth()+1)+'/'+String(today.getDate());
  for(var i=now_day,j=1;i>0;i--,j++){
    //月初→月末判定
    var another_day=new Date(today.getFullYear(), today.getMonth() + 1, 0);
    if(today.setDate(today.getDate()-j) == another_day){

    }
    else{this_Week[i-1]=String(today.getMonth()+1)+'/'+String(today.getDate()-j);}
  }
  for(var i=now_day,j=1;i<6;i++,j++){
    //月末→月初判定
    this_Week[i+1]=String(today.getMonth()+1)+'/'+String(today.getDate()+j);
  }

  // alert(this_Week);
  return this_Week;
}

function getDay(){//日付から曜日判定
  return today.getDay();
}
function getDay(oneday){//日付から曜日判定
  var day = new Date(oneday)
  return day.getDay();
}
function getDay_control_day(control_day){
  var day = new Date(today.getFullYear(),today.getMonth(),today.getDate()-control_day);
  // alert("date"+day);
  return day.getDay();
}

// // //ページロード時に実行
// window.onload=function () {
//   var data = getDate_this_Week();
//     // var data = getDate_this_Week();
//     alert(data);
//     // document.write(data);
// };

// alert("Hello");
