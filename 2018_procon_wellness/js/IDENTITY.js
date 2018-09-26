//他js読み込み
document.write("<script type='text/javascript' src='CSV_READER.js'></script>");

var result = getCSV("data.csv"); //csv読み込み

  //お名前表示
var UserID = function(){
  document.getElementById("UserID").innerHTML = 'ID: '+String(result[1][1]) + ' 様<BR>'; //ID表示　1回目でも大丈夫
}
