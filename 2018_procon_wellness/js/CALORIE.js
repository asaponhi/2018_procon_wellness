//他js読み込み
document.write("<script type='text/javascript' src='CSV_READER.js'></script>");
document.write("<script type='text/javascript' src='DATE_GET.js'></script>");

var result = getCSV("csv/data.csv"); //csv読み込み

var Calorie_Calc = function() {
  var now_date = new Date();
  //1週間のカロリーは足していく
  var now_date_hifun = getDate_hifun_oneday(now_date);
  var now_day = getDay_oneday(now_date);
  var start_day = getDay_oneday(now_date);
  var calorie_weekly_sum_thisWeek = 0;
  var j = 1;
  // alert(a+1+"回目\n"+"now_date_hifun: "+now_date_hifun+"\n"+"now_day: "+now_day+"\n"+"start_day: "+start_day);
  //1週間計算
  for (var i = start_day; i >= 0; i--) {
    //1日計算スクリプト
    var calorie_today_sum = 0; //1日歩行距離初期化
    var date_chage_flag = false;
    while (!date_chage_flag) {
      if (result.length <= 2) { //比較データがないとき（はじめて記録したとき）+（例外時にも対応）
        calorie_today_sum = result[j][4];
        date_chage_flag = true;
      } else if (String(result[j][2]) == now_date_hifun) { //今日の日付と同じなら　//now_day（deb）の日付を1日前に設定する
        calorie_today_sum += Number(result[j][4]);
        j++;
      } else if (String(result[j][2]) == null) { //記録の終了条件はないか？　//配列の範囲こえて、取得できないと思う　自分でresultに終了条件付けた至徳とか
        //for文抜け出す
      } else { //日付が変わったら
        date_chage_flag = true;
      }
    } //1日終わり　while
    //1週間歩行距離計算
    calorie_weekly_sum_thisWeek += calorie_today_sum;
    //日付を1日前にする
    now_date.setDate(now_date.getDate() - 1);
    now_date_hifun = getDate_hifun_oneday(now_date); //i--,numは大きくなる

  } //1週間終わり

  //出力
  //累計カロリーはトータルとるだけ:result[j][7]
  // document.getElementById("calorie-total-text").innerHTML = "<span style='font-size: 50px;'>累計:</span>"+ "<span style='font-size: 65px;'>"+String(Math.round(result[1][7]))+"</span>"+"<span style='font-size:30px;'> KCAL</span>"; //ID表示　1回目でも大丈夫
  //1週間のカロリー
  // document.getElementById("calorie-weekly_sum_thisWeek-text").innerHTML = "<span style='font-size: 50px;'>1週間:</span>"+"<span style='font-size: 65px;'>"+String(Math.round(calorie_weekly_sum_thisWeek))+"</span>"+"<span style='font-size:30px;'> KCAL</span>";
  //本日のカロリーはcalorie_today_sum
  // document.getElementById("calorie-today_sum_thisWeek-text").innerHTML = "<span style='font-size: 80px;'>" + String(Math.round(calorie_today_sum)) + "</span>" + "<span style='font-size:30px;'> KCAL</span>";
  // document.getElementById("calorie-today_sum_thisWeek-text").innerHTML = "<span style='font-size: 50px;'>本日:</span>"+"<span style='font-size: 65px;'>"+String(Math.round(calorie_today_sum))+"</span>"+"<span style='font-size:30px;'> KCAL</span>";
  //Math.round(calorie_weekly_sum_thisWeek*10)/10;
  // document.getElementById("calorie-today_example-text").innerHTML = "<span style='font-size: 50px;'>本日:</span>"+"<span style='font-size: 65px;'>"+String(Math.round(calorie_today_sum))+"</span>"+"<span style='font-size:30px;'> KCAL</span>";
  //本日のカロリーはcalorie_today_sum
  document.getElementById("calorie-today_sum_thisWeek-text").innerHTML = "<span style='font-size: 80px;'>" + String(Math.round(calorie_today_sum)) + "</span>" + "<span style='font-size:30px;'> KCAL</span>";
}

var food_example_calc(today_calorie){
  var food_kind_num =17;//17品目
  var food_kind_name_array=[];//品目名を格納する　品目名も自動で取得する

  var range = 20;
  var food_example=getCSV("csv/food_example.csv");
  var start_index;
  var end_index;
  var range_out_flag = false;
  while(!range_out_flag){//品類をこえるまで
    for(var j=1;;j++){
      //スタート添え字探し
      if(food_example[j][1] < today_calorie + range){//頂点が今日のカロリー
        start_index=j;//始端取得（頂点）
      }
      //rangeの範囲内の人をみつけて、初めの人の添え字を記録
      else if(food_example[j][1] <= today_calorie + range){//上から下
        start_index=j;//始端取得
      }
      //エンド添え字探し
      if(food_example[j][1] >= today_calorie - range){//上から下
        end_index=j;//終端取得
      }
      else if(food_example[j][1] > today_calorie - range){//最下点が今日のカロリー
        end_index=j;//終端取得（最下点）
      }
      //random計算部分添え字を取得してその間でまわす　ランダムも
      //出力：名称はfood_example[j][0]の、カロリーはfood_example[j][1]で取得
      if(food_example[j][1]='0'){//品目のかわり目
        range_out_flag=true;
        //ランダムで選ぶ
        //for(3)
        //index[3] = rand();
      }
    }
  }
}
