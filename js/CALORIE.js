//他js読み込み

document.write("<script type='text/javascript' src='js/CSV_READER.js'></script>");
document.write("<script type='text/javascript' src='js/DATE_GET.js'></script>");

var Calorie_Calc = function() {
  var result = getCSV_Date("ThisWeek.csv"); //csv読み込み
  // var result = getCSV("data.csv"); //csv読み込み

  var now_date = new Date();
  //1週間のカロリーは足していく
  var now_date_hifun = getDate_hifun_oneday(now_date);
  // alert(now_date_hifun);
  var now_day = getDay_oneday(now_date);
  var start_day = getDay_oneday(now_date);
  if (now_day == 0) now_day = 7;
  if (start_day == 0) start_day = 7;
  now_day -= 1;
  start_day -= 1;
  var calorie_today_sum = 0; //1日歩行距離初期化
  var calorie_weekly_sum_thisWeek = [0, 0, 0, 0, 0, 0, 0];
  var array_calorie_index = 4;
  var j = 1;
  // alert(a+1+"回目\n"+"now_date_hifun: "+now_date_hifun+"\n"+"now_day: "+now_day+"\n"+"start_day: "+start_day);
  //1週間計算
  for (var i = start_day; i >= 0; i--) {
    //1日計算スクリプト
    alert("String(result[j][2])"+String(result[j][2]));
    alert("now_date_hifun"+now_date_hifun);

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
    alert(calorie_today_sum);
    calorie_weekly_sum_thisWeek[i] += calorie_today_sum;
    calorie_today_sum = 0;
    //日付を1日前にする
    now_date.setDate(now_date.getDate() - 1);
    now_date_hifun = getDate_hifun_oneday(now_date); //i--,numは大きくなる

  } //1週間終わり

  //出力
  alert("calorie_weekly_sum_thisWeek[start_day]"+calorie_weekly_sum_thisWeek[start_day]);

  document.getElementById("calorie-today_sum_thisWeek-text").innerHTML = "<span style='font-size: 80px;'>" + String(Math.round(calorie_weekly_sum_thisWeek[start_day])) + "</span>" + "<span style='font-size:30px;'> KCAL</span>";

  // HONKI_START
  var food_example = getCSV("csv/food_example_honki.csv");
  const index_food_example_series_num = 0;
  const index_food_example_name = 1;
  const index_food_example_calorie = 2;
  const index_food_example_URL = 3;
  const index_food_example_series_count = 4;

  // alert(food_example);
  // series judgement
  var index_series_count = 0;
  var food_example_calorie_sum = 0;
  var count_meal_num = 0;
  const over_meal_num = 4;
  var series_num = [food_example[index_series_count][index_food_example_series_count], 0, 0]; //firstly,0row only
  const series_num_array = [9, 8, 13]; //like
  var over_calorie_flag = false;
  var over_meal_num_flag = false;

  //First_Judgement
  while (!over_calorie_flag && !over_meal_num_flag) {
    //1_series_start
    //calc series_num
    var series_num_sum_end;
    var series_num_sum_end_before = 0;
    //calorie<10KCAL
    if (calorie_today_sum < 10) {
      series_num_sum_end_before = series_num_array[0] + series_num_array[1];
      series_num_sum_end = series_num_array[0] + series_num_array[1] + series_num_array[2] - 1;
      var index_ramdom_array = rangeRandom(series_num_sum_end_before, series_num_sum_end);
      // alert("index_ramdom_array" + index_ramdom_array);
      /////////////////////////////////////////////////////
      var display_array = [];
      for (var j = 0; j < over_meal_num; j++) {
        // alert("<10:" + food_example[index_ramdom_array[j]][index_food_example_URL]);
        //sort MAX→MIN
        display_array[j] = {
          index: index_ramdom_array[j],
          calorie: food_example[index_ramdom_array[j]][index_food_example_calorie]
        };
      }
      //sort MAX→MIN
      display_array.sort(
        function(a, b) {
          return b.calorie - a.calorie;
        }
      );
      //DISPLAY
      for (var k = 0; k < 4; k++) {
        // alert("URL"+food_example[display_array[k].index][index_food_example_URL]);
        document.getElementById("calorie-today_example-img" + String(k + 1)).src = "img/meal/"+food_example[display_array[k].index][index_food_example_URL];
        // document.getElementById("calorie-today_example-img" + String(k + 1)).innerHTML = "<img src ='ファイル名'>";
        document.getElementById("calorie-today_example-text" + String(k + 1)).innerHTML = "<span style='font-size:50px;'>" + display_array[k].calorie + "</br></span>" + "<span style='font-size:25px;'>    KCAL</span>";
      }
      over_meal_num_flag = true;
    }

    // calorie>=10KCAL
    else {
      /////////////////////////////////////OK
      for (var k = 0; k < 3; k++) {
        series_num_sum_end += series_num[k]; /////////////////////////////OK
      }
      // random Create
      var index_ramdom_array = rangeRandom(series_num_sum_end_before, series_num_sum_end);
      series_num_sum_end_before = series_num_sum_end; //update

      for (var index_series_meal = 0; index_series_meal < series_num_array[index_series_count]; index_series_meal++) {
        //Second_Judgement:food_example_calorie
        if (food_example[index_ramdom_array[index_series_meal]][index_food_example_calorie] <= calorie_weekly_sum_thisWeek[start_day]) {
          food_example_calorie_sum += food_example[index_ramdom_array[index_series_meal]][index_food_example_calorie];
          count_meal_num++;
          //Third_Judgement:count_meal_num
          if (food_example_calorie_sum <= calorie_weekly_sum_thisWeek[start_day]) {
            over_calorie_flag = true;
            break; //for BREAK and while BREAK
          }
          if (count_meal_num >= over_meal_num) {
            over_meal_num_flag = true;
            break; //for BREAK and while BREAK
          }
        }
        // alert("for" + index_ramdom_array);
      }
    }

    //1_series_end
    index_series_count++;
    // alert("for_end" + index_series_count);

    //calc series_num
    var array_series_num = [0, 0, 0];
    if (index_series_count == 1) {
      array_series_num[0] = series_num_array[0];
      array_series_num[1] = series_num_array[1];
      array_series_num[1] = 0;
    } else if (index_series_count == 2) {
      array_series_num[0] = series_num_array[0];
      array_series_num[1] = series_num_array[1];
      array_series_num[2] = series_num_array[2];
    }
    series_num = [array_series_num[0], array_series_num[1], array_series_num[2]]; //firstly,0row only
  }
  //WHILE FLAG END
  // HONKI_END
  ///////////////////////////////////
  // TENUKI
  // TENUKI_END
}

