﻿
<html>
<head><title>PHP TEST</title></head>
<body>

<?php
header('Access-Control-Allow-Origin: *');
$dsn1 = 'mysql:dbname=ikiiki;host=153.126.194.52';
$dsn2 = 'mysql:dbname=ikiiki_game;host=153.126.194.52';
$user = 'user1';
$password = 'Sotuken17-Feli';

try{
	/* データベースの指定 */
    $data_pdo = new PDO($dsn1, $user, $password);
	$game_pdo=new PDO($dsn2, $user, $password);

	/*　テキストファイルからIDを読み取る　*/
	$text= file_get_contents('test.txt');
	$text = mb_strimwidth($text, 1, 17);

//	var_dump($text);



/*ikiikiから歩行のデータをikiiki.csvに保存 
 *タッチした人の最新のデータのみ保存する
 *記録するデータは ID,CardNum,タッチした時間,距離,消費カロリー,
 *総運動時間,総移動距離,総消費カロリー,端末番号,累計タッチ回数,
 *身長,体重,年齢,性別の順番
 *1行目にはそれぞれのタイトルが記録される
 *2行目にデータが記録される
 */
    $file_path = "ikiiki.csv";
    $export_csv_title = ["ID", "CardNum", "time","Distance", "cal","TotalTime","TotalDist","TotalCal","Device","count","height","weight","age","gender"];
    $export_sql = "SELECT *  FROM ikiiki where ID= ".$text." order by 時間 desc limit 1";


 foreach( $export_csv_title as $key => $val ){
		/*コピペしたからダサいコードです。
		 *この処理は全く意味ないです
		 *変数名変えるの面倒だったのでこのままにしてます
		 *日本語が好きな方はここで文字コードを指定すると日本語が使えます
		 */
        $export_header1[] = mb_convert_encoding($val, 'UTF-8', 'UTF-8');
    }


if(touch($file_path)){
        $file = new SplFileObject($file_path, "w");
        // 出力するCSVにヘッダーを書き込む
        $file->fputcsv($export_header1);
        // データベース検索
        $stmt = $data_pdo->query($export_sql);
        // 検索結果をCSVに書き込む
        while($row = $stmt->fetch(PDO::FETCH_ASSOC)){

            $file->fputcsv($row);
        }

    }


/***************************************************************************/


/*ikiikiから歩行のデータをikiiki.csvに保存 
 *タッチした人の全てのデータを新しい順に保存する
 *記録するデータは ID,CardNum,タッチした時間,距離,消費カロリー,
 *総運動時間,総移動距離,総消費カロリー,端末番号,累計タッチ回数,
 *身長,体重,年齢,性別の順番
 *1行目にはそれぞれのタイトルが記録される
 *2行目にデータが記録される
 */
    $file_path = "data.csv";
    $export_sql = "SELECT *  FROM ikiiki where ID= ".$text." order by 時間 desc ";


if(touch($file_path)){
        $file = new SplFileObject($file_path, "w");
        // 出力するCSVにヘッダーを書き込む
        $file->fputcsv($export_header1);
        // データベース検索
        $stmt = $data_pdo->query($export_sql);
        // 検索結果をCSVに書き込む
        while($row = $stmt->fetch(PDO::FETCH_ASSOC)){

            $file->fputcsv($row);
        }

    }

/***************************************************************************/



/*ikiiki_gameから勲章のデータをmedal.csvに保存 
 *タッチした人の最新のデータのみ保存する
 *記録するデータは ID,タッチした時間,勲章（時間）,勲章（距離）,
 *勲章（回数）の順番
 *1行目にはそれぞれのタイトルが記録される
 *2行目にデータが記録される
 */
    $file_path = "medal.csv";
    $export_csv_title = ["ID", "time","TimeMedal","DistMedal","CountMedal"];
    $export_sql = "SELECT *  FROM ikiiki_game where ID=".$text." order by time desc limit 1";


 foreach( $export_csv_title as $key => $val ){
        $export_header2[] = mb_convert_encoding($val, 'UTF-8', 'UTF-8');
    }


if(touch($file_path)){
        $file = new SplFileObject($file_path, "w");
        // 出力するCSVにヘッダーを書き込む
        $file->fputcsv($export_header2);
        // データベース検索
        $stmt = $game_pdo->query($export_sql);
        // 検索結果をCSVに書き込む
        while($row = $stmt->fetch(PDO::FETCH_ASSOC)){
            $file->fputcsv($row);
        }

    }
/***************************************************************************/


/*ikiiki_gameからステータスのデータをstatus.csvに保存 
 *タッチした人の最新のデータのみ保存する
 *記録するデータは ID,タッチした時間,HP,MP,ATK,DEF,HEALTH,EXPの順番
 *1行目にはそれぞれのタイトルが記録される
 *2行目にデータが記録される
 */
    $file_path = "status.csv";
    $export_csv_title = ["ID", "time","HP","MP","ATK","DEF","HEALTH","EXP"];
    $export_sql = "SELECT *  FROM ikiiki_status where ID=".$text." order by time desc limit 1";
//    $export_sql = "SELECT *  FROM ikiiki_status where ID=15 order by time desc limit 1";


 foreach( $export_csv_title as $key => $val ){
        $export_header3[] = mb_convert_encoding($val, 'UTF-8', 'UTF-8');
    }


if(touch($file_path)){
        $file = new SplFileObject($file_path, "w");
        // 出力するCSVにヘッダーを書き込む
        $file->fputcsv($export_header3);
        // データベース検索
        $stmt = $game_pdo->query($export_sql);
        // 検索結果をCSVに書き込む
        while($row = $stmt->fetch(PDO::FETCH_ASSOC)){
            $file->fputcsv($row);
        }

    }
/***************************************************************************/


/*ikiiki_gameからダンジョンに行った回数のデータをdungeon.csvに保存 
 *タッチした人の最新のデータのみ保存する
 *記録するデータは ID,タッチした時間,flame,ice,desert,sacredの順番
 *1行目にはそれぞれのタイトルが記録される
 *2行目にデータが記録される
 */
    $file_path = "dungeon.csv";
    $export_csv_title = ["ID", "time","flame","ice","desert","sacred"];
    $export_sql = "SELECT *  FROM ikiiki_dungeon where ID=".$text." order by time desc limit 1";


 foreach( $export_csv_title as $key => $val ){
        $export_header4[] = mb_convert_encoding($val, 'UTF-8', 'UTF-8');
    }


if(touch($file_path)){
        $file = new SplFileObject($file_path, "w");
        // 出力するCSVにヘッダーを書き込む
        $file->fputcsv($export_header4);
        // データベース検索
        $stmt = $game_pdo->query($export_sql);
        // 検索結果をCSVに書き込む
        while($row = $stmt->fetch(PDO::FETCH_ASSOC)){
            $file->fputcsv($row);
        }

    }
/***************************************************************************/



}catch (PDOException $e){
    print('Error:'.$e->getMessage());
    die();
}
header('Content-Type: text/html; charset=utf-8');
header('Access-Control-Allow-Origin: *');

?>

</body>
</html>