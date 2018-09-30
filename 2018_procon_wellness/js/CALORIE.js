//他js読み込み
document.write("<script type='text/javascript' src='CSV_READER.js'></script>");
document.write("<script type='text/javascript' src='DATE_GET.js'></script>");

var result = getCSV("data.csv"); //csv読み込み

var Calorie_Calc(){
  var now_date = new Date();
  //1週間のカロリーは足していく
  var now_date_hifun = getDate_hifun_oneday(now_date);
  var now_day = getDay_oneday(now_date);
  var start_day = getDay_oneday(now_date);
  // alert(a+1+"回目\n"+"now_date_hifun: "+now_date_hifun+"\n"+"now_day: "+now_day+"\n"+"start_day: "+start_day);
//1週間計算
for (var i = start_day; i >= 0; i--) {
  //1日計算スクリプト
  var calorie_1day_sum = 0;//1日歩行距離初期化
  var date_chage_flag = false;
  while (!date_chage_flag) {
    if (result.length <= 2) { //比較データがないとき（はじめて記録したとき）+（例外時にも対応）
      calorie_1day_sum = result[j][4];
      date_chage_flag = true;
      console.log("はじめて歩いたよ");
    } else if (String(result[j][2]) == now_date_hifun) { //今日の日付と同じなら　//now_day（deb）の日付を1日前に設定する
      calorie_1day_sum += Number(result[j][4]);
      console.log("累計距離：" + calorie_1day_sum.toFixed(1) + "<BR><BR>");
      j++;
    } else if (String(result[j][2]) == null) { //記録の終了条件はないか？　//配列の範囲こえて、取得できないと思う　自分でresultに終了条件付けた至徳とか
      //for文抜け出す
    } else { //日付が変わったら
      date_chage_flag = true;
      console.log('日付変わった<BR>');
      console.log('記録日' + result[j][2] + '<BR>');
      // console.log('今日の日付' + now_date_hifun + '\n');
    }
  }
  //1日まとめスクリプト
    //1週間歩行距離計算
    calorie_weekly_sum_thisWeek += calorie_1day_sum;
    // alert("calorie_weekly_sum"+calorie_weekly_sum);


  //日付を1日前にする
  now_date.setDate(now_date.getDate()-1);
  now_date_hifun = getDate_hifun_oneday(now_date);//i--,numは大きくなる
  // alert("now_date_hifun"+now_date_hifun);
  // now_day = getDay_oneday(now_date.setDate(now_date.getDate()-1));
  console.log("nowdate" + now_date_hifun + " i" + i);
}//1日終わり　while

  //累計カロリーはトータルとるだけ:result[j][7]
  //本日のカロリーはとるだけ:result[j][4]
}

var UserID = function(){
  document.getElementById("UserID").innerHTML = 'ID: '+String(result[1][1]) + ' 様'; //ID表示　1回目でも大丈夫
}
// document.getElementById("myDoughnut-cheer-text").innerHTML = "<span style='color: red;font-size: 8pt;'>もっと</span>歩こう";
