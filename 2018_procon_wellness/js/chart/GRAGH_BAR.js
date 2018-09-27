

//グラフの日にち（横軸）取得
var this_week = getDate_this_Week();
var distance_weekly_sum=0;
var distance_weekly_array=[0,0,0,0,0,0,0]; //0で初期化 日～土曜
var achievement_distance = 4.9; //0.7km*7日
var difference_distance=-10;
function getDistance_weekly(distance_sum, distance_array) { //1週間の各曜日の運動距離格納
  distance_weekly_sum = Number(distance_sum);
  distance_weekly_array = distance_array;

  // alert("GRAGH_BAR_distance_weekly_sum"+distance_weekly_sum);
  // alert("GRAGH_BAR_distance_weekly_array"+distance_weekly_array);

  //ドーナツグラフ用スクリプト
  if (distance_weekly_sum >= achievement_distance) { //目標距離超えてたら、変数の値変える　棒グラフ
    difference_distance = 0;
  } else if (distance_weekly_sum < achievement_distance) {
    difference_distance = achievement_distance - distance_weekly_sum; //差を入れる
  }
}

document.write("<script type='text/javascript' src='labeling-plugin.js'></script>");


var Gragh_Bar = function() {
  //plugins
  var PercentagePlugin = {
                          afterDatasetsDraw: function (chart, easing) {
                              // To only draw at the end of animation, check for easing === 1
                              var ctx = chart.ctx;

                              chart.data.datasets.forEach(function (dataset, i) {
                                  var dataSum = 0;
                                  dataset.data.forEach(function (element){
                                       dataSum += parseInt(element);
                                  });
                                  //alert(dataSum);
                                  var meta = chart.getDatasetMeta(i);
                                  if (!meta.hidden) {
                                      meta.data.forEach(function (element, index) {
                                          // Draw the text in black, with the specified font
                                          ctx.fillStyle = '#534e4e';  //文字色：白
                                          // ctx.fillStyle = '#858585';  //文字色：白

                                          var fontSize = 25;
                                          var fontStyle = 'normal';
                                          var fontFamily = 'Helvetica Neue';
                                          ctx.font = Chart.helpers.fontString(fontSize, fontStyle, fontFamily);

                                          // Just naively convert to string for now
                                          // var labelString = chart.data.labels[index];
                                          var labelString = "";
                                          var dataString = (Math.round(parseInt(dataset.data[index]) / dataSum * 1000)/10).toString() + "%";

                                          // Make sure alignment settings are correct
                                          ctx.textAlign = 'center';
                                          ctx.textBaseline = 'middle';

                                          var padding = 5;
                                          var position = element.tooltipPosition();
                                          ctx.fillText(labelString, position.x, position.y - (fontSize / 2) - padding);
                                          ctx.fillText(dataString, position.x, position.y + (fontSize / 2) - padding);
                                      });
                                  }
                              });
                          }
                      };
  var dataLabelPlugin = {
                         afterDatasetsDraw: function (chart, easing) {
                             // To only draw at the end of animation, check for easing === 1
                             var ctx = chart.ctx;

                             chart.data.datasets.forEach(function (dataset, i) {
                                 var dataSum = 0;
                                 dataset.data.forEach(function (element){
                                     dataSum += element;
                                 });

                                 var meta = chart.getDatasetMeta(i);
                                 if (!meta.hidden) {
                                     meta.data.forEach(function (element, index) {
                                         // Draw the text in black, with the specified font
                                         ctx.fillStyle = 'rgb(255, 255, 255)';

                                         var fontSize = 12;
                                         var fontStyle = 'normal';
                                         var fontFamily = 'Helvetica Neue';
                                         ctx.font = Chart.helpers.fontString(fontSize, fontStyle, fontFamily);




                                         // Just naively convert to string for now
                                         var labelString = chart.data.labels[index];
                                         var dataString = (Math.round(dataset.data[index] / dataSum * 1000)/10).toString() + "%";

                                         // Make sure alignment settings are correct
                                         ctx.textAlign = 'center';
                                         ctx.textBaseline = 'middle';

                                         var padding = 5;
                                         var position = element.tooltipPosition();
                                         ctx.fillText(labelString, position.x, position.y - (fontSize / 2) - padding);
                                         ctx.fillText(dataString, position.x, position.y + (fontSize / 2) - padding);
                                     });
                                 }
                             });
                         }
                     };

                     var DataLabelPluginB = {afterDatasetsDraw:function(chart,easing){
                        var ctx=chart.ctx;
                        chart.data.datasets.forEach(function(dataset,i){
                         var meta=chart.getDatasetMeta(i);
                         if(!meta.hidden){meta.data.forEach(function(element,index){
                            ctx.fillStyle='#534e4e';  //文字色：黒
                            var fontSize=25;
                            var fontStyle='normal';
                            var fontFamily='Helvetica Neue';ctx.font=Chart.helpers.fontString(fontSize,fontStyle,fontFamily);
                                       var dataString = dataset.data[index].toString();  // データラベル（項目の値）の場合
                                       //var dataString = chart.data.labels[index];      // ラベル（項目名）の場合
                            //var dataString=chart.data.labels[index];
                            //var dataString=chart.data.data[index];
                            ctx.textAlign='center';
                            ctx.textBaseline='middle';
                            var padding=5;
                            var position=element.tooltipPosition();
                            ctx.fillText(dataString,position.x,position.y-(fontSize/2)-padding);
                           });
                        }});
                   }};


  //割合計算
 // alert("GRAGH_BAR_distance_weekly_sum:"+distance_weekly_sum);
 // alert("GRAGH_BAR_difference_distance:"+difference_distance);

  var distance_weekly_sum_string=(distance_weekly_sum/(distance_weekly_sum+difference_distance));
  var difference_distance_string=(difference_distance/(distance_weekly_sum+difference_distance));
  // alert("GRAGH_BAR_distance_weekly_sum"+distance_weekly_sum);
  // alert("GRAGH_BAR_distance_weekly_array"+distance_weekly_array);
  // alert("distance_weekly_sum_string"+distance_weekly_sum_string);
  // alert("difference_distance_string"+difference_distance_string);
  //ドーナツグラフ
  var ctx1 = document.getElementById("myDoughnutChart");
  var myDoughnutChart = new Chart(ctx1, {

    type: 'doughnut',
    data: {
      labels: ["1週間の歩き", "目標距離まで"],
      datasets: [{
        backgroundColor: [
          // "#f1c40f",
          // "#3498db
          "#fce610",
          "#555555",
          // "#eeeeee",
        ],
        // borderWidth:[//失敗
        //   7
        // ],
        data: [distance_weekly_sum_string,difference_distance_string],
        // data: [12, 2],
        // borderWidth: 1,//動かない
      }]
    },
    options: {
      title: {
        display: true,
        text: '1週間の歩行距離',
        fontSize: 40,
      },
      legend: { //凡例
        display: true,
        labels: {
          fontSize: 15,
          // paddingBottom:50,

        }
      },
      dataString:"",
      // ticks:{
      //   // paddingBottom:50,
      //   callback:function(value,index,values){
      //     return value+'%';
      //   }
    },
    // plugins: [dataLabelPlugin],
    plugins: [PercentagePlugin],
  });


  //棒グラフ
  var ctx2 = document.getElementById("myBarChart");
  var myBarChart = new Chart(ctx2, {
    //グラフの種類
    type: 'bar',
    //データの設定
    data: {
      //データ項目のラベル
      // labels: ["日曜", "月曜", "火曜", "水曜", "木曜", "金曜", "土曜"],
      // labels: ["日曜"+this_week[0],"月曜\n"+this_week[1], "火曜\n"+this_week[2], "水曜\n"+this_week[3], "木曜\n"+this_week[4], "金曜\n"+this_week[5], "土曜\n"+this_week[6]],
      // labels: [this_week[0]+"日曜\n",this_week[1]+"月曜\n", this_week[2]+"火曜\n",this_week[3]+ "水曜\n", this_week[4]+"木曜\n",this_week[5]+ "金曜\n",this_week[6]+ "土曜\n"],
      labels: [this_week[0] + " 日", this_week[1] + " 月", this_week[2] + " 火", this_week[3] + " 水", this_week[4] + " 木", this_week[5] + " 金", this_week[6] + " 土"],
      //データセット
      datasets: [{
        //凡例
        label: "1日運動した距離",
        // fontSize:25,
        //背景色
        backgroundColor: "rgba(75,192,192,0.4)",
        //枠線の色
        borderColor: "rgba(75,192,192,1)",
        //グラフのデータ
        // data: [12, 19, 3, 5, 2, 3]
        // data: [Number(distance_weekly_array[0]),Number(distance_weekly_array[1]),Number(distance_weekly_array[2]),Number(distance_weekly_array[3]),Number(distance_weekly_array[4]),Number(distance_weekly_array[5]),Number(distance_weekly_array[6])]
        data: [(distance_weekly_array[0]), (distance_weekly_array[1]), (distance_weekly_array[2]), (distance_weekly_array[3]), (distance_weekly_array[4]), (distance_weekly_array[5]), (distance_weekly_array[6])]
      }]
    },
    //オプションの設定
    options: {
      title: {
        display: true,
        text: '1週間歩行グラフ',
        fontSize: 40,
      },
      legend: { //凡例
        display: true,
        labels: {
          fontSize: 15,
        }
      },
      scaleOverride: true, //縦軸の目盛りの上書き許可。これ設定しないとscale関連の設定が有効にならないので注意。
      //軸の設定
      scales: {
        //縦軸の設定
        yAxes: [{
          display: true,

          scaleLabel: { //軸ラベル設定
            display: true, //表示設定
            // labelString: 'km', //ラベル
            // "<%=value%>km",
            fontSize: 25, //フォントサイズ

          },
          //目盛りの設定
          ticks: {
            //開始値を0にする
            beginAtZero: true,
            autoSkip: true,
            maxTicksLimit: 20, //値の最大表示数
            fontSize: 25, //フォントサイズ
            callback:function(value,index,values){
              return value+'km';
            }
          },
          lables: {
            allowDecimals: true,
          },
        }],
        // x
        xAxes: [{
          display: true,

          scaleLabel: { //軸ラベル設定
            fontSize: 25, //フォントサイズ
          },
          //目盛りの設定
          ticks: {
            //開始値を0にする
            beginAtZero: true,
            autoSkip: true,
            maxTicksLimit: 20, //値の最大表示数
            fontSize: 25, //フォントサイズ
          },
          lables: {
            allowDecimals: true,
          }
        }]
      }
    },
    plugins: [DataLabelPluginB],
  });
  // var ctx = document.getElementById("myChart").getContext('2d');


  // Define a plugin to provide data labels
  // Chart.plugins.register({
  //   afterDatasetsDraw: function(chart, easing) {
  //     // To only draw at the end of animation, check for easing === 1
  //     var ctx = chart.ctx;
  //
  //     chart.data.datasets.forEach(function(dataset, i) {
  //       var meta = chart.getDatasetMeta(i);
  //       if (!meta.hidden) {
  //         meta.data.forEach(function(element, index) {
  //           // Draw the text in black, with the specified font
  //           ctx.fillStyle = 'rgb(0, 150, 100)';
  //
  //           var fontSize = 25;
  //           var fontStyle = 'normal';
  //           var fontFamily = 'Helvetica Neue';
  //           ctx.font = Chart.helpers.fontString(fontSize, fontStyle, fontFamily);
  //
  //           // Just naively convert to string for now
  //           var dataString = dataset.data[index].toString();
  //
  //           // Make sure alignment settings are correct
  //           ctx.textAlign = 'center';
  //           ctx.textBaseline = 'middle';
  //
  //           var padding = 5;
  //           var position = element.tooltipPosition();
  //           ctx.fillText(dataString, position.x, position.y - (fontSize / 2) - padding);
  //         });
  //       }
  //     });
  //   }
  // });



}