// HONKI_END
///////////////////////////////////
// TENUKI
// var food_example = getCSV("food_example_tenuki.csv");
// var food_example_num = food_example.length-1;
// var num_array=Array(16);
// for(var i=1;i<=food_example_num;i++){
//   num_array[i]=i;
//   // num_array[i]=Math.floor(Math.random() * (16 - 0 + 1) + 1);
//   // alert("num_array[]"+i+num_array[i]);
// }
//
// shuffle(num_array);
// num_array=rangeRandom(0,12);
// document.getElementById("calorie-today_example-text1").innerHTML = food_example[num_array[0]][0]+" "+"<span style='font-size:45px;'>"+food_example[num_array[0]][1]+"</span>"+" KCAL";
// document.getElementById("calorie-today_example-text2").innerHTML = food_example[num_array[1]][0]+" "+"<span style='font-size:45px;'>"+food_example[num_array[1]][1]+"</span>"+" KCAL";
// document.getElementById("calorie-today_example-text3").innerHTML = food_example[num_array[2]][0]+" "+"<span style='font-size:45px;'>"+food_example[num_array[2]][1]+"</span>"+" KCAL";
// document.getElementById("calorie-today_example-text4").innerHTML = food_example[num_array[3]][0]+" "+"<span style='font-size:45px;'>"+food_example[num_array[3]][1]+"</span>"+" KCAL";
// TENUKI_END


// class ValueWithIndex {
// 	public int index;
// 	public double value;
//
// 	public ValueWithIndex(int index, double value) {
// 		this.index = index;
// 		this.value = value;
// 	}
// }

function rangeRandom(min, max) {
  // 範囲の最小値
  var rangeMin = min;
  // 範囲の最大値
  var rangeMax = max;
  // 範囲内の数値の個数
  var rangeLength = rangeMax - rangeMin + 1;
  // 並び替え前の数値を管理する配列
  var countArr = [];
  // 並び替え後の数値を格納する配列
  var randomArr = [];

  // 範囲内の数値をcountArrに格納
  for (var i = 0; i < rangeLength; i++) {
    countArr[i] = i + rangeMin;
  }

  for (var i = 0; i < rangeLength; i++) {
    // 0～countArrの個数 の範囲から、数値をランダムに抽出
    var randomTarget = Math.floor(Math.random() * countArr.length);
    // randomArrに数値を格納(randomTargetの数値を格納するのではなく、countArrのrandomTarget番目の配列の数値を格納)
    randomArr[i] = countArr[randomTarget];
    // 同じ数値を再度使わないように、今回使った数値をcountArrから削除しておく。
    countArr.splice(randomTarget, 1);
  }
  return randomArr;
}
