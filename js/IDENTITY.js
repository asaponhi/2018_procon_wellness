//他js読み込み
document.write("<script type='text/javascript' src='js/CSV_READER.js'></script>");

  //お名前表示
var UserID = function(){
  var result = getCSV_Date("ThisWeek.csv"); //csv読み込み
  document.getElementById("UserID").innerHTML = 'ID：'+String(result[2][1]) + ' 様'; //ID表示　1回目でも大丈夫
}
